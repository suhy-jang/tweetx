import React from 'react';
import { Link } from 'react-router-dom';

const LoginOrRegister = (props) => {
  return (
    <div className="splash p-3 flex-column-between">
      <div className="splash-promotion flex-column-center text-center mx-auto">
        <i className="far fa-image" />
        <h1>
          <Link to="/" className="text-primary">
            TweetX
          </Link>
        </h1>
        <span className="text-secondary font-sm">
          TweetX is a social app that lets you share your moments with friends
        </span>
      </div>
      <div className="buttons">
        <Link
          to="/login"
          className="btn btn-primary rounded-pill w-100 px-3 py-2"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="btn btn-outline-primary rounded-pill w-100 px-3 py-2 mb-2"
        >
          Create New Account
        </Link>
      </div>
    </div>
  );
};

export default LoginOrRegister;
