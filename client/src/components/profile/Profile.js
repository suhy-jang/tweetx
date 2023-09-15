import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import Post from '../posts/Post';
import NewPostBtn from '../posts/NewPostBtn';
import TabBar from './TabBar';
import UserInfoBar from './UserInfoBar';
import { getProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileHeader from '../layouts/MobileHeader';

const Profile = ({
  auth: { isAuthenticated, user },
  profile: { profile },
  getProfile,
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
    if (profileUser && profileUser.id) {
      getProfile(profileUser.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUser]);

  useEffect(() => {
    if (!profileUser || !profileUser.id) {
      navigate(-1);
    }
  }, [profileUser, profileUser?.id, navigate]);

  return (
    <>
      <Head title={profileInfo.fullname} />
      <MobileHeader title={profileInfo.fullname} optionTwo={true} />
      <UserInfoBar loginUser={user} user={profileInfo} />
      <TabBar user={profileInfo} disabled={tabHide} />
      <div className="posts border-top">
        {isAuthenticated && user.id === profileInfo.id && <NewPostBtn />}
        {profileInfo.posts &&
          profileInfo.posts.length > 0 &&
          profileInfo.posts[0].content &&
          profileInfo.posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Profile);
