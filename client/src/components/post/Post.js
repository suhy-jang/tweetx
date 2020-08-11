import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import BackBtn from '../layouts/BackBtn';
import { Link } from 'react-router-dom';

const Post = (props) => {
  return (
    <div class="splash single-post p-4 h-100 mx-auto d-flex border position-relative">
      <Head title="(Alice Russell) on TweetX: (Content)" />
      <BackBtn />
      <div>
        <Link to="./profile.html">
          <img
            src="https://source.unsplash.com/featured?painting"
            alt=""
            class="profile-img"
          />
        </Link>
      </div>
      <div class="post-content d-flex flex-column">
        <div>
          <a
            href="./profile-follower.html"
            class="underline font-weight-bold d-inline"
          >
            Melissa Berry
          </a>
        </div>
        <span class="text-secondary font-sm mb-3">
          @melissa_berry - 10 mins ago
        </span>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit iure distinctio dolorum iste esse dolorem similique
          nobis sed quibusdam earum?
        </p>
      </div>
    </div>
  );
};

Post.propTypes = {};

export default Post;
