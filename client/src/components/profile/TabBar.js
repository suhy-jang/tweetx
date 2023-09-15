import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const TabBar = ({ user, disabled }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const selected = (path) => (pathname === path ? ' selected' : '');
  const basicClass = `tab btn btn-lighter font-sm py-2 ${
    disabled && 'disabled'
  }`;

  return (
    <div className="tabbar d-flex font-weight-bold text-center">
      <Link
        to="/profile"
        state={{ user }}
        className={`${basicClass}${selected('/profile')}`}
      >
        <div>{user.posts && user.posts.length}</div>
        <div>POSTS</div>
      </Link>
      <Link
        to="/profile-followers"
        state={{ user }}
        className={`${basicClass}${selected('/profile-followers')}`}
      >
        <div>{user.followers && user.followers.length}</div>
        <div>FOLLOWERS</div>
      </Link>
      <Link
        to="/profile-followings"
        state={{ user }}
        className={`${basicClass}${selected('/profile-followings')}`}
      >
        <div>{user.followings && user.followings.length}</div>
        <div>FOLLOWINGS</div>
      </Link>
    </div>
  );
};

TabBar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TabBar;
