import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import TabBar from './TabBar';
import UserInfoBar from './UserInfoBar';
import User from '../users/User';
import { getProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileHeader from '../layouts/MobileHeader';
import {
  follow,
  unfollow,
  getUserFollowings,
  getFollowers,
} from '../../actions/follow';

const ProfileFollowers = ({
  auth: { user },
  profile: { loading, profile },
  following: { followers, userFollowings },
  getProfile,
  getFollowers,
  getUserFollowings,
  follow,
  unfollow,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileUser = location.state ? location.state.user : {};
  const [profileInfo, setProfileInfo] = useState(profileUser);
  const [tabHide, setTabHide] = useState(true);

  useEffect(() => {
    if (profile.id && profile.id === profileUser.id) {
      setProfileInfo(profile);
      setTabHide(false);
    }
  }, [profile, profileUser]);

  useEffect(() => {
    if (profileUser && profileUser.id) {
      getProfile(profileUser.id);
      getFollowers(profileUser.id);
      getUserFollowings();
    }
  }, [getFollowers, getProfile, profileUser]);

  useEffect(() => {
    if (!profileUser || !profileUser.id) {
      navigate(-1);
    }
  }, [profileUser, profileUser?.id, navigate]);

  useEffect(() => {
    if (followers) {
      setProfileInfo({ ...profileInfo, followers });
    }
  }, [followers]);

  const handleFollow = (userId, followed) => {
    const callback = () => {
      getProfile(profileUser.id);
      getUserFollowings();
    };
    if (followed === true) {
      unfollow(userId, callback);
    } else if (followed === false) {
      follow(userId, callback);
    }
  };

  return (
    <>
      <Head title={`People following ${profileInfo.fullname}`} />
      <MobileHeader
        title={profileInfo.fullname}
        optionTwo={true}
        redirect={() => {
          navigate({
            pathname: '/profile',
            state: { user: profileInfo },
          });
        }}
      />
      <UserInfoBar
        loginUser={user}
        user={profileInfo}
        handleFollow={handleFollow}
        followed={!!userFollowings.find((f) => f.following.id === profile.id)}
        loading={loading}
      />
      {profile && <TabBar user={profile} disabled={tabHide} />}
      <div className="users border-top">
        {profile &&
          (profile.followers || []).map((f) => (
            <User
              key={f.id}
              user={f.follower}
              handleFollow={handleFollow}
              followed={
                !!userFollowings.find(
                  ({ following }) => following.id === f.follower.id,
                )
              }
              myself={f.follower.id === user.id}
              loading={loading}
            />
          ))}
      </div>
    </>
  );
};

ProfileFollowers.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  getFollowers: PropTypes.func.isRequired,
  getUserFollowings: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  following: state.following,
});

export default connect(mapStateToProps, {
  follow,
  unfollow,
  getProfile,
  getFollowers,
  getUserFollowings,
})(ProfileFollowers);
