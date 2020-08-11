import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import TabBar from './TabBar';
import BackBtn from '../layouts/BackBtn';
import UserInfoBar from './UserInfoBar';
import User from '../users/User';

const ProfileFollowers = (props) => {
  return (
    <div>
      <Head title={`People following William Franklin`} />
      <BackBtn />
      <UserInfoBar />
      <TabBar />
      <div className="users border-top">
        <User user={() => console.log('followers')} />
      </div>
    </div>
  );
};

ProfileFollowers.propTypes = {
  user: PropTypes.object,
  followers: PropTypes.array,
};

export default ProfileFollowers;
