import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { avatarUpload } from '../../Actions/avatar';
import { transAlert } from '../../Actions/transAlert';
import TransAlert from './TransAlert';

const AvatarUpload = ({ avatarUpload, transAlert }) => {
  const [avatar, setAvatar] = useState('');
  const [avatarName, setAvatarName] = useState('');

  const onChange = async (e) => {
    setAvatar(e.target.files[0]);
    if (e.target.files[0]) {
      setAvatarName(e.target.files[0].name);
    } else {
      setAvatarName(avatarName);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', avatar);

    if (avatar.size < 250000) {
      try {
        await avatarUpload(formData);
      } catch (err) {
        if (err.response.status === 500) {
          console.log('There was a problem with the server.');
        } else {
          console.log(err.response);
        }
      }
    } else {
      transAlert('Please upload a file smaller than 250KB.', 'danger');
      console.log(avatar.size);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="avatar-upload">
          <input
            type="file"
            name="file"
            id="custom-avatar"
            className="hidden short"
            onChange={onChange}
          />
          <label
            htmlFor="custom-avatar"
            className="avatar-upload-label btn btn-primary"
          >
            Choose File: {avatarName}
          </label>
          <input id="avatar-upload" type="submit" value="" className="hidden" />
          <label
            className="avatar-upload-label btn btn-primary"
            htmlFor="avatar-upload"
          >
            Upload
          </label>
          <small className="form-text text-muted">
            Maximum avatar file size 250KB
          </small>
        </div>
        <TransAlert />
      </form>
    </Fragment>
  );
};

AvatarUpload.propTypes = {
  avatarUpload: PropTypes.func.isRequired,
};

export default connect(null, { avatarUpload, transAlert })(AvatarUpload);
