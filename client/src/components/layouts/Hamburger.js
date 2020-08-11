import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Hamburger = (props) => {
  return (
    <div>
      <Link to="/hamburger-menu.html" className="position-fixed lt mobile">
        ☰
      </Link>
    </div>
  );
};

Hamburger.propTypes = {
  auth: PropTypes.object,
};

export default Hamburger;
