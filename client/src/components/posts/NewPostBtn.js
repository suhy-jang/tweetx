import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NewPostBtn = (props) => {
  return (
    <Link to="./create-post.html" className="btn btn-primary new-post-button">
      <i className="far fa-edit mobile"></i>
      <span className="desktop">New Post</span>
    </Link>
  );
};

NewPostBtn.propTypes = {};

export default NewPostBtn;
