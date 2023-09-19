import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faUserAlt,
  faUserFriends,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const MenuBar = ({ user, onClick }) => {
  return (
    <div className="py-3">
      <div className="my-4">
        <Link
          to="/feed"
          onClick={onClick}
          className="btn btn-lighter rounded-pill px-3 py-2 font-lg font-weight-bold"
        >
          <FontAwesomeIcon icon={faXTwitter} />{' '}
          <span className="nav-text pl-2">Feed</span>
        </Link>
      </div>
      <div className="my-4">
        <Link
          to="/profile"
          state={{ user }}
          onClick={onClick}
          className="btn btn-lighter rounded-pill px-3 py-2 font-lg font-weight-bold"
        >
          <FontAwesomeIcon icon={faUserAlt} />{' '}
          <span className="nav-text pl-2">My Profile</span>
        </Link>
      </div>
      <div className="my-4">
        <Link
          to="/users"
          state={{ user }}
          onClick={onClick}
          className="btn btn-lighter rounded-pill px-3 py-2 font-lg font-weight-bold"
        >
          <FontAwesomeIcon icon={faUserFriends} />{' '}
          <span className="nav-text">User List</span>
        </Link>
      </div>
      <div className="my-4">
        <Link
          to="/logout"
          onClick={onClick}
          className="btn btn-lighter rounded-pill px-3 py-2 font-lg font-weight-bold"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />{' '}
          <span className="nav-text">Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuBar;
