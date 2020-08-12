import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SplashBg from './SplashBg';
import BackBtn from '../layouts/BackBtn';

const Register = (props) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    password2: '',
  });

  const emailRegex = /^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i;

  const { fullname, username, email, password, password2 } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((el) => el === '')) {
      // set alert 'All required fields must be filled out'
      console.log('All required fields must be filled out');
    }
    if (password !== password2) {
      // set alert 'New and confirm password must be equal'
      console.log('New and confirm password must be equal');
    }
    if (password.length < 6) {
      // set alert 'Password should be minimum 6 characters
      console.log('Password should be minimum 6 characters');
    }
    if (!emailRegex.test(email)) {
      // set alert 'Email format is not valid'
      console.log('Email format is not valid');
    }
    // send data to action
    console.log({
      fullname,
      username,
      email,
      password,
    });
    history.push('/');
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="splash">
      <BackBtn />
      <Link
        to="/login"
        className="desktop btn btn-outline-secondary rounded-pill px-3 py-2 w-50 font-weight-bold"
      >
        Login
      </Link>
      <div className="header font-lg text-center py-1">
        <span className="">Create Account</span>
      </div>
      <div className="p-3 flex-column-between">
        <div className="font-sm description mt-5 mb-3">
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
          <div className="form-group">
            <input
              type="text"
              name="email"
              onChange={onChange}
              placeholder="Email ID"
              value={email}
              className="form-control"
            />
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
            <Link to="#">Terms & Conditions</Link> related to Momento
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary rounded-pill form-control submit-btn"
            />
          </div>
        </form>
        <div className="mobile splash-description font-sm">
          <Link to="/login" className="text-primary">
            Already have an account?
          </Link>
        </div>
      </div>
      <SplashBg />
    </div>
  );
};

export default Register;
