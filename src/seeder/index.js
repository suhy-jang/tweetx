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
  const userRecords = [];

  for (const user of users) {
    const password = await bcrypt.hash(user.password, 10);

    userRecords.push({
      ...user,
      password,
    });
  }

  await prisma.user.createMany({
    data: userRecords,
  });
  return await prisma.user.findMany();
};

const createPosts = async (users) => {
  const postRecords = [];

  for (const post of posts) {
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex];
    postRecords.push({
      content: post.content,
      authorId: randomUser.id,
    });
  }

  await prisma.post.createMany({
    data: postRecords,
  });
};

const createFollows = async (users) => {
  const followRecords = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      followRecords.push({
        followingId: users[i].id,
        followerId: users[j].id,
      });

      followRecords.push({
        followingId: users[j].id,
        followerId: users[i].id,
      });
    }
  }

  await prisma.follow.createMany({
    data: followRecords,
  });
};

const importData = async () => {
  try {
    console.log('Data Importing...');

    const users = await createUsers();
    await createPosts(users);
    await createFollows(users);

    console.log('Data Imported...');
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    console.log('Data Destroying...');

    await prisma.follow.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    console.log('Data Destroyed...');
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  const command = process.argv[process.argv.length - 1];
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

module.exports = main;
