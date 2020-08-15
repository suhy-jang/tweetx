import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from '../posts/Post';
import NewPostBtn from '../posts/NewPostBtn';
import { connect } from 'react-redux';
import { getMyFeed } from '../../actions/post';
import Head from '../head/Head';
import MobileHeader from '../layouts/MobileHeader';

const Feed = ({ auth: { isAuthenticated }, post: { myFeed }, getMyFeed }) => {
  useEffect(() => {
    getMyFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="posts">
      <Head title="Feed" />
      <MobileHeader title="feed" optionTwo={true} />
      <NewPostBtn />
      {myFeed.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

Feed.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getMyFeed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getMyFeed })(Feed);
