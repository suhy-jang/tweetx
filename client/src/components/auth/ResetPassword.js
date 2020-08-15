import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SplashBg from './SplashBg';
import { resetPassword } from '../../actions/auth';
import { connect } from 'react-redux';
import Head from '../head/Head';
import MobileHeader from '../layouts/MobileHeader';

const ResetPassword = ({ resetPassword }) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword(
      formData,
      {
        successMsg: `Email sent. Please confirm it within 10 minutes.`,
      },
      history,
    );
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head title="Reset Password" />
      <div className="splash position-relative">
        <MobileHeader title="Password Reset" />
        <div className="p-3 flex-column-between">
          <h4 className="mt-3">Find your TweetX account</h4>
          <div className="font-sm description my-2">
            Enter your email or username
          </div>
          <form onSubmit={onSubmit} className="form my-3">
            <div className="form-group">
              {/* email or username */}
              <input
                type="text"
                name="email"
                onChange={onChange}
                value={email}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary rounded-pill form-control submit-btn"
              />
            </div>
          </form>
        </div>
      </div>
      <SplashBg />
    </>
  );
};

export default connect(null, { resetPassword })(ResetPassword);
