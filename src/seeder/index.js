import fs from 'fs';
import bcrypt from 'bcryptjs';
import prisma from '../prisma';

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
);

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/posts.json`, 'utf-8'),
);

const createUsers = async () => {
  for await (const user of users) {
    const password = bcrypt.hashSync(user.password);
    await prisma.mutation.createUser({
      data: {
        ...user,
        password,
      },
    });
  }
};

const createPosts = async () => {
  for await (const post of posts) {
    await prisma.mutation.createPost({
      data: {
        content: post.content,
        author: {
          connect: {
            id: post.author,
          },
        },
      },
    });
  }
};

const createFollows = async (follower, following) => {
  await prisma.mutation.createFollow({
    data: {
      following: {
        connect: {
          id: following.id,
        },
      },
      follower: {
        connect: {
          id: follower.id,
        },
      },
    },
  });
};

const importData = async () => {
  try {
    console.log('Data Importing...');

    await createUsers();
    await createPosts();
    await createFollows(users[0], users[1]);
    await createFollows(users[0], users[2]);
    await createFollows(users[0], users[3]);
    await createFollows(users[1], users[2]);
    await createFollows(users[1], users[3]);
    await createFollows(users[2], users[0]);
    await createFollows(users[2], users[3]);
    await createFollows(users[3], users[0]);

    console.log('Data Imported...');
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    console.log('Data Destroying...');

    await prisma.mutation.deleteManyFollows();
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();

    console.log('Data Destroyed...');
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

module.exports = async () => {
  const command = process.argv[5];
  switch (command) {
    case 'i':
    case 'import':
      await importData();
      break;
    case 'd':
    case 'delete':
      await deleteData();
      break;
    default:
      break;
  }
};
