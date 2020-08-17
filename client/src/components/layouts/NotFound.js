import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
  return (
    <div className="text-center">
      <h2>
        <strong>404</strong> ERROR
      </h2>
      <br />
      <h3>This page cannot be found 404</h3>
      <br />
      <Link to="/" className="btn btn-outline-primary font-lg">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
