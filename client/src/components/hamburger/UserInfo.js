import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserInfo = ({ user, onClick }) => {
  return (
    <div className="d-flex position-relative pl-2 pt-5">
      <Link
        to={{
          pathname: '/profile',
          state: { user },
        }}
        onClick={onClick}
      >
        <img
          src="https://source.unsplash.com/featured?painting"
          alt=""
          className="profile-img"
        />
      </Link>
      <div className="ml-3">
        <Link
          to={{
            pathname: '/profile',
            state: { user },
          }}
          className="underline"
          onClick={onClick}
        >
          <div className="font-weight-bold font-lg">{user.fullname}</div>
        </Link>
        <div className="text-secondary">{user.email}</div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserInfo;
