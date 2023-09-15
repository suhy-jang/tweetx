import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ auth: { isAuthenticated, user } }) => {
  const location = useLocation();
  const selected = (path) =>
    location.pathname.includes(path) ? 'selected' : '';

  const links = [
    { path: '/feed', label: 'Feed' },
    { path: '/users', label: 'Users', state: { user } },
    { path: '/profile', label: 'Profile', state: { user } },
    { path: '/logout', label: 'Logout' },
  ];

  return (
    <>
      <div className="desktop header sticky-top zindex-top font-lg bg-white py-1">
        <div className="container">
          <div className="d-md-flex justify-content-between align-items-baseline">
            <div>
              <Link to="/" className="font-main-logo text-primary">
                TweetX
              </Link>
            </div>
            {isAuthenticated && (
              <ul className="header-menubar mb-0">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`${selected(link.path)}`}
                      state={link.state}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
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
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(Navbar);
