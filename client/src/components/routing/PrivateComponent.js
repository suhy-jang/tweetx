import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateComponent = ({
  Component,
  auth: { loading, isAuthenticated },
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login-or-register');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <>loading...</>;
  }

  return <Component />;
};

PrivateComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateComponent);
