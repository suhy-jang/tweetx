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

const ProfileFollowings = ({
  auth: { user },
  profile: { profile },
  getProfile,
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
      <UserInfoBar loginUser={user} user={profileInfo} />
      <TabBar user={profileInfo} disabled={tabHide} />
      <div className="users border-top">
        {profileInfo.followers &&
          profileInfo.followings.length > 0 &&
          profileInfo.followings[0].following &&
          profileInfo.followings.map(
            (f) => f.following && <User key={f.id} user={f.following} />,
          )}
      </div>
    </>
  );
};

ProfileFollowings.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(ProfileFollowings);
