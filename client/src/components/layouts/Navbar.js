import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ auth: { isAuthenticated, user } }) => {
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];
  const title =
    location.state && location.state.title ? location.state.title : pathname;
  const selected = (path) => (pathname.includes(path) ? 'selected' : '');

  return (
    <>
      <div className="header sticky-top zindex-top font-lg bg-white py-1">
        <div className="container">
          <div className="mobile text-center">{title}</div>
          <div className="desktop d-md-flex justify-content-between align-items-baseline">
            <div>
              <Link to="/" className="font-main-logo text-primary">
                TweetX
              </Link>
            </div>
            {isAuthenticated && (
              <ul className="header-menubar mb-0">
                <li>
                  <Link to="/feed" className={`${selected('/feed')}`}>
                    Feed
                  </Link>
                </li>
                <li>
                  <Link to="/users" className={`${selected('/users')}`}>
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: '/profile',
                      state: { user },
                    }}
                    className={`${selected('/profile')}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className={`${selected('/logout')}`}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
