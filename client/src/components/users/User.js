import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Follow from '../follow/Follow';

const User = ({ user, handleFollow, loading, followed, myself }) => {
  return (
    <div className="user d-flex border-bottom clearfix">
      <Link to="/profile" state={{ user }} className="user-element float-left">
        <img src={user.photoUrl} alt="" className="profile-img" />
      </Link>
      <div className="user-element ml-2">
        <Link
          to="/profile"
          state={{ user }}
          className="underline font-weight-bold d-inline"
        >
          {user.fullname}
        </Link>{' '}
        <span className="text-secondary font-sm">@{user.username}</span>
        <div className="text-secondary font-sm">
          Followers : {user.followers.length}
        </div>
      </div>
      {!myself && (
        <div className="user-element flex-column-center">
          <Follow
            className="float-right"
            handleFollow={handleFollow}
            loading={loading}
            followed={followed}
            userId={user.id}
          />
        </div>
      )}
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  handleFollow: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  followed: PropTypes.bool.isRequired,
};

export default User;
