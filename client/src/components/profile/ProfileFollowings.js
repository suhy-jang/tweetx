import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import TabBar from './TabBar';
import UserInfoBar from './UserInfoBar';
import User from '../users/User';
import { getProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import MobileHeader from '../layouts/MobileHeader';

const ProfileFollowings = ({ auth, profile: { profile }, getProfile }) => {
  const location = useLocation();
  const history = useHistory();
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
    <>
      <Head title={`People followed by ${userinfo.fullname}`} />
      <MobileHeader
        title={userinfo.fullname}
        optionTwo={true}
        redirect={() => {
          history.push({
            pathname: '/profile',
            state: { user: userinfo },
          });
        }}
      />
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
