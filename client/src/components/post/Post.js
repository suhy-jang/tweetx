import React from 'react';
import Head from '../head/Head';
import BackBtn from '../layouts/BackBtn';
import { Link, useLocation } from 'react-router-dom';

const Post = () => {
  const location = useLocation();

  const post = location.state.post;

  return (
    <div className="splash mx-auto post single-post p-4 h-100">
      <Head title="(Alice Russell) on TweetX: (Content)" />
      <BackBtn />
      <div className="desktop header text-center my-2">Post</div>
      <div className="d-flex">
        <div className="pt-3">
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
          <span className="text-secondary font-sm mb-3">
            @{post.author.username} - 10 mins ago
          </span>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
