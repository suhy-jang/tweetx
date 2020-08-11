import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BackBtn from '../layouts/BackBtn';
import { useHistory } from 'react-router-dom';

const CreatePost = (props) => {
  const [content, setContent] = useState('');

  const history = useHistory();

  const cancelClick = () => {
    history.goBack();
  };

  useEffect(() => {
    const prevContent = localStorage.getItem('(current token) new-post');
    setContent(prevContent);
  }, []);

  const onSubmit = () => {
    console.log('submitted', content);
    localStorage.removeItem(`(current token) new-post`);
    history.push('/');
  };

  const onChange = (e) => {
    setContent(e.target.value);
    localStorage.setItem('(current token) new-post', e.target.value);
  };

  return (
    <div className="splash single-post mx-auto">
      <BackBtn />
      <div className="desktop header text-center my-2">Create New Post</div>
      <div className="p-2">
        <div className="d-flex m-2">
          <img
            src="https://source.unsplash.com/featured?painting"
            alt=""
            className="profile-img"
          />
          <textarea
            placeholder="Type here"
            className="p-2 ml-3 w-100 rounded border"
            rows="10"
            onChange={onChange}
            value={content}
          />
        </div>
        <div className="w-100 buttons d-flex justify-content-around">
          <button
            onClick={cancelClick}
            className="btn btn-outline-primary submit-btn rounded-pill px-3 py-2 w-50"
          >
            <i className="far fa-paper-plane"></i>
            <span className="ml-2">Cancel</span>
          </button>
          <button
            onClick={onSubmit}
            className="btn btn-primary submit-btn rounded-pill px-3 py-2 w-50"
          >
            <i className="far fa-paper-plane"></i>
            <span className="ml-2">Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

CreatePost.propTypes = {
  auth: PropTypes.object,
  createPost: PropTypes.func,
};

export default CreatePost;
