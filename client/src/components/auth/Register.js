import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../Actions/alert';
import { register } from '../../Actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    location: '',
  });

  const { name, email, password, password2, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password, location });
    }
  };

  return (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-md-6 bg-light">
            <div className="winner center-content">
              <h3 className="text-dark">Profile Signup</h3>
              <img
                src="./img/avatar.png"
                className="mt-3 mb-3 avatar"
                alt="avatar"
              />
              <div className="avatar-upload">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Upload avatar"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 bg-light">
            <div className="signup-container">
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    className="input-fields"
                    placeholder="Your Name"
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
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input-fields"
                    type="password"
                    placeholder="Confirm Password"
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
                  value="Sign up"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
