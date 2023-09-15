import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import Head from '../head/Head';
import { unfollowedUsers } from '../../actions/profile';
import MobileHeader from '../layouts/MobileHeader';
import { useLocation, useNavigate } from 'react-router-dom';

const Users = ({ profile: { loading, profiles }, unfollowedUsers }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  useEffect(() => {
    if (user) {
      unfollowedUsers(user.id);
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  return (
    <div className="users m-3">
      <Head title="Connect" />
      <MobileHeader title="users" optionTwo={true} />
      <h4 className="mb-3">Who to follow...</h4>
      {profiles.length > 0 ? (
        profiles.map((profile) => <User key={profile.id} user={profile} />)
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
