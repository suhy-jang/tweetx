import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import TabBar from './TabBar';
import BackBtn from '../layouts/BackBtn';
import UserInfoBar from './UserInfoBar';
import User from '../users/User';
import { getProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';

const ProfileFollowers = ({ auth, profile: { profile }, getProfile }) => {
  const location = useLocation();
  const user = location.state ? location.state.user : {};
  const [userinfo, setUserinfo] = useState(user);
  const [tabHide, setTabHide] = useState(true);

  useEffect(() => {
    if (profile.id && profile.id === user.id) {
      setUserinfo(profile);
      setTabHide(false);
    }
  }, [profile, user]);

  useEffect(() => {
    if (user && user.id) {
      getProfile(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!userinfo || !userinfo.id) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Head title={`People following ${userinfo.fullname}`} />
      <BackBtn />
      <UserInfoBar auth={auth} user={userinfo} />
      <TabBar user={userinfo} disabled={tabHide} />
      <div className="users border-top">
        {userinfo.followers &&
          userinfo.followers.length > 0 &&
          userinfo.followers[0].follower &&
          userinfo.followers.map(
            (f) => f.follower && <User key={f.id} user={f.follower} />,
          )}
      </div>
    </div>
  );
};

ProfileFollowers.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(ProfileFollowers);
