import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Follow from '../follow/Follow';

const User = ({ user }) => {
  return (
    <div className="user d-flex border-bottom clearfix">
      <Link
        to={{
          pathname: '/profile',
          state: { user },
        }}
        className="user-element float-left"
      >
        <img
          src="https://source.unsplash.com/featured?painting"
          alt=""
          className="profile-img"
        />
      </Link>
      <div className="user-element ml-2">
        <Link
          to={{
            pathname: '/profile',
            state: { user },
          }}
          className="underline font-weight-bold d-inline"
        >
          {user.fullname}
        </Link>{' '}
        <span className="text-secondary font-sm">@{user.username}</span>
        <div className="text-secondary font-sm">
          Following : {user.followers.length}
        </div>
      </div>
      <div className="user-element flex-column-center">
        <Follow user={user} className="float-right" />
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
