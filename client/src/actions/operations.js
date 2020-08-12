import gql from 'graphql-tag';

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
};

export const gqlCreateUser = gql(`
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

export const gqlLogin = gql(`
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

export const gqlMe = gql(`
  query {
    me {
      ...userData
      email
    }
  }
  ${fragments.user}
`);

export const gqlUser = gql(`
  query($id: ID!) {
    user(id: $id) {
      ...userData
      posts(orderBy: createdAt_DESC) {
        ...postData
        author {
          ...userData
        }
      }
      followers(orderBy: createdAt_DESC) {
        id
        follower {
          ...userData
        }
      }
      followings(orderBy: createdAt_DESC) {
        id
        following {
          ...userData
        }
      }
    }
  }
  ${fragments.user}
  ${fragments.post}
`);

export const gqlMyFeed = gql(`
  query {
    myFeed(orderBy: createdAt_DESC) {
      id
      content
      createdAt
      author {
        id
        fullname
        username
        photoUrl
      }
    }
  }
`);
