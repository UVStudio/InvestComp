import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { updateAllAccounts } from '../../Actions/updateAccounts';
import { deleteTransaction } from '../../Actions/deleteTrans';
import AdminNav from './AdminNav';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const AdminDash = ({
  admin: { loading, isAuthenticated },
  updateAllAccounts,
  deleteTransaction,
}) => {
  const updateAccounts = () => {
    updateAllAccounts();
  };

  const [transFormData, setTransFormData] = useState({
    profileId: '',
    transId: '',
  });

  const { profileId, transId } = transFormData;

  const onChangeTrans = (e) => {
    setTransFormData({
      ...transFormData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteTrans = (e) => {
    e.preventDefault();
    deleteTransaction(profileId, transId);
  };

  return loading && isAuthenticated === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <AdminNav />
      <section>
        <Alert />
        <div className="login-container">
          <h3 className="mb-5">Admin Functions</h3>
          <div className="admin mb-5">
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => updateAccounts(e)}
            >
              Update All Accounts
            </button>
          </div>
          <div className="admin mb-5">
            <form className="form" onSubmit={(e) => deleteTrans(e)}>
              <div className="form-group">
                <input
                  className="input-fields"
                  type="profileId"
                  placeholder="Profile ID"
                  name="profileId"
                  value={profileId}
                  onChange={(e) => onChangeTrans(e)}
                />
              </div>
              <div className="form-group">
                <input
                  className="input-fields"
                  type="transId"
                  placeholder="Transaction ID"
                  name="transId"
                  value={transId}
                  onChange={(e) => onChangeTrans(e)}
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
  updateAllAccounts: PropTypes.func.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, {
  updateAllAccounts,
  deleteTransaction,
})(AdminDash);
