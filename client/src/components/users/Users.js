import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import Head from '../head/Head';
import { getUsers } from '../../actions/profile';

const Users = ({ profile: { profiles }, getUsers }) => {
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  profile: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getUsers })(Users);
