import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAdmin } from '../../Actions/adminAuth';

const AdminNav = ({
  admin: { token, isAuthenticated, loading },
  logoutAdmin,
}) => {
  const authLinks = (
    <ul className="nav navbar-nav ml-auto justify-content-end text-white">
      <li className="nav-item active">
        <Link className="nav-link text-white" to="/investors">
          Investors
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" onClick={logoutAdmin} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav navbar-nav ml-auto justify-content-end text-white">
      <li className="nav-item active">
        <Link className="nav-link text-white" to="/investors">
          Investors
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/adminlogin">
          Admin Login
        </Link>
      </li>
    </ul>
  );

  return token === null ? null : (
    <nav className="navbar navbar-expand-lg bg-primary navbar-light">
      <Link className="text-white" to="/">
        InvestComp
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

AdminNav.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { logoutAdmin })(AdminNav);
