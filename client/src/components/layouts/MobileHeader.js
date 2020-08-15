import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const MobileHeader = ({ title, optionTwo, back, desktop }) => {
  const history = useHistory();

  const onClick = () => {
    history.goBack();
  };

  const option2 = optionTwo && 'fixed-top bg-white';

  const backBtn = back ? '' : 'd-none';

  const zindexTop = back ? 'zindex-top' : '';

  const mobile = desktop ? '' : 'mobile';

  return (
    <div>
      <div
        className={`${mobile} header ${zindexTop} font-lg text-center py-1 ${option2}`}
      >
        <div
          onClick={onClick}
          className={`position-absolute bg-white ml-3 mt-1 cursor-pointer mobile ${backBtn}`}
        >
          <i className="fas fa-chevron-left"></i>
        </div>
        {title}
      </div>
    </div>
  );
};

MobileHeader.propTypes = {
  title: PropTypes.string.isRequired,
  optionTwo: PropTypes.bool,
  back: PropTypes.bool,
  desktop: PropTypes.bool,
};

export default MobileHeader;
