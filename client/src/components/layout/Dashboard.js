import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../Actions/profile';
import AvatarUpload from './AvatarUpload';
import Avatar from './Avatar';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const Dashboard = ({ getCurrentProfile, profile: { loading, profile } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-md-6 bg-light">
            <div className="winner center-content">
              <h3 className="text-dark">
                Hello {profile && profile.profile.name}!
              </h3>
              <Avatar />
              <AvatarUpload />
            </div>
          </div>
          <div className="col-md-6 bg-light">
            <div className="dashboard-container">
              <h3 className="text-dark mb-3">Dashboard</h3>
              <h5>Profile update</h5>
              <form className="form" action="#">
                <div className="form-group">
                  <input
                    className="input-fields"
                    placeholder="Your Name"
                    name="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input-fields"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input-fields"
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input-fields"
                    type="password2"
                    placeholder="Confirm Password"
                    name="password2"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input-fields"
                    type="location"
                    placeholder="Your Location"
                    name="location"
                    required
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
