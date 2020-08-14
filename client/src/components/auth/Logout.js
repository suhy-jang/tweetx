import React from 'react';
import PropTypes from 'prop-types';
import SplashBg from './SplashBg';
import BackBtn from '../layouts/BackBtn';
import { useHistory, Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

const Logout = ({ auth, logout }) => {
  const history = useHistory();

  const cancelClick = () => {
    history.goBack();
  };

  const logoutClick = () => {
    logout();
  };

  if (!auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

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
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Logout);
