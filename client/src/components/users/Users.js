import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const Users = (props) => {
  return (
    <div class="users border-top">
      <User user={() => console.log('passing user')} />
      <User user={() => console.log('passing user')} />
      <User user={() => console.log('passing user')} />
      <User user={() => console.log('passing user')} />
      <User user={() => console.log('passing user')} />
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.object,
};

export default Users;
