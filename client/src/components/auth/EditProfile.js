import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SplashBg from './SplashBg';
import BackBtn from '../layouts/BackBtn';

const EditProfile = (props) => {
  const history = useHistory();

  const emptyPhoto =
    'http://www.gravatar.com/avatar/6ae192bae52d3d1b8d145a0d19d2ece2?s=200&r=pg&d=mm';

  const tempUser = {
    fullname: 'Sara',
    photoUrl:
      'http://www.gravatar.com/avatar/6ae192bae52d3d1b8d145a0d19d2ece2?s=200&r=pg&d=mm',
  };

  const [fullname, setFullname] = useState(tempUser.fullname);
  const [file, setFile] = useState({
    file: '',
    imagePreviewUrl: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fullname,
      files: file.file,
    };

    Object.keys(formData).forEach(
      (key) => formData[key] === '' && delete formData[key],
    );

    // send data to action
    console.log(formData);
    history.push('/');
  };

  const onChange = (e) => {
    if (e.target.name === 'fullname') {
      setFullname(e.target.value);
    } else if (e.target.name === 'file') {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        setFile({
          file,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const unregisterClick = () => {
    if (window.confirm('Are you sure you wish to delete your account?')) {
      console.log('unregisterred');
      // unregister action
    }
    // history.push('/');
  };

  return (
    <div className="splash">
      <BackBtn />
      <div className="header font-lg text-center py-1">
        <span className="">Edit Profile</span>
      </div>
      <div className="edit-user d-flex justify-content-center my-3">
        <img
          src={file.imagePreviewUrl || emptyPhoto}
          alt=""
          className="profile-img"
        />
      </div>
      <div className="p-3 flex-column-between">
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label className="text-secondary font-sm">
              Photo
              <input
                id="profilephoto"
                name="file"
                onChange={onChange}
                type="file"
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="text-secondary font-sm">
              Name
              <input
                id="fullname"
                type="text"
                name="fullname"
                onChange={onChange}
                value={tempUser.fullname}
                className="form-control"
              />
            </label>
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
          <div className="text-secondary mb-1">Unhappy?</div>
          <button
            onClick={unregisterClick}
            className="btn btn-link-primary text-primary p-0 font-sm"
          >
            Cancel my account
          </button>
        </div>
      </div>
      <SplashBg />
    </div>
  );
};

export default EditProfile;
