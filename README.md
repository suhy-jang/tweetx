# Tweetx

> Twitter simple clone app

## Version Info

- NodeJS v12.16.3

## Major features

- Profile: profile user posts, followers, followings
- Feed: login user posts, following user posts
- Users: All users list

## Technology

### Server

- Prisma for db connection
- Postgres database
- Graphql-yoga server(express base)
- Json web token and Bearer token
- Cors
- Helmet
- Xss prevention
- Express rate limit prevention
- Get signed url of Amazon S3 file upload

### Client

- Create-react-app
- Axios client, XMLHttpRequest
- Localstorage to save token and temporary form data
- Redux store
- React-router-dom: useHistory, useParams, useLocation hooks
- Amazon S3 file upload through signed url

## Getting Started

Rename files and update the values/settings to your own

```
/_config -> /config
/prisma/_docker-compose.yml -> /prisma/docker-compose.yml
```

> Install Dependencies

```
$ npm install
```

> Database Seeding

To seed the database with users, posts, and follows with data from the "\/src\/seeder\/\_data" folder, run,

- Destroy all data (use option 'd' or 'delete')

```
$ npm run seed d
```

- Import all data (use option 'i' or 'import')

```
$ npm run seed i
```

> Run application

- For production mode

```
$ npm run start
```

- For development mode

```
$ npm run dev
```

## ✨Live Demo

The app is live at [herokuapp](https://suhy-tweetx-app.herokuapp.com/)

Postman API documentation with examples [here](https://documenter.getpostman.com/view/8001436/T1LPESsJ)

- Version: 1.0.0
- Author: Suhyeon Jang
