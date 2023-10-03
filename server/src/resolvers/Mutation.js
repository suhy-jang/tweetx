import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { generateToken } from '../utils/jwtToken';
import { hashPassword, verifyPassword } from '../utils/hashPassword';
import {
  usernameValidation,
  emailValidation,
  nameValidation,
  authCheck,
} from '../utils/userValidation';
import {
  sendEmail,
  verifyEmail,
  checkEmailVerificationStatus,
} from '../utils/email';
import getPresignedUrl from '../utils/fileUpload';
import getUserId from '../utils/getUserId';
import { s3_bucket } from '../utils/constants';

const prisma = new PrismaClient();

const Mutation = {
  async createUser(parent, args, context, info) {
    const password = await hashPassword(args.data.password);
    const photoUrl = `${s3_bucket}/Download/no-image-icon-389x389.jpg`;
    await usernameValidation(prisma, args.data.username);
    await emailValidation(prisma, args.data.email);
    await nameValidation(prisma, args.data.fullname);

    const user = await prisma.user.create({
      data: {
        ...args.data,
        photoUrl,
        password,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async verifyEmail(_, args, __, ___) {
    await emailValidation(prisma, args.email);
    return verifyEmail(args.email);
  },
  async checkEmailVerification(_, args, __, ___) {
    return checkEmailVerificationStatus(args.email);
  },
  async login(parent, args, context, info) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: args.data.email }, { username: args.data.email }],
      },
    });

    if (!user) {
      throw new Error('Unable to authenticate');
    }

    const isMatch = await verifyPassword(args.data.password, user.password);

    if (!isMatch) {
      throw new Error('Unable to authenticate');
    }

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async deleteUser(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  },
  async fileUploadSign(parent, args, context, info) {
    const userId = getUserId(context);
    await authCheck(prisma, userId);

    const { name, size, type } = args.data;
    if (!name || !type) {
      throw new Error('Please upload a file');
    }

    const [mediaType, _] = type.split('/');

    if (mediaType !== 'image') {
      throw new Error('Please upload an image file');
    }

    if (size > process.env.MAX_FILE_UPLOAD) {
      throw new Error(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
      );
    }

    const updatedName = `${userId}_${name}`;

    const presignedUrl = getPresignedUrl(updatedName, type);

    return { presignedUrl };
  },
  async updateUser(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }
    if (typeof args.data.username === 'string') {
      await usernameValidation(prisma, args.data.username);
    }
    if (typeof args.data.email === 'string') {
      await emailValidation(prisma, args.data.email);
    }
    if (typeof args.data.fullname === 'string') {
      await nameValidation(prisma, args.data.fullname);
    }

    return prisma.user.update({
      where: {
        id: userId,
      },
      data: args.data,
    });
  },
  async createPost(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    return prisma.post.create({
      data: {
        ...args.data,
        authorId: userId,
      },
    });
  },
  async deletePost(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    const post = await prisma.post.findFirst({
      where: {
        id: args.id,
        authorId: userId,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return prisma.post.delete({
      where: {
        id: args.id,
      },
    });
  },
  async updatePost(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    const post = await prisma.post.findFirst({
      where: {
        id: args.id,
        authorId: userId,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return prisma.post.update({
      where: {
        id: args.id,
      },
      data: args.data,
    });
  },
  async follow(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    const follow = await prisma.follow.findFirst({
      where: {
        followerId: userId,
        followingId: args.id,
      },
    });

    if (follow) {
      throw new Error('Failed follow');
    }

    return prisma.follow.create({
      data: {
        followerId: userId,
        followingId: args.id,
      },
    });
  },
  async unfollow(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    const follow = await prisma.follow.findFirst({
      where: {
        followerId: userId,
        followingId: args.id,
      },
    });

    if (!follow) {
      throw new Error('Failed unfollow');
    }

    return prisma.follow.delete({
      where: {
        id: follow.id,
      },
    });
  },
  async forgotPassword(parent, args, context, info) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: args.data.email }],
      },
    });

    if (!user) {
      throw new Error('User not found with the provided email');
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const resetPasswordExpire = new Date(
      new Date().getTime() + 10 * 60 * 1000, // 10 minutes
    ).toISOString();

    const { referer } = context.request.options.headers;
    // referer: xxx/ format
    const passwordResetLinkWithToken = `${referer}reset-password/${resetToken}`;

    const body = `
    Hello ${user.fullname},

    We received a request to reset the password for your account. 
    If you did not make this request, please ignore this email. 
    Otherwise, you can reset your password using the link below:

    ${passwordResetLinkWithToken}

    This link will expire in "10 minutes". If the link expires, please request a new one.

    For security reasons, we recommend:

    - Not sharing this email with anyone.
    - Using a strong password that you don't use on other websites.
    - Regularly updating your password.

    If you have any questions or did not request this password reset, please contact our support team immediately.

    Thank you for using TweetX.

    Warm regards,
    TweetX
    `;

    try {
      await sendEmail({
        ToAddresses: [user.email],
        subject: 'Your Password Reset Request',
        body,
      });

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetPasswordToken,
          resetPasswordExpire,
        },
      });

      if (!updatedUser) {
        throw new Error('Server error, please try again');
      }

      return 'Email sent.';
    } catch (err) {
      throw new Error('Email could not be sent');
    }
  },
  async resetPassword(parent, args, context, info) {
    const password = await hashPassword(args.data.password);

    if (!args.data.resetToken) {
      throw new Error('Invalid token');
    }

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(args.data.resetToken)
      .digest('hex');

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken,
        resetPasswordExpire: {
          gte: new Date().toISOString(),
        },
      },
    });

    if (!user) {
      throw new Error('Invalid token');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password,
        resetPasswordToken: null,
        resetPasswordExpire: null,
      },
    });

    if (!updatedUser) {
      throw new Error('Server error');
    }

    return {
      token: generateToken(user.id),
      user: updatedUser,
    };
  },
};

export default Mutation;
