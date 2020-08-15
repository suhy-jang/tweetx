import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import Head from '../head/Head';
import { getUsers } from '../../actions/profile';
import MobileHeader from '../layouts/MobileHeader';

const Users = ({ profile: { profiles }, getUsers }) => {
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="users mt-3">
      <Head title="Connect" />
      <MobileHeader title="users" optionTwo={true} />
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
