import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const AdminDash = ({ admin: { loading, isAuthenticated } }) => {
  return loading && isAuthenticated === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section>
        <div className="login-container">
          <h3 className="mb-5">Admin Function</h3>
          <div className="admin mb-5">
            <form className="form" action="#">
              <input
                type="submit"
                className="btn btn-primary"
                value="Update All Accounts"
              />
            </form>
          </div>
          <div className="admin mb-5">
            <form className="form" action="#">
              <div className="form-group">
                <input
                  className="input-fields"
                  type="profile"
                  placeholder="Profile ID"
                  name="profile"
                />
              </div>
              <div className="form-group">
                <input
                  className="input-fields"
                  type="transaction"
                  placeholder="Transaction ID"
                  name="transaction"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Delete Transaction"
                />
              </div>
            </form>
          </div>
          <div className="admin mb-4">
            <form className="form" action="#">
              <div className="form-group">
                <input
                  className="input-fields"
                  type="delete-profile"
                  placeholder="Profile ID"
                  name="delete-profile"
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Delete Profile"
              />
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

AdminDash.propTypes = {
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(AdminDash);
