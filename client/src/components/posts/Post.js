import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Post = ({ post }) => {
  return (
    <div className="post d-flex border">
      <div>
        <Link
          to={{
            pathname: '/profile',
            state: { user: post.author },
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
              state: { user: post.author },
            }}
            className="underline font-weight-bold d-inline"
          >
            {post.author.fullname}
          </Link>
        </div>
        <div className="text-secondary font-sm mb-3">
          @{post.author.username} -{' '}
          <Moment fromNow ago>
            {post.createdAt}
          </Moment>{' '}
          ago
        </div>
        <p className="white-space-pre">{post.content}</p>
        <div>
          <Link
            to={{
              pathname: '/post',
              state: { post },
            }}
            className="w-100 h-100 post-indicator font-sm"
          >
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
