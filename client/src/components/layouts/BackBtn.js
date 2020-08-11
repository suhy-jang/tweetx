import React from 'react';
import PropTypes from 'prop-types';

const BackBtn = (props) => {
  const onClick = () => {
    window.history.back();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white position-fixed lt px-1 cursor-pointer mobile"
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

BackBtn.propTypes = {};

export default BackBtn;
