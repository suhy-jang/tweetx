import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { unregister } from '../../actions/auth';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Unregister = ({ auth: { isAuthenticated }, unregister }) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (window.confirm('Are you sure you wish to delete your account?')) {
      unregister('Successfully deleted.');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="text-secondary mb-1">Unhappy?</div>
      <button
        onClick={onClick}
        className="btn btn-link-primary text-primary py-0 px-1 font-sm hover-text-white"
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
