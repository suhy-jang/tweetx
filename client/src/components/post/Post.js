import React from 'react';
import Head from '../head/Head';
import BackBtn from '../layouts/BackBtn';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import DeletePost from './DeletePost';

const Post = ({ auth: { user } }) => {
  const location = useLocation();

  const post = location.state.post;

  return (
    <div className="splash mx-auto post single-post p-4 h-100">
      <Head title={`${post.author.fullname} on TweetX: ${post.content}`} />
      <BackBtn />
      <div className="desktop header text-center my-2">Post</div>
      <div className="d-flex">
        <div className="pt-3">
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
        <div className="post-content d-flex flex-column w-100">
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
          <span className="text-secondary font-sm mb-3">
            @{post.author.username} - 10 mins ago
          </span>
          <p>{post.content}</p>
          {user && user.id === post.author.id && <DeletePost id={post.id} />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Post);
