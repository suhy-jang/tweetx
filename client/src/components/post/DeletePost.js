import React from 'react';
import PropTypes from 'prop-types';
import { deletePost } from '../../actions/post';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const DeletePost = ({ id, deletePost }) => {
  const history = useHistory();

  const onClick = () => {
    deletePost(id, history);
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
