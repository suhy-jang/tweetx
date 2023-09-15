import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SplashBg from './SplashBg';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

const Logout = ({ auth, logout }) => {
  const navigate = useNavigate();

  const cancelClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <>
      <div className="logout splash flex-column-evenly">
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
            onClick={logout}
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
