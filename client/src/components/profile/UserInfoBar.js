import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Follow from '../follow/Follow';
import Moment from 'react-moment';

const UserInfoBar = ({ loginUser, user, handleFollow, loading, followed }) => {
  const [float, setFloat] = useState('');
  const [scroll, setScroll] = useState(0);

  const onScroll = () => setScroll(window.pageYOffset);

  useEffect(() => {
    setFloat(scroll >= '50' ? 'user-info-floating-btn' : '');
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scroll]);

  return (
    <div className="d-flex justify-content-around main-user-info">
      <div className="user-info d-flex">
        <img src={user.photoUrl} alt="" className="profile-img" />
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
      <div>
        {loginUser && loginUser.id === user.id && (
          <div className="user-info-floating-btn-cover">
            <Link
              to="/edit-profile"
              className={`btn btn-primary rounded-pill font-sm ${float}`}
            >
              Edit Profile
            </Link>
          </div>
        )}
        {loginUser && loginUser.id !== user.id && (
          <div className="user-info-floating-btn-cover">
            <Follow
              className={float}
              handleFollow={handleFollow}
              loading={loading}
              followed={followed}
              userId={user.id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

UserInfoBar.propTypes = {
  loginUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleFollow: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  followed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserInfoBar);
