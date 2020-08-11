import React from 'react';
import PropTypes from 'prop-types';
import BackBtn from '../layouts/BackBtn';

const CreatePost = (props) => {
  return (
    <div class="splash single-post mx-auto position-relative">
      <BackBtn />
      <div class="header sticky-top font-lg text-center py-1">
        <span class="">Create New Post</span>
      </div>
      <div class="p-2">
        <div class="d-flex m-2">
          <img
            src="https://source.unsplash.com/featured?painting"
            alt=""
            class="profile-img"
          />
          <textarea
            placeholder="Type here"
            class="p-2 ml-3 w-100 rounded border"
            rows="10"
          ></textarea>
        </div>
        <div class="w-100 buttons d-flex justify-content-around">
          <a
            href="./feed.html"
            class="btn btn-outline-primary submit-btn rounded-pill px-3 py-2 w-50"
          >
            <i class="far fa-paper-plane"></i>
            <span class="ml-2">Cancel</span>
          </a>
          <a
            href="./feed.html"
            class="btn btn-primary submit-btn rounded-pill px-3 py-2 w-50"
          >
            <i class="far fa-paper-plane"></i>
            <span class="ml-2">Post</span>
          </a>
        </div>
      </div>
    </div>
  );
};

CreatePost.propTypes = {};

export default CreatePost;
