import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { unregister } from '../../actions/auth';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Unregister = ({ auth, unregister }) => {
  const navigate = useNavigate();
  const onClick = (e) => {
    if (window.confirm('Are you sure you wish to delete your account?')) {
      unregister();
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <>
      <div className="text-secondary mb-1">Unhappy?</div>
      <button
        onClick={onClick}
        className="btn btn-link-primary text-primary p-0 font-sm"
      >
        Cancel my account
      </button>
    </>
  );
};

Unregister.propTypes = {
  auth: PropTypes.object.isRequired,
  unregister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { unregister })(Unregister);
