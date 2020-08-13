import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import TabBar from './TabBar';
import BackBtn from '../layouts/BackBtn';
import UserInfoBar from './UserInfoBar';
import User from '../users/User';
import { getProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ProfileFollowings = ({
  auth,
  profile: { loading, profile },
  getProfile,
}) => {
  const location = useLocation();
  const { user } = location.state;
  const [userinfo, setUserinfo] = useState(user);
  const [tabHide, setTabHide] = useState(true);

  useEffect(() => {
    if (profile.id === user.id) {
      setUserinfo(profile);
      setTabHide(false);
    }
  }, [profile, user]);

  useEffect(() => {
    getProfile(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <div>
      <Head title={`People followed by ${userinfo.fullname}`} />
      <BackBtn />
      <UserInfoBar auth={auth} user={userinfo} />
      <TabBar user={userinfo} disabled={tabHide} />
      <div className="users border-top">
        {userinfo.followers &&
          userinfo.followings.length > 0 &&
          userinfo.followings[0].following &&
          userinfo.followings.map(
            (f) => f.following && <User key={f.id} user={f.following} />,
          )}
      </div>
    </div>
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
