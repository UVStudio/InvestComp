import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../Actions/profile';
import PropTypes from 'prop-types';

const openTab = (evt, tab) => {
  // Declare all variables
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

const Portfolio = ({ auth, profile, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <Fragment>
      <section>
        <div class="row">
          <div class="col-lg-5">
            <div class="winner center-content">
              <h3 class="text-dark">Drago</h3>
              <img
                src="./img/avatar.png"
                class="mt-3 mb-3 avatar"
                alt="avatar"
              />
              <p class="">$153,437</p>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="portfolio-container">
              <div class="tab">
                <button
                  class="tablinks active"
                  onClick={(e) => openTab(e, 'Portfolio')}
                >
                  Portfolio
                </button>
                <button class="tablinks" onClick={(e) => openTab(e, 'BuySell')}>
                  Buy/Sell
                </button>
                <button class="tablinks" onClick={(e) => openTab(e, 'Chart')}>
                  Chart
                </button>
                <button
                  class="tablinks"
                  onClick={(e) => openTab(e, 'Transactions')}
                >
                  Transactions
                </button>
              </div>
              <div id="Portfolio" class="tabcontent">
                <h5 class="text-dark">Balance: $153,437</h5>
                <ul class="balance-ul">
                  <li class="portfolio-item">
                    <p class="name text-dark">Apple</p>
                    <p class="balance">$32,424</p>
                  </li>
                  <li class="portfolio-item">
                    <p class="name text-dark">Manulife</p>
                    <p class="balance">$32,424</p>
                  </li>
                  <li class="portfolio-item">
                    <p class="name text-dark">Costco</p>
                    <p class="balance">$32,424</p>
                  </li>
                  <li class="portfolio-item">
                    <p class="name text-dark">Wells Fargo</p>
                    <p class="balance">$32,424</p>
                  </li>
                  <li class="portfolio-item">
                    <p class="name text-dark">Moderna</p>
                    <p class="balance">$32,424</p>
                  </li>
                  <li class="portfolio-item">
                    <p class="name text-dark">Costco</p>
                    <p class="balance">$32,424</p>
                  </li>
                  <li class="portfolio-item">
                    <p class="name text-dark">Wells Fargo</p>
                    <p class="balance">$32,424</p>
                  </li>
                  <li class="portfolio-item">
                    <p class="name text-dark">Moderna</p>
                    <p class="balance">$32,424</p>
                  </li>
                  <li class="portfolio-item">
                    <p class="name text-dark">Cash</p>
                    <p class="balance">$20,000</p>
                  </li>
                </ul>
              </div>
              <div id="BuySell" class="tabcontent">
                <h5 class="text-dark">Balance: $153,437</h5>
                <div class="portfolio-inner-container">
                  <div class="buysell-form-box ml-3 mb-2">
                    <form class="form" action="#">
                      <br />
                      <input
                        type="submit"
                        class="btn btn-primary"
                        value="Buy"
                      />
                      <input
                        type="submit"
                        class="btn btn-primary"
                        value="Sell"
                      />
                      <br />
                      <div class="form-group">
                        <input
                          class="input-fields mt-3"
                          type="search"
                          placeholder="Company Name"
                          name="search"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          class="input-fields"
                          type="company"
                          placeholder="Stock Name"
                          name="company"
                          required
                        />
                      </div>
                      <p class="text-dark">cash: $12,644</p>
                      <div class="form-group">
                        <input
                          class="amount"
                          type="amount"
                          placeholder="$"
                          name="amount"
                          required
                        />
                      </div>
                      <input
                        type="submit"
                        class="btn btn-primary"
                        value="Execute!"
                      />
                    </form>
                  </div>
                  <p class="text-secondary ml-3 mb-2">
                    You have successfully bought
                    <span class="order-stats text-dark">$12,000</span> worth of
                    <span class="order-stats text-dark">Apple</span> at
                    <span class="order-stats text-dark">$200</span> per share
                    for <span class="order-stats text-dark">600</span> shares.
                  </p>
                </div>
              </div>
              <div id="Chart" class="tabcontent">
                <h5 class="text-dark">Balance: $153,437</h5>
                <div class="portfolio-inner-container">
                  <p>Account value chart</p>
                </div>
              </div>
              <div id="Transactions" class="tabcontent">
                <h5 class="text-dark">Balance: $153,437</h5>
                <table class="transactions-table">
                  <tr class="text-dark mb-5">
                    <th class="transations-item-length">Buy/Sell</th>
                    <th class="transations-item-length">Shares</th>
                    <th class="transations-item-length">Value</th>
                    <th class="transations-item-length">Total Shares</th>
                    <th class="transations-item-length">Date</th>
                  </tr>
                  <tr>
                    <td>Sell</td>
                    <td>50</td>
                    <td>1000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>120</td>
                    <td>2400</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>100</td>
                    <td>2000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Sell</td>
                    <td>50</td>
                    <td>1000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>120</td>
                    <td>2400</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>100</td>
                    <td>2000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Sell</td>
                    <td>50</td>
                    <td>1000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>120</td>
                    <td>2400</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>100</td>
                    <td>2000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Sell</td>
                    <td>50</td>
                    <td>1000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>120</td>
                    <td>2400</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>100</td>
                    <td>2000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Sell</td>
                    <td>50</td>
                    <td>1000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>120</td>
                    <td>2400</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>100</td>
                    <td>2000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Sell</td>
                    <td>50</td>
                    <td>1000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>120</td>
                    <td>2400</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
                  <tr>
                    <td>Buy</td>
                    <td>100</td>
                    <td>2000</td>
                    <td>30000</td>
                    <td>30/01/2019</td>
                  </tr>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Portfolio);
