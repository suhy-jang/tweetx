import React from 'react';
import { Link } from 'react-router-dom';

const NewPostBtn = (props) => {
  return (
    <Link to="./new-post" className="btn btn-primary new-post-button">
      <i className="far fa-edit mobile"></i>
      <span className="desktop">New Post</span>
    </Link>
  );
};

export default NewPostBtn;
