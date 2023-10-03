import { gql } from '@apollo/client';

const fragments = {
  user: `
    fragment userData on User {
      id
      fullname
      username
      photoUrl
      createdAt
    }
  `,
  post: `
    fragment postData on Post {
      id
      content
      createdAt
    }
  `,
  follow: `
    fragment followData on User {
      followers {
        id
        follower {
          id
        }
      }
      followings {
        id
        following {
          id
        }
      }
    }
  `,
  relations: `
    fragment relationData on User {
      posts {
        id
      }
      followers {
        id
      }
      followings {
        id
      }
    }
  `,
};

export const mutateCreateUser = gql(`
  mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      token
      user {
        ...userData
      }
    }
  }
  ${fragments.user}
`);

export const mutateVerifyEmail = gql(`
  mutation($email: String!) {
    verifyEmail(email: $email)
  }
`);

export const mutateEmailVerificationCheck = gql(`
  mutation($email: String!) {
    checkEmailVerification(email: $email)
  }
`);

export const mutateUpdateUser = gql(`
  mutation($data: UserUpdateInput!) {
    updateUser(data: $data) {
      ...userData
      email
    }
  }
  ${fragments.user}
`);

export const mutateFollow = gql(`
  mutation($id: ID!) {
    follow(id: $id) {
      id
      following {
        id
      }
    }
  }
`);

export const mutateUnfollow = gql(`
  mutation($id: ID!) {
    unfollow(id: $id) {
      id
      following {
        id
      }
    }
  }
`);

export const mutateDeleteUser = gql(`
  mutation {
    deleteUser {
      ...userData
    }
  }
  ${fragments.user}
`);

export const mutateLogin = gql(`
  mutation($data: UserLoginInput!) {
    login(data: $data) {
      token
      user {
        ...userData
      }
    }
  }
  ${fragments.user}
`);

export const queryMe = gql(`
  query {
    me {
      ...userData
      email
      ...followData
      posts {
        id
      }
    }
  }
  ${fragments.user}
  ${fragments.follow}
`);

export const queryUser = gql(`
  query($id: ID!) {
    user(id: $id) {
      ...userData
      posts(orderBy: { createdAt: desc }) {
        ...postData
        author {
          ...userData
          ...relationData
        }
      }
      followers(orderBy: { createdAt: desc }) {
        id
        follower {
          ...userData
          ...relationData
        }
      }
      followings(orderBy: { createdAt: desc }) {
        id
        following {
          ...userData
          ...relationData
        }
      }
    }
  }
  ${fragments.user}
  ${fragments.post}
  ${fragments.relations}
`);

export const queryUsers = gql(`
  query($where: UserWhereInput) {
    users(where: $where) {
      ...userData
      ...followData
      posts {
        id
      }
    }
  }
  ${fragments.user}
  ${fragments.follow}
`);

export const queryMyFeed = gql(`
  query {
    myFeed(orderBy: { createdAt: desc }) {
      ...postData
      author {
        ...userData
        ...relationData
      }
    }
  }
  ${fragments.user}
  ${fragments.post}
  ${fragments.relations}
`);

export const queryFollowers = gql(`
  query($where: FollowerWhereInput) {
    followers(where: $where, orderBy: { createdAt: desc }) {
      id
      follower {
        id
        fullname
        photoUrl
        username
        followers {
          id
        }
      }
    }
  }
`);

export const queryFollowings = gql(`
  query($where: FollowingWhereInput) {
    followings(where: $where, orderBy: { createdAt: desc }) {
      id
      following {
        id
        fullname
        photoUrl
        username
        followers {
          id
        }
      }
    }
  }
`);

export const mutateCreatePost = gql(`
  mutation($data: PostCreateInput!) {
    createPost(data: $data) {
      ...postData
      author {
        ...userData
        ...relationData
      }
    }
  }
  ${fragments.user}
  ${fragments.post}
  ${fragments.relations}
`);

export const mutateDeletePost = gql(`
  mutation($id: ID!) {
    deletePost(id: $id) {
      ...postData
    }
  }
  ${fragments.post}
`);

export const mutateForgotPassword = gql(`
  mutation($data: ForgotPasswordInput!) {
    forgotPassword(data: $data)
  }
`);

export const mutateResetPassword = gql(`
  mutation($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      token
      user {
        ...userData
      }
    }
  }
  ${fragments.user}
`);

export const mutateFileUploadSign = gql(`
  mutation($data: FileUploadInput!) {
    fileUploadSign(data: $data) {
      presignedUrl
    }
  }
`);
