import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SplashBg from './SplashBg';
import BackBtn from '../layouts/BackBtn';
import { connect } from 'react-redux';
import { editUser } from '../../actions/auth';
import Unregister from './Unregister';

const EditProfile = ({ auth: { loading, user }, editUser }) => {
  const history = useHistory();

  const emptyPhoto =
    'http://www.gravatar.com/avatar/6ae192bae52d3d1b8d145a0d19d2ece2?s=200&r=pg&d=mm';

  const [fullname, setFullname] = useState(user.fullname);
  const [file, setFile] = useState({
    file: '',
    imagePreviewUrl: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();

    editUser({ fullname }, history);
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
                value={fullname}
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
          <Unregister />
        </div>
      </div>
      <SplashBg />
    </div>
  );
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editUser })(EditProfile);
