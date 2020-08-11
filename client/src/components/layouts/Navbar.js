import React from 'react';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  return (
    <>
      <div className="header sticky-top font-lg bg-white py-1">
        <div className="container">
          <div className="text-center mobile">My Feed</div>
          <div className="desktop d-flex justify-content-between align-items-baseline">
            <div>
              <a href="./feed.html" className="font-main-logo text-primary">
                TweetX
              </a>
            </div>
            <div className="header-menubar">
              <a href="./feed.html" className="selected">
                Feed
              </a>
              <a href="./users.html">Users</a>
              <a href="./myprofile.html">Profile</a>
              <a href="./logout.html">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
