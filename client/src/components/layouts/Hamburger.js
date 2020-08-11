import React from 'react';
import PropTypes from 'prop-types';

const Hamburger = (props) => {
  return (
    <div>
      <a
        href="./hamburger-menu.html"
        className="nav-open-btn position-fixed lt mobile"
      >
        ☰
      </a>
    </div>
  );
};

Hamburger.propTypes = {};

export default Hamburger;
