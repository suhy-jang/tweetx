import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import TabBar from './TabBar';
import BackBtn from '../layouts/BackBtn';
import UserInfoBar from './UserInfoBar';
import User from '../users/User';

const ProfileFollowings = (props) => {
  return (
    <div>
      <Head title={`People followed by William Franklin`} />
      <BackBtn />
      <UserInfoBar />
      <TabBar />
      <div className="users border-top">
        <User user={{ name: 'following' }} />
      </div>
    </div>
  );
};

ProfileFollowings.propTypes = {
  user: PropTypes.object,
  followings: PropTypes.array,
};

export default ProfileFollowings;
