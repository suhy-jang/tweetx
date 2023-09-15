import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ auth: { loading, isAuthenticated } }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed', { state: location.state });
    } else {
      navigate('/login-or-register');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Outlet />;
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
