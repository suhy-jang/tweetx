import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../actions/post';
import { connect } from 'react-redux';
import MobileHeader from '../layouts/MobileHeader';
import Head from '../head/Head';

const CreatePost = ({ auth, createPost }) => {
  const [content, setContent] = useState('');

  const history = useHistory();

  const cancelClick = () => {
    history.goBack();
  };

  useEffect(() => {
    const prevContent = localStorage.getItem('(current token) new-post');
    if (prevContent) setContent(prevContent);
  }, []);

  const onSubmit = () => {
    createPost(content, history);
    localStorage.removeItem(`new-post`);
  };

  const onChange = (e) => {
    setContent(e.target.value);
    localStorage.setItem('new-post', e.target.value);
  };

  return (
    <div className="splash single-post new-post mx-auto">
      <Head title="Create Post" />
      <MobileHeader
        title="Create New Post"
        redirect={() => history.goBack()}
        desktop={true}
      />
      <div className="p-2">
        <div className="d-flex m-2">
          <img
            src={auth.user && auth.user.photoUrl}
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
  auth: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createPost })(CreatePost);
