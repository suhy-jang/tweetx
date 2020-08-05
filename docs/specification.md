# Tweetx Specifications

Create the app for a simple style twitter clone website. All of the functionality below needs to be fully implemented in this project.

## Posts

- List all posts in the database
  - Pagination according to scroll
  - Limit number of results
- Get a single post
  - Author email should be hidden for the other users
- Create a new post
  - Authenticated users only
  - Field validation via Prisma
- Delete post
  - Owner only

## Users & Authentication

- List all users in the database
  - Pagination according to scroll
  - Limit number of results
- Authentication will be done using JWT
  - JWT should expire in 24 hours
- User registration
  - Once registered, a token will be sent along with user info
  - Passwords must be hashed
- User login
  - User can login with username or email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with user info
- Get me
  - Route to get the currently logged in user (via token)
- Password reset (lost password)
  - User can request to reset password
  - A hashed token will be emailed to the users registered email address
  - A put request can be made to the generated url to reset password
  - The token will expire after 10 minutes
- Update user info
  - Authenticated user only
  - User can update photo
- Delete user
  - Authenticated user only

## Follow

- A user can follow many other users

## Profile

- Get user
  - Profile user info (via user id)
- List all posts for each user
  - The profile user posts
- List my posts
  - Current user posts along with the following users posts
- Followers / followings
  - Current user can see followers, following list

## Test

- Test with jest

## Security

- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public

## API Documentation

- Use Postman to create documentation

## Deployment (Heroku)

- Create dev, prod server
- Create a seperate url for Graphql playground

## Code Related Suggestions

- NPM scripts for dev and production env
- Config file for important constants
- Use query, mutation, subscription methods with documented descriptions
- Authentication method to give permission
- Validation using Prisma and no external libraries
- Use async/await for prisma CRUD
- Use resolver using fragment to clean up query methods
