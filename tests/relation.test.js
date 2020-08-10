import 'core-js/stable';
import 'cross-fetch/polyfill';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import {
  myFeed,
  follow,
  unfollow,
  followers,
  followings,
} from './utils/operations';
import { setAuthToken, setBaseUrl } from './utils/axiosDefaults';
import seedDatabase, { userOne, postOne } from './utils/seedDatabase';
import seedDatabase2, { userTwo, userThree } from './utils/seedDatabase2';

// follow: user(3) -> user(1) -> user(2)
beforeAll(seedDatabase);
beforeAll(seedDatabase2);
setBaseUrl();

test('Should get followers', async () => {
  setAuthToken(userOne.jwt);

  const res = await axios.post('/', {
    query: followers,
  });

  const {
    data: { data, errors },
  } = res;

  expect(data.followers[0].follower.id).toBe(userThree.user.id);
});

test('Should get followings', async () => {
  setAuthToken(userOne.jwt);

  const res = await axios.post('/', {
    query: followings,
  });

  const {
    data: { data, errors },
  } = res;

  expect(data.followings[0].following.id).toBe(userTwo.user.id);
});

test('Should get feed', async () => {
  setAuthToken(userOne.jwt);

  const res = await axios.post('/', {
    query: myFeed,
  });

  const {
    data: { data, errors },
  } = res;

  expect(errors).toBe(undefined);
  // my post (1) + following user post (1)
  expect(data.myFeed.length).toBe(2);
  // createdAt desc order
  expect(data.myFeed[0].author.id).toBe(userTwo.user.id);
  expect(data.myFeed[1].author.id).toBe(userOne.user.id);
});

test('Should follow user', async () => {
  setAuthToken(userOne.jwt);

  const variables = {
    id: userThree.user.id,
  };

  const res = await axios.post('/', {
    query: follow,
    variables,
  });

  const {
    data: { data, errors },
  } = res;

  expect(data.follow.following.id).toBe(userThree.user.id);
});

test('Should unfollow user', async () => {
  setAuthToken(userOne.jwt);

  const variables = {
    id: userTwo.user.id,
  };

  const res = await axios.post('/', {
    query: unfollow,
    variables,
  });

  const {
    data: { data, errors },
  } = res;

  expect(data.unfollow).not.toBe(null);
});
