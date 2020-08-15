import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserInfo from './UserInfo';
import MenuBar from './MenuBar';

const HamburgerMenu = ({ auth: { user } }) => {
  const [open, setOpen] = useState(false);

  const itemClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      const screenClick = (e) => e.screenX > 435 && setOpen(false);
      const root = document.getElementById('root');
      root.addEventListener('click', screenClick);
      return () => root.removeEventListener('click', screenClick);
    }
  }, [open]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <button
        type="button"
        onClick={itemClick}
        className="btn btn-link hamburger-btn p-0 position-fixed zindex-top lt mobile"
      >
        {open ? 'X' : '☰'}
      </button>
      <div className={`mobile hamburger-menu ${open && 'hamburger-menu-open'}`}>
        <UserInfo onClick={itemClick} user={user} />
        <MenuBar onClick={itemClick} user={user} />
      </div>
    </>
  );
};

HamburgerMenu.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(HamburgerMenu);
