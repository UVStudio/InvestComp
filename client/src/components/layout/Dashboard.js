import React, { Fragment } from 'react';

const Dashboard = () => {
  return (
    <Fragment>
      <section>
        <div class="row">
          <div class="col-md-6 bg-light">
            <div class="winner center-content">
              <h3 class="text-dark">Hello Drago!</h3>
              <img
                src="./img/avatar.png"
                class="mt-3 mb-3 avatar"
                alt="avatar"
              />
              <div class="avatar-upload">
                <input
                  type="submit"
                  class="btn btn-primary"
                  value="Upload avatar"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 bg-light">
            <div class="dashboard-container">
              <h3 class="text-dark mb-3">Dashboard</h3>
              <h5>Profile update</h5>
              <form class="form" action="#">
                <div class="form-group">
                  <input
                    class="input-fields"
                    placeholder="Your Name"
                    name="name"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    class="input-fields"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    class="input-fields"
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    class="input-fields"
                    type="password2"
                    placeholder="Confirm Password"
                    name="password2"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    class="input-fields"
                    type="location"
                    placeholder="Your Location"
                    name="location"
                    required
                  />
                </div>
                <input
                  type="submit"
                  class="btn btn-primary"
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
