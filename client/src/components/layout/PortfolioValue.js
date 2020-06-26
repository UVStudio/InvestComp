import React from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const PortfolioValue = ({ profile: { loading, profile } }) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <h5 className="text-dark">
      Portfolio Value:{' '}
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
  );
};

PortfolioValue.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(PortfolioValue);
