import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../Actions/profile';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Avatar from './Avatar';
import Footer from './Footer';
import Navbar from './Navbar';
import PortfolioBalance from './PortfolioBalance';

const Profile = ({ getCurrentProfile, auth: { profile, loading } }) => {
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
          <div className="winner shadow center-content py-4">
            <h3 className="text-dark">My Profile</h3>
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
            <div className="balance-box shadow">
              <PortfolioBalance />
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
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
