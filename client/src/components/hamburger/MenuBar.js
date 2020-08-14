import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuBar = ({ user, onClick }) => {
  return (
    <div className="py-3">
      <div className="my-4">
        <Link
          to="/feed"
          onClick={onClick}
          className="btn btn-lighter rounded-pill px-3 py-2 font-lg font-weight-bold"
        >
          <i className="fas fa-dove"></i> <span className="nav-text">Feed</span>
        </Link>
      </div>
      <div className="my-4">
        <Link
          to={{
            pathname: '/profile',
            state: { user },
          }}
          onClick={onClick}
          className="btn btn-lighter rounded-pill px-3 py-2 font-lg font-weight-bold"
        >
          <i className="fas fa-user-alt"></i>{' '}
          <span className="nav-text">My Profile</span>
        </Link>
      </div>
      <div className="my-4">
        <Link
          to="/users"
          onClick={onClick}
          className="btn btn-lighter rounded-pill px-3 py-2 font-lg font-weight-bold"
        >
          <i className="fas fa-user-friends"></i>{' '}
          <span className="nav-text">User List</span>
        </Link>
      </div>
      <div className="my-4">
        <Link
          to="/logout"
          onClick={onClick}
          className="btn btn-lighter rounded-pill px-3 py-2 font-lg font-weight-bold"
        >
          <i className="fas fa-sign-out-alt"></i>{' '}
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
