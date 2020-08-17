import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SplashBg from './SplashBg';
import { connect } from 'react-redux';
import { uploadUserPhoto, editUser } from '../../actions/auth';
import Unregister from './Unregister';
import MobileHeader from '../layouts/MobileHeader';
import { useDropzone } from 'react-dropzone';

const EditProfile = ({ auth: { user }, editUser, uploadUserPhoto }) => {
  const history = useHistory();

  const [fullname, setFullname] = useState(user.fullname);
  const [file, setFile] = useState({
    file: '',
    imagePreviewUrl: user.photoUrl,
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const url = await uploadUserPhoto(file.file);

    if (!url) return;

    editUser(
      { fullname, photoUrl: url },
      { successMsg: 'Successfully updated' },
      history,
    );
  };

  const fullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const onDrop = useCallback((files) => {
    const reader = new FileReader();
    const file = files[0];

    reader.onloadend = () => {
      setFile({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="splash">
      <MobileHeader title="Edit Profile" redirect={() => history.goBack()} />
      <div className="edit-user d-flex justify-content-center my-3">
        <img src={file.imagePreviewUrl} alt="" className="profile-img" />
      </div>
      <div className="p-3 flex-column-between">
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label className="text-secondary font-sm">Photo</label>
            <div className="drag-n-drop form-control" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="text-secondary font-sm">Name</label>
            <input
              id="fullname"
              type="text"
              name="fullname"
              onChange={fullnameChange}
              value={fullname}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Save"
              className="btn btn-primary rounded-pill form-control submit-btn"
            />
          </div>
        </form>
        <div className="splash-description font-sm">
          <Unregister />
        </div>
      </div>
      <SplashBg />
    </div>
  );
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  uploadUserPhoto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editUser, uploadUserPhoto })(
  EditProfile,
);
