const { gql } = require('@apollo/client');

const typeDefs = gql`
  scalar DateTime

  enum SortOrder {
    asc
    desc
  }

  input CommonOrderByInput {
    createdAt: SortOrder
    updatedAt: SortOrder
  }

  input FollowUserWhereInput {
    id: ID
  }

  input FollowWhereInput {
    follower: FollowUserWhereInput
  }

  input FollowListRelationFilter {
    none: FollowWhereInput
  }

  input IDStringFilter {
    not: ID
    equals: ID
  }

  input UserWhereInput {
    id: IDStringFilter
    followers: FollowListRelationFilter
  }

  input FollowerWhereInput {
    id: ID
  }

  input FollowingWhereInput {
    id: ID
  }

  type Query {
    users(
      where: UserWhereInput
      query: String
      first: Int
      after: String
      skip: Int
      orderBy: CommonOrderByInput
    ): [User]!
    me: User!
    posts(
      query: String
      first: Int
      after: String
      skip: Int
      orderBy: CommonOrderByInput
    ): [Post]!
    user(id: ID!): User!
    post(id: ID!): Post!
    followers(
      where: FollowerWhereInput
      first: Int
      after: String
      skip: Int
      orderBy: CommonOrderByInput
    ): [Follow]!
    followings(
      where: FollowingWhereInput
      first: Int
      after: String
      skip: Int
      orderBy: CommonOrderByInput
    ): [Follow]!
    myFeed(
      first: Int
      after: String
      skip: Int
      orderBy: CommonOrderByInput
    ): [Post]!
  }

  type Mutation {
    createUser(data: UserCreateInput!): AuthPayload!
    login(data: UserLoginInput!): AuthPayload!
    deleteUser: User!
    updateUser(data: UserUpdateInput!): User!
    createPost(data: PostCreateInput!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, data: PostUpdateInput!): Post!
    follow(id: ID!): Follow!
    unfollow(id: ID!): Follow!
    forgotPassword(data: ForgotPasswordInput!): String!
    resetPassword(data: ResetPasswordInput!): AuthPayload!
    fileUploadSign(data: FileUploadInput!): FileSignedResult!
  }

  type FileSignedResult {
    presignedUrl: String!
  }

  input FileUploadInput {
    name: String!
    size: Int!
    type: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input ResetPasswordInput {
    resetToken: String!
    password: String!
  }

  input ForgotPasswordInput {
    email: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserCreateInput {
    username: String!
    fullname: String!
    email: String!
    photoUrl: String
    password: String!
  }

  input UserUpdateInput {
    username: String
    fullname: String
    email: String
    photoUrl: String
    password: String
  }

  input PostCreateInput {
    content: String!
  }

  input PostUpdateInput {
    content: String
  }

  type User {
    id: ID!
    username: String!
    fullname: String!
    email: String
    photoUrl: String
    resetPasswordToken: String
    resetPasswordExpire: DateTime
    posts(
      query: String
      first: Int
      after: String
      skip: Int
      orderBy: CommonOrderByInput
    ): [Post]!
    followers(
      query: String
      first: Int
      after: String
      skip: Int
      orderBy: CommonOrderByInput
    ): [Follow]!
    followings(
      query: String
      first: Int
      after: String
      skip: Int
      orderBy: CommonOrderByInput
    ): [Follow]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Post {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Follow {
    id: ID!
    follower: User
    following: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

module.exports = typeDefs;
