import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../Actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="nav navbar-nav ml-auto justify-content-end text-white">
      <li className="nav-item active">
        <Link className="nav-link text-white" to="/investors">
          Investors
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/profile">
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/portfolio">
          Portfolio
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" onClick={logout} href="#!">
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
        <Link className="nav-link text-white" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/register">
          Sign up
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-height navbar-expand-lg bg-primary navbar-light">
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

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  adminAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  adminAuth: state.admin.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
