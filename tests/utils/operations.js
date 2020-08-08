import gql from 'graphql-tag';

export const createUser = gql(`
  mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      token
      user {
        id
        fullname
      }
    }
  }
`);

export const login = gql(`
  mutation($data: UserLoginInput!) {
    login(data: $data) {
      token
      user {
        id
        fullname
      }
    }
  }
`);

export const deleteUser = gql(`
  mutation {
    deleteUser {
      id
      fullname
    }
  }
`);

export const updateUser = gql(`
  mutation($data: UserUpdateInput!) {
    updateUser(data: $data) {
      id
      fullname
    }
  }
`);

export const getUsers = gql(`
  query {
    users {
      id
      fullname
    }
  }
`);

export const getMe = gql(`
  query {
    me {
      id
      fullname
      username
      email
    }
  }
`);
