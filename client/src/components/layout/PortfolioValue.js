import React from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const PortfolioValue = ({ profile: { loading, profile } }) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <h5 className="text-dark">
      Portfolio Value: $
      {profile &&
        profile.portfolio.profileBalance > 0 &&
        profile.portfolio.profileBalance.toFixed(2)}
    </h5>
  );
};

PortfolioValue.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(PortfolioValue);
