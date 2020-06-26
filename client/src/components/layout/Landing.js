import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getAllProfiles } from '../../Actions/profiles';
import Navbar from './Navbar';
import Alert from './Alert';

const Landing = ({ profiles, getAllProfiles, isAuthenticated }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  if (isAuthenticated) {
    return <Redirect to="/portfolio" />;
  }
  const genericAvatar = './img/avatar.png';

  return (
    <Fragment>
      <Navbar />
      <Alert />
      <section>
        <div className="row">
          <div className="col-md-6">
            <div className="winner center-content">
              <h3 className="text-dark">Current Leader!</h3>
              {profiles.loading
                ? null
                : profiles.profiles
                    .sort(
                      (a, b) =>
                        b.portfolio.profileBalance - a.portfolio.profileBalance
                    )
                    .slice(0, 1)
                    .map((e, i) => {
                      return (
                        <Fragment>
                          <Link to={`/profile/${e._id}`}>
                            <img
                              src={
                                e.avatarId
                                  ? `api/avatar/image/${e.avatarId}`
                                  : genericAvatar
                              }
                              className="mt-3 mb-3 avatar"
                              alt="avatar"
                            />
                          </Link>

                          <h2 className="text-dark">{e.name}</h2>
                          <p className="">
                            ${e.portfolio.profileBalance.toFixed(2)}
                          </p>
                        </Fragment>
                      );
                    })}
            </div>
          </div>
          <div className="col-md-6">
            <div className="leaderboard">
              <h5 className="content-center text-dark">Leaderboard</h5>
              <ul className="investors-list-ul-landing">
                {profiles.loading
                  ? null
                  : profiles.profiles
                      .sort(
                        (a, b) =>
                          b.portfolio.profileBalance -
                          a.portfolio.profileBalance
                      )
                      .slice(1, 5)
                      .map((e, i) => {
                        return (
                          <li key={i} className="investors-list-item">
                            <Link to={`profile/${e._id}`}>
                              <img
                                src={
                                  e.avatarId
                                    ? `api/avatar/image/${e.avatarId}`
                                    : genericAvatar
                                }
                                className="inv-list-item-avatar mr-4"
                                alt="avatar"
                              />
                            </Link>

                            <div className="investor-info">
                              <p className="name">{e.name}</p>
                              <p className="balance">
                                ${e.portfolio.profileBalance.toFixed(2)}
                              </p>
                            </div>
                          </li>
                        );
                      })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div class="col-sm-2"></div>
          <div className="col-sm-8">
            <p className="test-center p-2 text-dark">
              Welcome to InvestComp. This is a simulate stock investment app,
              with a twist. You compete with other investors. Everybody's
              current portfolio is transparent. You get to see how others are
              investing smartly, or not so smartly. Stock prices are real time
              data from the NYSE. It's free to play.
            </p>
          </div>
          <div class="col-sm-2"></div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propType = {
  isAuthenticated: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getAllProfiles })(Landing);
