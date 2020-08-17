import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from '../head/Head';
import Post from '../posts/Post';
import NewPostBtn from '../posts/NewPostBtn';
import TabBar from './TabBar';
import UserInfoBar from './UserInfoBar';
import { getProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import MobileHeader from '../layouts/MobileHeader';

const Profile = ({ auth, profile: { profile }, getProfile }) => {
  const location = useLocation();
  // user priority before get profile
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
      <Head title={userinfo.fullname} />
      <MobileHeader title={userinfo.fullname} optionTwo={true} />
      <UserInfoBar auth={auth} user={userinfo} />
      <TabBar user={userinfo} disabled={tabHide} />
      <div className="posts border-top">
        {auth.isAuthenticated && auth.user.id === userinfo.id && <NewPostBtn />}
        {userinfo.posts &&
          userinfo.posts.length > 0 &&
          userinfo.posts[0].content &&
          userinfo.posts.map((post) => <Post key={post.id} post={post} />)}
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
