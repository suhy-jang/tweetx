import gql from 'graphql-tag';

const fragments = {
  follow: `
    fragment followData on Follow {
      follower {
        id
        username
      }
      following {
        id
        username
      }
    }
  `,
  user: `
    fragment userData on User {
      id
      fullname
      username
      email
      photoUrl
      createdAt
      updatedAt
    }
  `,
  post: `
    fragment postData on Post {
      id
      content
      createdAt
      updatedAt
    }
  `,
};

export const createUser = gql(`
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

export const login = gql(`
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

export const deleteUser = gql(`
  mutation {
    deleteUser {
      ...userData
    }
  }
  ${fragments.user}
`);

export const updateUser = gql(`
  mutation($data: UserUpdateInput!) {
    updateUser(data: $data) {
      ...userData
    }
  }
  ${fragments.user}
`);

export const createPost = gql(`
  mutation($data: PostCreateInput!) {
    createPost(data: $data) {
      ...postData
    }
  }
  ${fragments.post}
`);

export const updatePost = gql(`
  mutation($id: ID!, $data: PostUpdateInput!) {
    updatePost(id: $id, data: $data) {
      ...postData
    }
  }
  ${fragments.post}
`);

export const deletePost = gql(`
  mutation($id: ID!) {
    deletePost(id: $id) {
      ...postData
    }
  }
  ${fragments.post}
`);

export const getUsers = gql(`
  query {
    users {
      ...userData
    }
  }
  ${fragments.user}
`);

export const getMe = gql(`
  query {
    me {
      ...userData
    }
  }
  ${fragments.user}
  `);

export const getUser = gql(`
  query($id: ID!) {
    user(id: $id) {
      ...userData
    }
  }
  ${fragments.user}
`);

export const getPosts = gql(`
  query {
    posts {
      ...postData
    }
  }
  ${fragments.post}
`);

export const getPost = gql(`
  query($id: ID!) {
    post(id: $id) {
      ...postData
    }
  }
  ${fragments.post}
`);

export const myFeed = gql(`
  query {
    myFeed {
      ...postData
      author {
        ...userData
      }
    }
  }
  ${fragments.post}
  ${fragments.user}
  `);

export const follow = gql(`
  mutation($id: ID!) {
    follow(id: $id) {
      id
      ...followData
    }
  }
  ${fragments.follow}
`);

export const unfollow = gql(`
  mutation($id: ID!) {
    unfollow(id: $id) {
      id
      ...followData
    }
  }
  ${fragments.follow}
`);

export const followers = gql(`
  query {
    followers {
      id
      ...followData
    }
  }
  ${fragments.follow}
`);

export const followings = gql(`
  query {
    followings {
      id
      ...followData
    }
  }
  ${fragments.follow}
`);
