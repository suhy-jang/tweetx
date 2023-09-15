import 'core-js/stable';
import 'cross-fetch/polyfill';
import 'regenerator-runtime/runtime';
import getClient from './utils/apolloClient';
import {
  myFeed,
  follow,
  unfollow,
  followers,
  followings,
} from './utils/operations';
import seedDatabase, { userOne } from './utils/seedDatabase';
import seedDatabase2, { userTwo, userThree } from './utils/seedDatabase2';

// follow: user(3) -> user(1) -> user(2)
beforeAll(seedDatabase);
beforeAll(seedDatabase2);

test('Should get followers', async () => {
  const client = getClient(userOne.jwt);

  const res = await client.query({
    query: followers,
  });

  const { data } = res;

  expect(data.followers[0].follower.id).toBe(userThree.user.id);
});

test('Should get followings', async () => {
  const client = getClient(userOne.jwt);

  const res = await client.query({
    query: followings,
  });

  const { data } = res;

  expect(data.followings[0].following.id).toBe(userTwo.user.id);
});

test('Should get feed', async () => {
  const client = getClient(userOne.jwt);

  const res = await client.query({
    query: myFeed,
  });

  const { data, errors } = res;

  expect(errors).toBe(undefined);
  // my post (1) + following user post (1)
  expect(data.myFeed.length).toBe(2);
  // createdAt desc order
  expect(data.myFeed[0].author.id).toBe(userTwo.user.id);
  expect(data.myFeed[1].author.id).toBe(userOne.user.id);
});

test('Should follow user', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    id: userThree.user.id,
  };

  const res = await client.mutate({
    mutation: follow,
    variables,
  });

  const { data } = res;

  expect(data.follow.following.id).toBe(userThree.user.id);
});

test('Should unfollow user', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    id: userTwo.user.id,
  };

  const res = await client.mutate({
    mutation: unfollow,
    variables,
  });

  const { data } = res;

  expect(data.unfollow).not.toBe(null);
});
