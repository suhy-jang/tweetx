import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const Navbar = (props) => {
  const pathname = useLocation().pathname;
  const selected = (path) => (pathname === path ? 'selected' : 'desktop');

  return (
    <>
      <div className="header sticky-top font-lg bg-white py-1">
        <div className="container">
          <div className="d-md-flex justify-content-between align-items-baseline">
            <div className="desktop">
              <Link to="./" className="font-main-logo text-primary">
                TweetX
              </Link>
            </div>
            <div className="header-menubar">
              <Link to="./feed" className={`${selected('/feed')}`}>
                Feed
              </Link>
              <Link to="./users.html" className={`${selected('/users')}`}>
                Users
              </Link>
              <Link to="./profile" className={`${selected('/profile')}`}>
                Profile
              </Link>
              <Link to="./logout.html" className={`${selected('/logout')}`}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
