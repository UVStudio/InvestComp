import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../Actions/profile';
import { getBalanceUpdate } from '../../../Actions/balance';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';

const openTab = (evt, tab) => {
  let i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tab).style.display = 'block';
  evt.currentTarget.className += ' active';
};

const Portfolio = ({
  auth,
  getCurrentProfile,
  getBalanceUpdate,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const refresh = async () => {
    await getBalanceUpdate();
    getCurrentProfile();
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-lg-5">
            <div className="winner center-content">
              <h3 className="text-dark">{profile && profile.profile.name}</h3>
              <img
                src="./img/avatar.png"
                className="mt-3 mb-3 avatar"
                alt="avatar"
              />
              <p className="">
                $
                {profile && profile.profile.portfolio.profileBalance.toFixed(2)}
              </p>
              <button
                type="button"
                className="btn btn-success"
                onClick={(e) => refresh(e)}
              >
                Refresh Portfolio
              </button>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="portfolio-container">
              <div className="tab">
                <button
                  className="tablinks active"
                  onClick={(e) => openTab(e, 'Portfolio')}
                >
                  Portfolio
                </button>
                <button className="tablinks" onClick={(e) => openTab(e, 'Buy')}>
                  Buy
                </button>
                <button
                  className="tablinks"
                  onClick={(e) => openTab(e, 'Sell')}
                >
                  Sell
                </button>
                <button
                  className="tablinks"
                  onClick={(e) => openTab(e, 'Chart')}
                >
                  Chart
                </button>
                <button
                  className="tablinks"
                  onClick={(e) => openTab(e, 'Transactions')}
                >
                  Transactions
                </button>
              </div>
              <div id="Portfolio" className="tabcontent">
                <h5 className="text-dark">
                  Balance: $
                  {profile &&
                    profile.profile.portfolio.profileBalance.toFixed(2)}
                </h5>
                <ul className="balance-ul">
                  {profile &&
                    profile.profile.portfolio.equity.map((e, i) => {
                      return (
                        <li key={i} className="portfolio-item">
                          <p className="name text-dark">{e.stock}</p>
                          <p className="balance">${e.balance.toFixed(2)}</p>
                        </li>
                      );
                    })}
                  <li className="portfolio-item">
                    <p className="name text-dark">Cash</p>
                    <p className="balance">
                      ${profile && profile.profile.portfolio.cash}
                    </p>
                  </li>
                </ul>
              </div>
              <div id="Buy" className="tabcontent">
                <h5 className="text-dark">
                  Balance: $
                  {profile &&
                    profile.profile.portfolio.profileBalance.toFixed(2)}
                </h5>
                <div className="portfolio-inner-container">
                  <div className="buysell-form-box ml-3 mb-2">
                    <form className="form" action="#">
                      <br />
                      <div className="form-group">
                        <input
                          className="input-fields mt-3"
                          type="search"
                          placeholder="Company Name"
                          name="search"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="input-fields"
                          type="company"
                          placeholder="Stock Name"
                          name="company"
                          required
                        />
                      </div>
                      <p className="text-dark">
                        cash: ${profile && profile.profile.portfolio.cash}
                      </p>
                      <div className="form-group">
                        <input
                          className="amount"
                          type="amount"
                          placeholder="$"
                          name="amount"
                          required
                        />
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Execute!"
                      />
                    </form>
                  </div>
                  <p className="text-secondary ml-3 mb-2">
                    You have successfully bought
                    <span className="order-stats text-dark">$12,000</span> worth
                    of
                    <span className="order-stats text-dark">Apple</span> at
                    <span className="order-stats text-dark">$200</span> per
                    share for <span className="order-stats text-dark">600</span>{' '}
                    shares.
                  </p>
                </div>
              </div>
              <div id="Sell" className="tabcontent">
                <h5 className="text-dark">
                  Balance: $
                  {profile &&
                    profile.profile.portfolio.profileBalance.toFixed(2)}
                </h5>
                <div className="portfolio-inner-container">
                  <div className="buysell-form-box ml-3 mb-2">
                    <form className="form" action="#">
                      <br />
                      <div className="form-group">
                        <input
                          className="input-fields mt-3"
                          type="search"
                          placeholder="Company Name"
                          name="search"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="input-fields"
                          type="company"
                          placeholder="Stock Name"
                          name="company"
                          required
                        />
                      </div>
                      <p className="text-dark">
                        cash: ${profile && profile.profile.portfolio.cash}
                      </p>
                      <div className="form-group">
                        <input
                          className="amount"
                          type="amount"
                          placeholder="Shares:"
                          name="amount"
                          required
                        />
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Execute!"
                      />
                    </form>
                  </div>
                  <p className="text-secondary ml-3 mb-2">
                    You have successfully sold
                    <span className="order-stats text-dark">$12,000</span> worth
                    of
                    <span className="order-stats text-dark">Apple</span> at
                    <span className="order-stats text-dark">$200</span> per
                    share for <span className="order-stats text-dark">600</span>{' '}
                    shares.
                  </p>
                </div>
              </div>
              <div id="Chart" className="tabcontent">
                <h5 className="text-dark">
                  Balance: $
                  {profile &&
                    profile.profile.portfolio.profileBalance.toFixed(2)}
                </h5>
                <div className="portfolio-inner-container">
                  <p>Account value chart</p>
                </div>
              </div>
              <div id="Transactions" className="tabcontent">
                <h5 className="text-dark">
                  Balance: $
                  {profile &&
                    profile.profile.portfolio.profileBalance.toFixed(2)}
                </h5>
                <table className="transactions-table">
                  {profile &&
                    profile.profile.portfolio.equity.map((e, i) => {
                      return (
                        <Fragment key={i}>
                          <thead>
                            <tr className="ml-3 mt-4">
                              <th>{e.stock}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-dark mb-5">
                              <th className="transations-item-length">
                                Buy/Sell
                              </th>
                              <th className="transations-item-length">
                                Shares
                              </th>
                              <th className="transations-item-length">Price</th>
                              <th className="transations-item-length">
                                Dollar Amount
                              </th>
                              <th className="transations-item-length">Date</th>
                            </tr>
                            {e.transactions.map((f, j) => {
                              return (
                                <tr key={j}>
                                  <td>{f.buysell}</td>
                                  <td>{f.shares.toFixed(2)}</td>
                                  <td>{f.price.toFixed(2)}</td>
                                  <td>{f.amount.toFixed(2)}</td>
                                  <td>{f.date}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Fragment>
                      );
                    })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Portfolio.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getBalanceUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getBalanceUpdate,
})(Portfolio);
