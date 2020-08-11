import React from 'react';
import PropTypes from 'prop-types';
import SplashBg from './SplashBg';
import BackBtn from '../layouts/BackBtn';
import { useHistory } from 'react-router-dom';

const Logout = (props) => {
  const history = useHistory();

  const cancelClick = () => {
    history.goBack();
  };

  const logoutClick = () => {
    console.log('logout');
    localStorage.removeItem(`(current token) new-post`);
    history.push('/');
  };

  return (
    <>
      <div className="logout splash flex-column-evenly">
        <BackBtn />
        <i className="fas fa-dove font-main-logo"></i>
        <div className="font-weight-bold font-lg">Log out of TweetX?</div>
        <div className="text-secondary font-sm">
          You can always log back in at any time.
        </div>
        <div className="buttons">
          <button
            onClick={cancelClick}
            className="btn btn-outline-primary rounded-pill px-3 py-2 font-lg font-weight-bold"
          >
            Cancel
          </button>
          <button
            onClick={logoutClick}
            className="btn btn-primary rounded-pill px-3 py-2 font-lg font-weight-bold"
          >
            Log out
          </button>
        </div>
      </div>
      <SplashBg />
    </>
  );
};

Logout.propTypes = {
  auth: PropTypes.object,
};

export default Logout;
