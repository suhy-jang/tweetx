import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import TabBar from './TabBar';
import BackBtn from '../layouts/BackBtn';
import UserInfoBar from './UserInfoBar';
import Users from '../users/Users';

const ProfileFollowings = (props) => {
  return (
    <div>
      <Head title={`People followed by William Franklin / `} />
      <BackBtn />
      <UserInfoBar />
      <TabBar />
      <Users users={() => console.log('followings')} />
    </div>
  );
};

ProfileFollowings.propTypes = {
  user: PropTypes.object,
  followings: PropTypes.array,
};

export default ProfileFollowings;
