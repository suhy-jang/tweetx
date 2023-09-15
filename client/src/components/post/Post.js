import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import DeletePost from './DeletePost';
import MobileHeader from '../layouts/MobileHeader';

const Post = ({ auth: { user } }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const post = location.state ? location.state.post : undefined;

  useEffect(() => {
    if (!post) {
      navigate('/');
    }
  }, [post, navigate]);

  return (
    <div className="splash mx-auto post single-post border-0 p-4 h-100">
      <Head title={`${post.author.fullname} on TweetX: ${post.content}`} />
      <MobileHeader
        title="Post"
        redirect={() => navigate(-1)}
        optionTwo={true}
      />
      <div className="desktop header text-center my-2">Post</div>
      <div className="d-flex">
        <div className="pt-3">
          <Link to="/profile" state={{ user: post.author }}>
            <img src={post.author.photoUrl} alt="" className="profile-img" />
          </Link>
        </div>
        <div className="post-content d-flex flex-column w-100">
          <div>
            <Link
              to="/profile"
              state={{ user: post.author }}
              className="underline font-weight-bold d-inline"
            >
              {post.author.fullname}
            </Link>
          </div>
          <span className="text-secondary font-sm mb-3">
            @{post.author.username} - 10 mins ago
          </span>
          <p className="white-space-pre">{post.content}</p>
          {user && user.id === post.author.id && <DeletePost id={post.id} />}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Post);
