import React from 'react';
import PropTypes from 'prop-types';

const NewPostBtn = (props) => {
  return (
    <a href="./create-post.html" className="btn btn-primary new-post-button">
      <i className="far fa-edit mobile"></i>
      <span className="desktop">New Post</span>
    </a>
  );
};

NewPostBtn.propTypes = {};

export default NewPostBtn;
