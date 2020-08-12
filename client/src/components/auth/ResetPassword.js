import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackBtn from '../layouts/BackBtn';
import SplashBg from './SplashBg';

const ResetPassword = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    // if success
    window.alert(`Email sent. Please confirm it within 10 minutes.`);
    console.log(formData);
    history.push('/');
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log('changine', e.target.name, e.target.value);
  };

  return (
    <>
      <div className="splash position-relative">
        <BackBtn />
        <div className="mobile header sticky-top font-lg text-center py-1">
          Password Reset
        </div>
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

export default ResetPassword;
