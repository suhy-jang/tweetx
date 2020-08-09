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

export const createPost = gql(`
  mutation($data: PostCreateInput!) {
    createPost(data: $data) {
      id
      content
      createdAt
      updatedAt
    }
  }
`);

export const updatePost = gql(`
  mutation($id: ID!, $data: PostUpdateInput!) {
    updatePost(id: $id, data: $data) {
      id
      content
      updatedAt
    }
  }
`);

export const deletePost = gql(`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
      content
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

export const getUser = gql(`
  query($id: ID!) {
    user(id: $id) {
      id
      fullname
      username
      email
    }
  }
`);

export const getPosts = gql(`
  query {
    posts {
      id
      content
    }
  }
`);

export const getPost = gql(`
  query($id: ID!) {
    post(id: $id) {
      id
      content
    }
  }
`);
