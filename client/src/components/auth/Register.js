import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import SplashBg from './SplashBg';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register, verifyEmail } from '../../actions/auth';
import Head from '../head/Head';
import MobileHeader from '../layouts/MobileHeader';
import { Tooltip } from 'react-tippy';
import 'tippy.js/dist/tippy.css';

const Register = ({ auth, setAlert, register, verifyEmail }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    password2: '',
  });

  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  // eslint-disable-next-line
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { fullname, username, email, password, password2 } = formData;

  const sendEmailVerification = (e) => {
    e.preventDefault();
    verifyEmail(
      {
        email,
        isRegistering: true,
        successMsg: `An email has been sent for verification. 
          Please open your email and follow the instructions.`,
      },
      () => {
        setEmailVerificationSent(true);
      },
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((el) => el === '')) {
      return setAlert('All required fields must be filled out', 'danger');
    }
    if (!emailRegex.test(email)) {
      return setAlert('Email format is not valid', 'danger');
    }
    if (password.length < 6) {
      return setAlert('Password should be minimum 6 characters', 'danger');
    }
    if (password !== password2) {
      return setAlert('New and confirm password must be equal', 'danger');
    }
    register(formData, { successMsg: 'Successfully sign up' });
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <div className="d-flex">
      <div className="content">
        <Head title="Sign up for TweetX" />
        <MobileHeader
          title="Create Account"
          redirect={() => {
            navigate('login-or-register');
          }}
        />
        <Link
          to="/login"
          className="desktop btn btn-outline-secondary rounded-pill px-3 py-2 w-50 font-weight-bold"
        >
          Login
        </Link>
        <div className="p-3 flex-column-between">
          <div className="font-sm description mt-3 mb-3">
            Fill in the required details and click Proceed.
          </div>
          <form onSubmit={onSubmit} className="form">
            <div className="form-group">
              <input
                type="text"
                name="fullname"
                onChange={onChange}
                placeholder="Name"
                value={fullname}
                className="form-control"
              />
            </div>
            {/* to use custome alert, email type is text */}
            <div className="form-group d-flex">
              <input
                type="text"
                name="email"
                onChange={onChange}
                placeholder="Email ID"
                value={email}
                className="form-control"
              />
              <button
                onClick={sendEmailVerification}
                className="btn btn-outline-primary rounded-pill px-2 py-1 ml-2"
              >
                Verify
              </button>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="username"
                onChange={onChange}
                placeholder="Username"
                value={username}
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
                type="password"
                name="password2"
                onChange={onChange}
                placeholder="Confirm Password"
                value={password2}
                className="form-control"
              />
            </div>
            <div className="font-sm description text-center mx-auto my-4">
              By Creating Account, you are automatically accepting all the{' '}
              <Link to="/register">Terms & Conditions</Link> related to Momento
            </div>
            <div className="form-group">
              <Tooltip
                key={emailVerificationSent.toString()}
                title={
                  emailVerificationSent ? '' : 'Email verification is required'
                }
                position="top"
              >
                <span>
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary rounded-pill form-control submit-btn"
                    disabled={!emailVerificationSent}
                  />
                </span>
              </Tooltip>
            </div>
          </form>
          <div className="mobile content-description font-sm">
            <Link to="/login" className="text-primary">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
      <SplashBg />
    </div>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  verifyEmail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  register,
  verifyEmail,
})(Register);
