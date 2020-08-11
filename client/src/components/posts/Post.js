import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Post = (props) => {
  return (
    <div className="post d-flex border">
      <div>
        <Link to="/profile">
          <img
            src="https://source.unsplash.com/featured?painting"
            alt=""
            className="profile-img"
          />
        </Link>
      </div>
      <div className="post-content d-flex flex-column">
        <div>
          <Link to="/profile" className="underline font-weight-bold d-inline">
            Melissa Berry
          </Link>
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
          <Link to="/post" className="w-100 h-100 post-indicator font-sm">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
