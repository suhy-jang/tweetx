import React from 'react';
import PropTypes from 'prop-types';
import { deletePost } from '../../actions/post';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DeletePost = ({ id, deletePost }) => {
  const navigate = useNavigate();

  const onClick = () => {
    deletePost(id, () => navigate('/'));
  };

  return (
    <div className="w-100 d-flex justify-content-end">
      <button
        onClick={onClick}
        className={`btn btn-primary rounded-pill font-sm`}
      >
        Delete
      </button>
    </div>
  );
};

DeletePost.propTypes = {
  id: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost })(DeletePost);
