import React from 'react';
import PropTypes from 'prop-types';
import Post from '../posts/Post';
import NewPostBtn from '../posts/NewPostBtn';
import TabBar from './TabBar';
import UserInfoBar from './UserInfoBar';

const Profile = (props) => {
  return (
    <div>
      <UserInfoBar />
      <TabBar />
      <div className="posts border-top">
        <NewPostBtn />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
};

export default Profile;
