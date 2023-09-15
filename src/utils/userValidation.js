const validator = require('validator');

export const usernameValidation = async (prisma, username) => {
  if (!username) {
    throw new Error('Username is not valid');
  }
  const existingUser = await prisma.user.findUnique({ where: { username } });

  if (existingUser) {
    throw new Error('Username already taken.');
  }
};

export const emailValidation = async (prisma, email) => {
  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid');
  }
  const existingEmail = await prisma.user.findUnique({ where: { email } });

  if (existingEmail) {
    throw new Error('Email already taken.');
  }
};

export const nameValidation = (prisma, name) => {
  if (!name) throw new Error('Name is not valid');
};

export const authCheck = async (prisma, userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('Unable to authenticate');
  }
};
