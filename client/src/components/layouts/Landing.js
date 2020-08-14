import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ auth: { loading, isAuthenticated, user } }) => {
  if (loading) {
    return <div>loading...</div>;
  }
  return isAuthenticated ? (
    <Redirect to="/feed" />
  ) : (
    <Redirect to="/login-or-register" />
  );
};

Landing.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
