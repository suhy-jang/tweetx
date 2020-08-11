import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const TabBar = (props) => {
  const pathname = useLocation().pathname;
  const selected = (path) => (pathname === path ? ' selected' : '');
  const basicClass = 'tap btn btn-lighter font-sm py-2';

  const pathState = {
    state: {
      title: 'William Franklin',
    },
  };

  return (
    <div className="tapbar d-flex font-weight-bold text-center">
      <Link to="/profile" className={`${basicClass}${selected('/profile')}`}>
        <div>8</div>
        <div>POSTS</div>
      </Link>
      <Link
        to={{ pathname: '/profile-followers', ...pathState }}
        className={`${basicClass}${selected('/profile-followers')}`}
      >
        <div>16</div>
        <div>FOLLOWERS</div>
      </Link>
      <Link
        to={{ pathname: './profile-followings', ...pathState }}
        className={`${basicClass}${selected('/profile-followings')}`}
      >
        <div>34</div>
        <div>FOLLOWINGS</div>
      </Link>
    </div>
  );
};

TabBar.propTypes = {
  posts: PropTypes.number,
  followers: PropTypes.number,
  followings: PropTypes.number,
  fullname: PropTypes.string,
};

export default TabBar;
