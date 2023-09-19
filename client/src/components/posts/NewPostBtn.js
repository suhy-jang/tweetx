import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const NewPostBtn = () => {
  return (
    <Link to="/new-post" className="btn btn-primary new-post-button">
      <FontAwesomeIcon icon={faEdit} className="mobile text-white" size="lg" />
      <span className="desktop">New Post</span>
    </Link>
  );
};

export default NewPostBtn;
