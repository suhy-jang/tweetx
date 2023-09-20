import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SplashBg from './SplashBg';
import { useParams } from 'react-router-dom';
import { resetPasswordConfirm, logout } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import MobileHeader from '../layouts/MobileHeader';
import Head from '../head/Head';

const ResetPasswordConfirm = ({
  auth: { isAuthenticated },
  resetPasswordConfirm,
  logout,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  const { resetToken } = params;
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });

  const { password, password2 } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((el) => el === '')) {
      return setAlert('All required fields must be filled out', 'danger');
    }
    if (password !== password2) {
      return setAlert('New and confirm password must be equal', 'danger');
    }
    if (password.length < 6) {
      return setAlert('Password should be minimum 6 characters', 'danger');
    }
    delete formData.password2;
    resetPasswordConfirm({
      resetToken,
      password,
      successMsg: `Successfully updated.`,
    });
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Head title="Reset Password Confirm" />
      <div className="splash position-relative">
        <MobileHeader title="Password Reset" />
        <div className="p-3 flex-column-between">
          <h4 className="mt-3">Reset your password</h4>
          <div className="font-sm description my-2">Enter new password</div>
          <form onSubmit={onSubmit} className="form my-3">
            <div className="form-group">
              <input
                type="password"
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
                name="password2"
                placeholder="Confirm Password"
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

ResetPasswordConfirm.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { resetPasswordConfirm, logout })(
  ResetPasswordConfirm,
);
