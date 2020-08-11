import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import Head from '../head/Head';

const Users = (props) => {
  return (
    <div className="users desktop-mt-3">
      <Head title="Connect" />
      <User />
      <User />
      <User />
      <User />
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.object,
};

export default Users;
