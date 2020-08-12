import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ auth: { loading, isAuthenticated } }) => {
  if (!loading) {
    return isAuthenticated ? (
      <Redirect to="/feed" />
    ) : (
      <Redirect to="/login-or-register" />
    );
  }
  return <div>loading</div>;
};

Landing.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
