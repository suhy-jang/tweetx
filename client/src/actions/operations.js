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

export const gqlUpdateUser = gql(`
  mutation($data: UserUpdateInput!) {
    updateUser(data: $data) {
      ...userData
      email
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
      ...followData
      posts {
        id
      }
    }
  }
  ${fragments.user}
  ${fragments.follow}
`);

export const gqlUser = gql(`
  query($id: ID!) {
    user(id: $id) {
      ...userData
      posts(orderBy: createdAt_DESC) {
        ...postData
        author {
          ...userData
          ...relationData
        }
      }
      followers(orderBy: createdAt_DESC) {
        id
        follower {
          ...userData
          ...relationData
        }
      }
      followings(orderBy: createdAt_DESC) {
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

export const gqlUsers = gql(`
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

export const gqlMyFeed = gql(`
  query {
    myFeed(orderBy: createdAt_DESC) {
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

export const gqlCreatePost = gql(`
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
