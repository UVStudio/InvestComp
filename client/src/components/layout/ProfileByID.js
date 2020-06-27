import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../Actions/profile';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Navbar from './Navbar';

const Profile = ({ match, getProfileById, profile: { profile, loading } }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  const genericAvatar = '../img/avatar.png';

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <div className="row">
        <div className="col-lg-5">
          <div className="center-content mt-5">
            <h3 className="text-dark">Hello! I'm {profile && profile.name}.</h3>
            <img
              src={
                profile && profile.avatarId
                  ? `/api/avatar/image/${profile.avatarId}`
                  : genericAvatar
              }
              className="round-img mb-3 shadow pt-2"
              alt="avatar"
            />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="profile-balance">
            <h3 className="text-dark">Portfolio</h3>
            <h5 className="mb-3">
              Current Balance:{' '}
              {profile && profile.portfolio.profileBalance > 0 ? (
                <NumberFormat
                  value={profile.portfolio.profileBalance}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                  decimalScale={2}
                />
              ) : null}
            </h5>
            <div className="balance-box shadow">
              <ul className="balance-ul">
                <li className="portfolio-item">
                  <p className="name text-dark">Stock</p>
                  <p className="balance text-dark">Value</p>
                  <p className="balance text-dark">Unit Balance</p>
                </li>
                {profile &&
                  profile.portfolio.equity
                    .filter((e) => e.balance > 0)
                    .map((e, i) => {
                      return (
                        <li key={i} className="portfolio-item">
                          <p className="name text-dark">{e.stock}</p>
                          <p className="balance">${e.balance.toFixed(2)}</p>
                          <p className="balance">{e.shares}</p>
                        </li>
                      );
                    })}
                <br />
                <li className="portfolio-item">
                  <p className="name text-dark">Cash</p>
                  <p className="balance">
                    ${profile && profile.portfolio.cash.toFixed(2)}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
