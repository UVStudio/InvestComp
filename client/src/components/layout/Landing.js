import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Alert from './Alert';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <Navbar />
      <Alert />
      <section>
        <div className="row">
          <div className="col-md-6 bg-light">
            <div className="winner center-content">
              <h3 className="text-dark">Last week's winner!</h3>
              <img
                src="/img/avatar.png"
                className="mt-3 mb-3 avatar"
                alt="avatar"
              />
              <h2 className="text-dark">Drago</h2>
              <p className="">$123,456</p>
            </div>
          </div>
          <div className="col-md-6 bg-light">
            <div className="leaderboard">
              <h5 className="content-center text-dark">
                This week's leaderboard
              </h5>
              <ul>
                <li className="board-list-item">
                  <img
                    src="/img/avatar.png"
                    className="leaderboard-avatar"
                    alt="avatar"
                  />
                  <div className="list-item-content">
                    <h5 className="text-dark">Drago</h5>
                    <p className="">$123,456</p>
                  </div>
                </li>
                <li className="board-list-item">
                  <img
                    src="/img/avatar.png"
                    className="leaderboard-avatar"
                    alt="avatar"
                  />
                  <div className="list-item-content">
                    <h5 className="text-dark">Leo</h5>
                    <p className="">$123,456</p>
                  </div>
                </li>
                <li className="board-list-item">
                  <img
                    src="/img/avatar.png"
                    className="leaderboard-avatar"
                    alt="avatar"
                  />
                  <div className="list-item-content">
                    <h5 className="text-dark">Thomas</h5>
                    <p className="">$123,456</p>
                  </div>
                </li>
                <li className="board-list-item">
                  <img
                    src="/img/avatar.png"
                    className="leaderboard-avatar"
                    alt="avatar"
                  />
                  <div className="list-item-content">
                    <h5 className="text-dark">Amy</h5>
                    <p className="">$123,456</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propType = {
  isAuthenticated: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
