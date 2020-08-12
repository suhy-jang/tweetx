import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackBtn from '../layouts/BackBtn';
import SplashBg from './SplashBg';

const ResetPasswordConfirm = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    resetToken: '',
    password: '',
    password2: '',
  });

  const { resetToken, password, password2 } = formData;

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
    delete formData.password2;
    // send, if success
    window.alert(`Successfully updated.`);
    console.log(formData);
    history.push('/login');
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="splash position-relative">
        <BackBtn />
        <div className="mobile header sticky-top font-lg text-center py-1">
          Password Reset
        </div>
        <div className="p-3 flex-column-between">
          <h4 className="mt-3">Reset your password</h4>
          <div className="font-sm description my-2">
            Enter the email received token and new password
          </div>
          <form onSubmit={onSubmit} className="form my-3">
            <div className="form-group">
              <input
                type="text"
                name="resetToken"
                placeholder="Reset Token"
                onChange={onChange}
                value={resetToken}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="password"
                placeholder="Password"
                onChange={onChange}
                value={password}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                onChange={onChange}
                value={password2}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Confirm"
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

export default ResetPasswordConfirm;
