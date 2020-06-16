import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../Actions/alert';
import { registerAdmin } from '../../Actions/adminAuth';
import PropTypes from 'prop-types';
import AdminNav from './AdminNav';

const AdminReg = ({ isAuthenticated, registerAdmin, setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerAdmin({ name, email, password });
    }
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/admindash" />;
  }

  return (
    <Fragment>
      <AdminNav />
      <section>
        <div className="row">
          <div class="login-container">
            <h3 className="text-dark">Admin Signup</h3>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  className="input-fields"
                  type="name"
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
                  type="password2"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
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
      </section>
    </Fragment>
  );
};

AdminReg.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  registerAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.admin.isAuthenticated,
});

export default connect(mapStateToProps, { registerAdmin, setAlert })(AdminReg);
