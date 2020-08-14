import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserInfo from './UserInfo';
import MenuBar from './MenuBar';

const HamburgerMenu = ({ auth: { isAuthenticated, user } }) => {
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
        {isAuthenticated && (
          <>
            <UserInfo onClick={onClick} user={user} />
            <MenuBar onClick={onClick} user={user} />
          </>
        )}
      </div>
    </div>
  );
};

HamburgerMenu.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(HamburgerMenu);
