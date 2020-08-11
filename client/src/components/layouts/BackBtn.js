import React from 'react';
import PropTypes from 'prop-types';

const BackBtn = (props) => {
  const onClick = () => {
    window.history.back();
  };

  return (
    <div onClick={onClick} className="position-fixed lt mobile">
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

BackBtn.propTypes = {};

export default BackBtn;
