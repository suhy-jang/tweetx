import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserInfoBar = (props) => {
  const [float, setFloat] = useState('');
  const [scroll, setScroll] = useState(0);

  const onScroll = () => setScroll(window.pageYOffset);

  useEffect(() => {
    setFloat(scroll >= '70' ? 'user-info-floating-btn' : '');
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scroll]);

  const follow = () => {
    // send data to action to follow
    console.log('follow');
  };

  const unfollow = () => {
    // send data to action to unfollow
    console.log('unfollow');
  };

  // const

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

  const followBtn = (
    <div className="user-info-floating-btn-cover">
      <button
        onClick={follow}
        className={`btn btn-primary rounded-pill font-sm ${float}`}
      >
        FOLLOW
      </button>
    </div>
  );

  const followingBtn = (
    <div className="user-info-floating-btn-cover">
      <button
        onClick={unfollow}
        className={`btn btn-following rounded-pill font-sm ${float}`}
      >
        FOLLOWING
      </button>
    </div>
  );
  return (
    <div className="d-flex justify-content-around main-user-info">
      <div className="user-info d-flex">
        <img
          src="https://source.unsplash.com/featured?painting"
          alt=""
          className="profile-img"
        />
        <div className="ml-3">
          <div className="font-weight-bold font-lg">William Franklin</div>
          <div className="text-secondary">@williamfranklin</div>
          <div className="text-secondary">Joined on 25 Dec 2019</div>
        </div>
      </div>
      <div>
        {/* auth === user : editProfile */}
        {/* auth !== user && auth.following.includes : followingBtn */}
        {/* auth !== user && !auth.following.includes : followBtn */}
        {followBtn}
      </div>
    </div>
  );
};

UserInfoBar.propTypes = {
  auth: PropTypes.object,
  user: PropTypes.object,
};

export default UserInfoBar;
