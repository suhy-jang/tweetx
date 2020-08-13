import React, { useEffect } from 'react';
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
      <Head title={`People followed by ${profile.fullname}`} />
      <BackBtn />
      <UserInfoBar auth={auth} user={profile} />
      <TabBar user={profile} />
      <div className="users border-top">
        {profile.followings &&
          profile.followings.map((f) => (
            <User key={f.following.id} user={f.following} />
          ))}
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
