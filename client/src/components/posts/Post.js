import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => {
  return (
    <div className="post d-flex border">
      <div>
        <a href="./profile-follower.html">
          <img
            src="https://source.unsplash.com/featured?painting"
            alt=""
            className="profile-img"
          />
        </a>
      </div>
      <div className="post-content d-flex flex-column">
        <div>
          <a
            href="./profile-follower.html"
            className="underline font-weight-bold d-inline"
          >
            Melissa Berry
          </a>
        </div>
        <div className="text-secondary font-sm mb-3">
          @melissa_berry - 10 mins ago
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit iure distinctio dolorum iste esse dolorem similique
          nobis sed quibusdam earum?
        </p>
        <div>
          <a href="./post.html" className="w-100 h-100 post-indicator font-sm">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {};

export default Post;
