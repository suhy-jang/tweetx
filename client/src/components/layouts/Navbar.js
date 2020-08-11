import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const Navbar = (props) => {
  const pathname = useLocation().pathname;
  const selected = (path) => (pathname.includes(path) ? 'selected' : 'desktop');

  return (
    <>
      <div className="header sticky-top font-lg bg-white">
        <div className="container">
          <div className="d-md-flex justify-content-between align-items-baseline">
            <div className="desktop">
              <Link to="./" className="font-main-logo text-primary">
                TweetX
              </Link>
            </div>
            <ul className="header-menubar mb-0">
              <li>
                <Link to="./feed" className={`${selected('/feed')}`}>
                  Feed
                </Link>
              </li>
              <li>
                <Link to="./users" className={`${selected('/users')}`}>
                  Users
                </Link>
              </li>
              <li>
                <Link to="./profile" className={`${selected('/profile')}`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="./logout.html" className={`${selected('/logout')}`}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
