import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from '../posts/Post';
import NewPostBtn from '../posts/NewPostBtn';
import TabBar from './TabBar';
import UserInfoBar from './UserInfoBar';
import { getProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Profile = ({ auth, profile: { loading, profile }, getProfile }) => {
  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    if (id !== profile.id) {
      getProfile(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <h2 className="text-secondary">loading...</h2>;
  }

  return (
    <div>
      <UserInfoBar auth={auth} user={profile} />
      <TabBar user={profile} />
      <div className="posts border-top">
        {auth.isAuthenticated && auth.user.id === profile.id && <NewPostBtn />}
        {profile.posts &&
          profile.posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
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
