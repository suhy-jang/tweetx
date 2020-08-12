import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HamburgerMenu = (props) => {
  const [expanded, setExpanded] = useState(false);
  const onClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="btn btn-link hamburger-btn p-0 position-fixed zindex-top lt mobile"
      >
        {expanded ? 'X' : '☰'}
      </button>
      <div
        className={`mobile hamburger-menu ${
          expanded && 'hamburger-menu-expanded'
        }`}
      >
        <div className="d-flex position-relative pl-2 pt-5">
          <Link to="/profile" onClick={onClick}>
            <img
              src="https://source.unsplash.com/featured?painting"
              alt=""
              className="profile-img"
            />
          </Link>
          <div className="ml-3">
            <Link to="/profile" className="underline" onClick={onClick}>
              <div className="font-weight-bold font-lg">William Franklin</div>
            </Link>
            <div className="text-secondary">will.frank@email.com</div>
          </div>
        </div>
        <div className="py-3">
          <div className="my-4">
            <Link
              to="/feed"
              onClick={onClick}
              className="btn btn-lighter rounded-pill px-3 py-2 font-lg font-weight-bold"
            >
              <i className="fas fa-dove"></i>{' '}
              <span className="nav-text">Feed</span>
            </Link>
          </div>
          <div className="my-4">
            <Link
              to="/profile"
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
      </div>
    </div>
  );
};

HamburgerMenu.propTypes = {
  auth: PropTypes.object,
};

export default HamburgerMenu;
