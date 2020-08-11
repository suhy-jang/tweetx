import React from 'react';
import PropTypes from 'prop-types';
import Post from '../posts/Post';
import NewPostBtn from '../posts/NewPostBtn';

const Feed = (props) => {
  return (
    <div className="posts">
      <NewPostBtn />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

Feed.propTypes = {
  myFeed: PropTypes.object,
};

export default Feed;
