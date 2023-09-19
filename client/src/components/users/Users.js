import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import Head from '../head/Head';
import { unfollowedUsers } from '../../actions/profile';
import MobileHeader from '../layouts/MobileHeader';
import { useNavigate } from 'react-router-dom';
import { follow, unfollow, getFollowings } from '../../actions/follow';

const Users = ({
  auth: { user },
  profile: { loading, profiles },
  following: { followings },
  follow,
  unfollow,
  getFollowings,
  unfollowedUsers,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      unfollowedUsers(user.id);
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const handleFollow = (userId, followed) => {
    const callback = () => {
      getFollowings(user.id);
      unfollowedUsers(user.id);
    };
    if (followed === true) {
      unfollow(userId, callback);
    } else if (followed === false) {
      follow(userId, callback);
    }
  };

  return (
    <div className="users m-3">
      <Head title="Connect" />
      <MobileHeader title="users" optionTwo={true} />
      <h4 className="mb-3">Who to follow...</h4>
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <User
            key={profile.id}
            user={profile}
            handleFollow={handleFollow}
            followed={!!followings.find((f) => f.following.id === profile.id)}
            loading={loading}
          />
        ))
      ) : (
        <div>{loading ? 'loading...' : 'no suggested users'}</div>
      )}
    </div>
  );
};

Users.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  getFollowings: PropTypes.func.isRequired,
  unfollowedUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  following: state.following,
});

export default connect(mapStateToProps, {
  follow,
  unfollow,
  getFollowings,
  unfollowedUsers,
})(Users);
