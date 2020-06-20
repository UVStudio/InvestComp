import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../Actions/profile';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Avatar from './Avatar';
import Footer from './Footer';
import Navbar from './Navbar';

const Profile = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const genericAvatar = '../img/avatar.png';

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <div className="row">
        <div className="col-lg-5">
          <div className="winner center-content ml-4">
            <h3 className="text-dark">I'm {profile && profile.name}!</h3>
            <Avatar />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="profile-balance">
            <h3 className="text-dark">Portfolio</h3>
            <h5 className="mb-3">
              Current Balance: $
              {profile && profile.portfolio.profileBalance.toFixed(2)}
            </h5>
            <div className="balance-box">
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
      <Footer />
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
