import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = (props) => {
  return (
    <div className="user d-flex border-bottom clearfix">
      <Link to="./profile-followers" className="user-element float-left">
        <img
          src="https://source.unsplash.com/featured?painting"
          alt=""
          className="profile-img"
        />
      </Link>
      <div className="user-element ml-2">
        <Link
          to="./profile-followers"
          className="underline font-weight-bold d-inline"
        >
          Alice Russell
        </Link>
        <span className="text-secondary font-sm">@alice_russell</span>
        <div className="text-secondary font-sm">Following : 200</div>
      </div>
      <div className="user-element flex-column-center">
        <button className="btn btn-primary rounded-pill font-sm float-right">
          FOLLOW
        </button>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

export default User;
