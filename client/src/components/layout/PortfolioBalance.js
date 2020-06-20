import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const PortfolioBalance = ({ profile: { profile, loading } }) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
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
    </Fragment>
  );
};

PortfolioBalance.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(PortfolioBalance);
