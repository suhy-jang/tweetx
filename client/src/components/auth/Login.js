import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SplashBg from './SplashBg';
import { Link, Redirect } from 'react-router-dom';
import BackBtn from '../layouts/BackBtn';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';

const Login = ({ auth, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((el) => el === '')) {
      return setAlert('All required fields must be filled out', 'danger');
    }
    if (password.length < 6) {
      return setAlert('Password should be minimum 6 characters', 'danger');
    }
    /* no checking email validation in case of username */
    login(formData, { successMsg: 'Successfully logged in' });
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="splash">
        <BackBtn />
        <Link
          to="/register"
          className="desktop btn btn-outline-secondary rounded-pill px-3 py-2 w-50 font-weight-bold"
        >
          Register
        </Link>
        <div className="header sticky-top font-lg text-center py-1">
          Sign In
        </div>
        <div className="p-3 flex-column-between">
          <div className="font-sm description my-5">
            Type in your Email ID or Username and Password you chose for Momento
            and click Go to Feed
          </div>
          <form onSubmit={onSubmit} className="form my-3">
            <div className="form-group">
              {/* email or username: input should not be email type */}
              <input
                type="text"
                name="email"
                onChange={onChange}
                placeholder="Email ID or Username"
                value={email}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                onChange={onChange}
                placeholder="Password"
                value={password}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary rounded-pill form-control submit-btn"
              />
            </div>
          </form>
          <div className="mobile splash-description font-sm mb-3">
            <Link to="/register" className="text-primary">
              Create an account
            </Link>
            <span className="text-secondary">to use TweetX for free!</span>
          </div>
          <div className="splash-description font-sm">
            <Link to="/reset-password" className="text-primary">
              Can't Sign In? Reset Password
            </Link>
          </div>
        </div>
      </div>
      <SplashBg />
    </>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
