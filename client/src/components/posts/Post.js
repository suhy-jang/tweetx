import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className="post d-flex border">
      <div>
        <Link
          to={{
            pathname: '/profile',
            state: { id: post.author.id },
          }}
        >
          <img
            src="https://source.unsplash.com/featured?painting"
            alt=""
            className="profile-img"
          />
        </Link>
      </div>
      <div className="post-content d-flex flex-column">
        <div>
          <Link
            to={{
              pathname: '/profile',
              state: { id: post.author.id },
            }}
            className="underline font-weight-bold d-inline"
          >
            {post.author.fullname}
          </Link>
        </div>
        <div className="text-secondary font-sm mb-3">
          @{post.author.username} - {post.createdAt}
        </div>
        <p>{post.content}</p>
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
  post: PropTypes.object.isRequired,
};

export default Post;
