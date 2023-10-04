import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import Post from '../posts/Post';
import NewPostBtn from '../posts/NewPostBtn';
import TabBar from './TabBar';
import UserInfoBar from './UserInfoBar';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileHeader from '../layouts/MobileHeader';
import { getProfile } from '../../actions/profile';
import { follow, unfollow, getUserFollowings } from '../../actions/follow';
import { checkEmailVerification, verifyEmail } from '../../actions/auth';

const Profile = ({
  auth: { isAuthenticated, user },
  profile: { loading, profile },
  following: { userFollowings },
  getProfile,
  getUserFollowings,
  follow,
  unfollow,
  checkEmailVerification,
  verifyEmail,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileUser = location.state ? location.state.user : {};
  const [profileInfo, setProfileInfo] = useState(profileUser);
  const [tabHide, setTabHide] = useState(true);

  // pre-loaded basic user info, then profile sync
  useEffect(() => {
    if (profile.id && profile.id === profileUser.id) {
      setProfileInfo(profile);
      setTabHide(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, profileUser]);

  useEffect(() => {
    if (user.id === profile.id && !user.emailVerified) {
      checkEmailVerification();
    }
  }, [user.id, user.emailVerified, profile.id]);

  useEffect(() => {
    if (profileUser && profileUser.id) {
      getProfile(profileUser.id);
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
      <Head title={profileInfo.fullname} />
      <MobileHeader title={profileInfo.fullname} optionTwo={true} />
      <UserInfoBar
        loginUser={user}
        verifyEmail={verifyEmail}
        user={profileInfo}
        handleFollow={handleFollow}
        followed={!!userFollowings.find((f) => f.following.id === profile.id)}
        loading={loading}
      />
      {profile && <TabBar user={profile} disabled={tabHide} />}
      <div className="posts border-top">
        {isAuthenticated && user.id === profileInfo.id && <NewPostBtn />}
        {profile &&
          (profile.posts || []).map((post) =>
            post.content ? (
              <Post key={post.id} post={post} />
            ) : (
              <React.Fragment key={post.id}></React.Fragment>
            ),
          )}
      </div>
    </>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  getUserFollowings: PropTypes.func.isRequired,
  checkEmailVerification: PropTypes.func.isRequired,
  verifyEmail: PropTypes.func.isRequired,
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
  getUserFollowings,
  checkEmailVerification,
  verifyEmail,
})(Profile);
