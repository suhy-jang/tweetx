import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import TabBar from './TabBar';
import UserInfoBar from './UserInfoBar';
import User from '../users/User';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileHeader from '../layouts/MobileHeader';
import { getProfile } from '../../actions/profile';
import {
  follow,
  unfollow,
  getFollowings,
  getUserFollowings,
} from '../../actions/follow';
import { verifyEmail } from '../../actions/auth';

const ProfileFollowings = ({
  auth: { user },
  profile: { loading, profile },
  following: { followings, userFollowings },
  getProfile,
  getFollowings,
  getUserFollowings,
  follow,
  unfollow,
  verifyEmail,
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
    if (followings) {
      setProfileInfo({ ...profileInfo, followings });
    }
  }, [followings]);

  useEffect(() => {
    if (profileUser && profileUser.id) {
      getProfile(profileUser.id);
      getFollowings(profileUser.id);
      getUserFollowings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUser]);

  useEffect(() => {
    if (!profileUser || !profileUser.id) {
      navigate(-1);
    }
  }, [profileUser, profileUser?.id, navigate]);

  const handleFollow = (userId, followed) => {
    const callback = () => {
      getUserFollowings();
      getFollowings(profileUser.id);
      getProfile(profileUser.id);
    };
    if (followed === true) {
      unfollow(userId, callback);
    } else if (followed === false) {
      follow(userId, callback);
    }
  };

  return (
    <>
      <Head title={`People followed by ${profileInfo.fullname}`} />
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
        verifyEmail={verifyEmail}
        user={profileInfo}
        handleFollow={handleFollow}
        followed={!!userFollowings.find((f) => f.following.id === profile.id)}
        loading={loading}
      />
      {profile && <TabBar user={profile} disabled={tabHide} />}
      <div className="users border-top">
        {userFollowings &&
          profile &&
          (profile.followings || []).map((f) => (
            <User
              key={f.id}
              user={f.following}
              handleFollow={handleFollow}
              followed={
                !!(userFollowings || []).find(
                  ({ following }) => following.id === f.following.id,
                )
              }
              myself={f.following.id === user.id}
              loading={loading}
            />
          ))}
      </div>
    </>
  );
};

ProfileFollowings.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  getFollowings: PropTypes.func.isRequired,
  getUserFollowings: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  verifyEmail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  following: state.following,
});

export default connect(mapStateToProps, {
  getProfile,
  getFollowings,
  getUserFollowings,
  follow,
  unfollow,
  verifyEmail,
})(ProfileFollowings);
