import React from 'react';
import { Redirect } from 'react-router-dom';

const Landing = (props) => {
  return <Redirect to="/login-or-register" />;
  // return <div>background</div>
  // return <div>feed for login user</div>
};

export default Landing;
