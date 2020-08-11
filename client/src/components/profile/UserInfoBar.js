import React from 'react';
import PropTypes from 'prop-types';

const UserInfoBar = (props) => {
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
        <a
          href="./edit-profile.html"
          className="btn btn-primary rounded-pill font-sm"
        >
          Edit Profile
        </a>
      </div>
    </div>
  );
};

UserInfoBar.propTypes = {
  id: PropTypes.string,
  fullname: PropTypes.string,
  username: PropTypes.string,
  createdAt: PropTypes.string,
};

export default UserInfoBar;
