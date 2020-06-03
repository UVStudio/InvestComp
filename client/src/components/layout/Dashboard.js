import React, { Fragment } from 'react';

const Dashboard = () => {
  return (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-md-6 bg-light">
            <div className="winner center-content">
              <h3 className="text-dark">Hello Drago!</h3>
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

export default Dashboard;
