import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import Head from '../head/Head';
import { unfollowedUsers } from '../../actions/profile';
import MobileHeader from '../layouts/MobileHeader';
import { useLocation, Redirect } from 'react-router-dom';

const Users = ({ profile: { loading, profiles }, unfollowedUsers }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      unfollowedUsers(location.state.user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  if (!location.state) {
    return <Redirect to="/" />;
  }

  return (
    <div className="users m-3">
      <Head title="Connect" />
      <MobileHeader title="users" optionTwo={true} />
      <h4 className="mb-3">Who to follow...</h4>
      {profiles.length > 0 ? (
        profiles.map((user) => <User key={user.id} user={user} />)
      ) : (
        <div>{loading ? 'loading...' : 'no suggested users'}</div>
      )}
    </div>
  );
};

Users.propTypes = {
  profile: PropTypes.object.isRequired,
  unfollowedUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { unfollowedUsers })(Users);
