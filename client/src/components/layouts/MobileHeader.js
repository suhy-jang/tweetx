import React from 'react';
import PropTypes from 'prop-types';

const MobileHeader = ({ title, optionTwo, desktop, redirect }) => {
  const onClick = () => {
    if (redirect) {
      redirect();
    }
  };

  const option2 = optionTwo && 'fixed-top bg-white';

  const backBtn = redirect ? '' : 'd-none';

  const zindexTop = redirect ? 'zindex-top' : '';

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
  desktop: PropTypes.bool,
  redirect: PropTypes.func,
};

export default MobileHeader;
