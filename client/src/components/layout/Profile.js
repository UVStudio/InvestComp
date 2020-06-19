import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../Actions/profile';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Footer from './Footer';
import Navbar from './Navbar';

const Profile = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <div className="row">
        <div className="col-lg-5">
          <div className="winner center-content ml-4">
            <h3 className="text-dark">I'm {profile && profile.name}!</h3>
            <img src="./img/avatar.png" className="mt-3 mb-3 avatar" />
            <p className="">$153,437</p>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="profile-balance">
            <h3 className="text-dark">Portfolio</h3>
            <h5 className="mb-3">Balance: $153,437</h5>
            <div className="balance-box">
              <ul className="balance-ul">
                <li className="portfolio-item">
                  <p className="name text-dark">Apple</p>
                  <p className="balance">$32,424</p>
                </li>
                <li className="portfolio-item">
                  <p className="name text-dark">Manulife</p>
                  <p className="balance">$32,424</p>
                </li>
                <li className="portfolio-item">
                  <p className="name text-dark">Costco</p>
                  <p className="balance">$32,424</p>
                </li>
                <li className="portfolio-item">
                  <p className="name text-dark">Wells Fargo</p>
                  <p className="balance">$32,424</p>
                </li>
                <li className="portfolio-item">
                  <p className="name text-dark">Moderna</p>
                  <p className="balance">$32,424</p>
                </li>
                <li className="portfolio-item">
                  <p className="name text-dark">Costco</p>
                  <p className="balance">$32,424</p>
                </li>
                <li className="portfolio-item">
                  <p className="name text-dark">Wells Fargo</p>
                  <p className="balance">$32,424</p>
                </li>
                <li className="portfolio-item">
                  <p className="name text-dark">Moderna</p>
                  <p className="balance">$32,424</p>
                </li>
                <li className="portfolio-item">
                  <p className="name text-dark">Cash</p>
                  <p className="balance">$20,000</p>
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
