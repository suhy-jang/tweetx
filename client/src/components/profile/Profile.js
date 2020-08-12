import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from '../posts/Post';
import NewPostBtn from '../posts/NewPostBtn';
import TabBar from './TabBar';
import UserInfoBar from './UserInfoBar';
import { getProfile } from '../../actions/profile';
import { connect } from 'react-redux';

const Profile = ({ auth, profile: { loading, profile }, getProfile }) => {
  useEffect(() => {
    getProfile('5d713995b721c3bb38c1f5d0');
  }, []);

  return (
    <div>
      {profile.id && (
        <>
          <UserInfoBar auth={auth} user={profile} />
          <TabBar user={profile} />
          <div className="posts border-top">
            {auth.isAuthenticated && auth.user.id === profile.id && (
              <NewPostBtn />
            )}
            {profile.posts &&
              profile.posts.map((post) => <Post id={post.id} post={post} />)}
          </div>
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Profile);
