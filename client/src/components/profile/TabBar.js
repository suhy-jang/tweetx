import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const TabBar = ({ user, id }) => {
  const pathname = useLocation().pathname;
  const selected = (path) => (pathname === path ? ' selected' : '');
  const basicClass = 'tap btn btn-lighter font-sm py-2';

  return (
    <div className="tapbar d-flex font-weight-bold text-center">
      <Link
        to={{
          pathname: '/profile',
          state: { id, title: user.fullname },
        }}
        className={`${basicClass}${selected('/profile')}`}
      >
        <div>{user.posts && user.posts.length}</div>
        <div>POSTS</div>
      </Link>
      <Link
        to={{
          pathname: '/profile-followers',
          state: { id, title: user.fullname },
        }}
        className={`${basicClass}${selected('/profile-followers')}`}
      >
        <div>{user.followers && user.followers.length}</div>
        <div>FOLLOWERS</div>
      </Link>
      <Link
        to={{
          pathname: './profile-followings',
          state: { id, title: user.fullname },
        }}
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
  id: PropTypes.string.isRequired,
};

export default TabBar;
