import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { loading, isAuthenticated },
  ...rest
}) =>
  !loading && (
    <Route
      {...rest}
      render={(props) =>
        loading || isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login-or-register" />
        )
      }
    />
  );

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
