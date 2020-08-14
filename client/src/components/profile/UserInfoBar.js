import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Follow from '../follow/Follow';
import Moment from 'react-moment';

const UserInfoBar = ({ auth: { user: authUser }, user }) => {
  const [float, setFloat] = useState('');
  const [scroll, setScroll] = useState(0);

  const onScroll = () => setScroll(window.pageYOffset);

  useEffect(() => {
    setFloat(scroll >= '70' ? 'user-info-floating-btn' : '');
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scroll]);

  const editProfile = (
    <div className="user-info-floating-btn-cover">
      <Link
        to="/edit-profile"
        className={`btn btn-primary rounded-pill font-sm ${float}`}
      >
        Edit Profile
      </Link>
    </div>
  );

  const editProfileOptions = () => {
    if (authUser.id === user.id) {
      return editProfile;
    } else {
      // Follow component: authUser || authUser.followings exception controlled
      return (
        <div className="user-info-floating-btn-cover">
          <Follow user={user} className={float} />
        </div>
      );
    }
  };

  return (
    <div className="d-flex justify-content-around main-user-info">
      <div className="user-info d-flex">
        <img
          src="https://source.unsplash.com/featured?painting"
          alt=""
          className="profile-img"
        />
        <div className="ml-3">
          <div className="font-weight-bold font-lg">{user.fullname}</div>
          <div className="text-secondary">@{user.username}</div>
          <div className="text-secondary">
            Joined on{' '}
            {user.createdAt && (
              <Moment format="MMM YYYY" withTitle>
                {user.createdAt}
              </Moment>
            )}
          </div>
        </div>
      </div>
      <div>{authUser && editProfileOptions()}</div>
    </div>
  );
};

UserInfoBar.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserInfoBar);
