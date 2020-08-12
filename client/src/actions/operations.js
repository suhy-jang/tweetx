import gql from 'graphql-tag';

const fragments = {
  user: `
    fragment userData on User {
      id
      fullname
      username
      email
      photoUrl
      createdAt
    }
  `,
  userRelations: `
    fragment userRelations on User {
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
