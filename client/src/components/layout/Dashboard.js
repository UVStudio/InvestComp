import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile, updateProfile } from '../../Actions/profile';
import { setAlert } from '../../Actions/alert';
import AvatarUpload from './AvatarUpload';
import Avatar from './Avatar';
import Navbar from './Navbar';
import Alert from './Alert';
import PropTypes from 'prop-types';

const Dashboard = ({
  getCurrentProfile,
  updateProfile,
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      name: loading || !profile.name ? '' : profile.name,
      email: loading || !profile.email ? '' : profile.email,
      location: loading || !profile.location ? '' : profile.location,
      password: '',
      password2: '',
    });
  }, [getCurrentProfile]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    password: '',
    password2: '',
  });

  const { name, email, location, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    }
    updateProfile(formData);
  };

  return (
    <Fragment>
      <Navbar />
      <Alert />
      <section>
        <div className="row">
          <div className="col-md-6">
            <div className="winner center-content">
              <h3 className="text-dark">My Dashboard</h3>
              <Avatar />
              <AvatarUpload />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dashboard-container">
              <h5>Profile update</h5>
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    className="input-fields"
                    placeholder="Your Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input-fields"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input-fields"
                    type="password"
                    placeholder="Your password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input-fields"
                    type="password"
                    placeholder="Confirm your password"
                    name="password2"
                    value={password2}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input-fields"
                    type="location"
                    placeholder="Your Location"
                    name="location"
                    value={location}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Save Changes"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, updateProfile })(
  Dashboard
);
