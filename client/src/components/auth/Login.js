import React, { useState } from 'react';
import SplashBg from './SplashBg';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // send form data to action
    console.log(formData);
  };

  return (
    <>
      <div className="splash position-relative">
        <Link to="/" className="position-absolute">
          <i className="fas fa-chevron-left"></i>
        </Link>
        <Link
          to="/register"
          className="desktop btn btn-outline-secondary rounded-pill px-3 py-2 font-lg font-weight-bold"
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
                value={formData.email}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                onChange={onChange}
                placeholder="Password"
                value={formData.password}
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
            <Link to="/reset-password.html" className="text-primary">
              Can't Sign In? Reset Password
            </Link>
          </div>
        </div>
      </div>
      <SplashBg />
    </>
  );
};

export default Login;
