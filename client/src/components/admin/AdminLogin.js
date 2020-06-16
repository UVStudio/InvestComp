import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAdmin } from '../../Actions/adminAuth';
import AdminNav from './AdminNav';

const AdminLogin = ({ loginAdmin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    loginAdmin({ email, password });
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/admindash" />;
  }

  return (
    <Fragment>
      <AdminNav />
      <section>
        <div className="login-container">
          <h3>Admin Login</h3>
          <div className="login">
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  className="input-fields"
                  type="email"
                  placeholder="Email Address"
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
              <input type="submit" className="btn btn-primary" value="Login" />
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

AdminLogin.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.admin.isAuthenticated,
});

export default connect(mapStateToProps, { loginAdmin })(AdminLogin);
