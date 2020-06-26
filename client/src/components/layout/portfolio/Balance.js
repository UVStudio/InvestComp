import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Spinner from '../Spinner';

const Balance = ({ profile: { profile, loading } }) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <p>
        <span className="text-dark">Portfolio Value: </span>
        {profile && profile.portfolio.profileBalance > 0 ? (
          <NumberFormat
            value={profile.portfolio.profileBalance}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={2}
          />
        ) : null}
      </p>
    </Fragment>
  );
};

Balance.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Balance);
