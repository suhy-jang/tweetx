import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import TabBar from './TabBar';
import BackBtn from '../layouts/BackBtn';
import UserInfoBar from './UserInfoBar';
import Users from '../users/Users';

const ProfileFollowers = (props) => {
  return (
    <div>
      <Head title={`People followed by William Franklin / `} />
      <BackBtn />
      <UserInfoBar />
      <TabBar />
      <Users users={() => console.log('followers')} />
    </div>
  );
};

ProfileFollowers.propTypes = {
  user: PropTypes.object,
  followers: PropTypes.array,
};

export default ProfileFollowers;
