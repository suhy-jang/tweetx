import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import Head from '../head/Head';
import { getUsers } from '../../actions/profile';

const Users = ({
  auth: { isAuthenticated, user },
  profile: { loading, profiles },
  getUsers,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  return (
    <div className="users desktop-mt-3">
      <Head title="Connect" />
      {profiles.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getUsers })(Users);
