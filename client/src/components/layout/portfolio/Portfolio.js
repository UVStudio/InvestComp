import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../Actions/profile';
import { getBalanceUpdate } from '../../../Actions/balance';
import { buyStock } from '../../../Actions/orders';
import { sellStock } from '../../../Actions/orders';
import { transAlert } from '../../../Actions/transAlert';
import { getSymbols } from '../../../Actions/symbol';
import { getSymbol } from '../../../Actions/symbol';
import Avatar from '../Avatar';
import Alert from '../Alert';
import Balance from './Balance';
import Spinner from '../Spinner';
import TransAlert from '../TransAlert';
import PortfolioValue from '../PortfolioValue';
import PortfolioBalance from '../PortfolioBalance';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Navbar from '../Navbar';

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
  getCurrentProfile,
  getBalanceUpdate,
  buyStock,
  sellStock,
  transAlert,
  getSymbols,
  getSymbol,
  profile: { profile, loading },
  symbols,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getSymbols();
  }, [getCurrentProfile, getSymbols]);

  const [formData, setFormData] = useState({
    buysell: '',
    amount: 0,
    shares: 0,
    stock: '',
  });

  const [symbolData, setSymbolData] = useState({
    symbol: '',
  });

  const { buysell, amount, shares, stock } = formData;
  const { symbol } = symbolData;

  const refresh = async () => {
    await getBalanceUpdate();
    getCurrentProfile();
  };

  //buy

  const onChangeSearch = (e) => {
    setSymbolData({
      ...symbolData,
      symbol,
      [e.target.name]: e.target.value,
    });
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (symbol === '') {
      transAlert('Please enter company name keyword.', 'danger');
      return;
    }
    getSymbol(symbol);
  };

  const onClickAdd = (e) => {
    const symName = e.target.innerText.split(' ');
    const sym = symName[0];
    console.log(sym);
    setFormData({
      ...formData,
      buysell: 'buy',
      stock: sym,
    });
  };

  const onChangeBuy = (e) => {
    setFormData({
      ...formData,
      buysell: 'buy',
      [e.target.name]: e.target.value,
    });
  };

  const onChangeBuyAmount = (e) => {
    setFormData({
      ...formData,
      buysell: 'buy',
      [e.target.name]: e.target.value,
    });
  };

  const onBuySubmit = (e) => {
    e.preventDefault();
    const pppc = profile.portfolio.cash;
    if (buysell !== 'buy' || !amount || !stock) {
      transAlert('Please fill out order form.', 'danger');
      return;
    }
    if (amount > pppc) {
      transAlert('You do not have enough cash.', 'danger');
      return;
    }
    const sss = symbols.symbols.symbolList;
    const match = sss.find((e) => e === stock);
    if (match) {
      buyStock({ buysell, amount, stock });
      transAlert(
        `You have purchased ${amount} of ${stock}. Please refresh portfolio.`,
        'success'
      );
    } else {
      transAlert(
        `This stock symbol is not available. Please choose another.`,
        'danger'
      );
    }
  };

  //sell

  const onChangeSell = (e) => {
    setFormData({
      ...formData,
      buysell: 'sell',
      [e.target.name]: e.target.value,
    });
  };

  const onSellSubmit = (e) => {
    e.preventDefault();
    const pppe = profile.portfolio.equity;
    const shareToSell = pppe.find((e) => e.stock === stock);
    const findCompany = (e) => e.stock === stock;
    if (buysell !== 'sell' || !shares || !stock) {
      transAlert('Please fill out order form', 'danger');
      return;
    }
    if (!shareToSell) {
      transAlert(
        'You do not have stock. Please pick a stock from the above list.',
        'danger'
      );
      return;
    }
    const result = pppe.findIndex(findCompany);

    if (shares > pppe[result].shares) {
      transAlert('You do not have enough shares.', 'danger');
      return;
    }
    sellStock({ buysell, shares, stock });
    transAlert(
      `You have sold ${shares} shares of ${stock}. Please refresh portfolio.`,
      'success'
    );
  };

  const onClickAllUnits = () => {
    const pppe = profile.portfolio.equity;
    const shareToSell = pppe.find((e) => e.stock === stock);
    if (!shareToSell) {
      transAlert('Please pick a stock from the above list.', 'danger');
      return;
    }
    const allUnitBalance = shareToSell.balance / shareToSell.price;
    setFormData({
      ...formData,
      shares: allUnitBalance,
    });
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <Alert />
      <section>
        <div className="row">
          <div className="col-lg-5">
            <div className="winner shadow center-content py-4">
              <h3 className="text-dark">
                {profile && profile.name}'s Portfolio
              </h3>
              <Avatar />
              <Balance />
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
            <div className="portfolio-container shadow">
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
                <PortfolioValue />
                <PortfolioBalance />
              </div>
              <div id="Buy" className="tabcontent">
                <PortfolioValue />
                <div className="portfolio-inner-container">
                  {/* <Symbol /> */}
                  <div className="buysell-form-box ml-3 mb-2">
                    <form className="form" onSubmit={(e) => onSearchSubmit(e)}>
                      <br />
                      <div className="form-group">
                        <input
                          className="input-fields form-control"
                          type="input"
                          placeholder="Company Name"
                          name="symbol"
                          value={symbol}
                          onChange={(e) => onChangeSearch(e)}
                        />
                        <div>
                          <label className="small text-dark" htmlFor="symbol">
                            Enter company name to search for correct symbol.
                            Capitalize the first letter (eg. Walmart)
                          </label>
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Search"
                      />
                    </form>
                    <br />
                    <div>
                      <p className="text-dark">Search Result:</p>{' '}
                      {symbols.loading
                        ? null
                        : symbols.symbol.stock.map((e, i) => (
                            <li
                              key={i}
                              className="symbol-select"
                              onClick={(e) => onClickAdd(e)}
                            >
                              {e.symbol + ' -- ' + e.securityName}
                            </li>
                          ))}
                    </div>
                  </div>
                  <div className="buysell-form-box ml-3 mb-2">
                    <form className="form" onSubmit={(e) => onBuySubmit(e)}>
                      <br />
                      <div className="form-group">
                        <input
                          className="input-fields form-control"
                          type="stock"
                          placeholder="Stock Symbol"
                          name="stock"
                          value={stock}
                          onChange={(e) => onChangeBuy(e)}
                        />
                        <div>
                          <label className="small text-dark" htmlFor="symbol">
                            Enter the correct stock symbol. ALL CAPS.
                          </label>
                        </div>
                      </div>

                      <p className="text-dark">
                        current cash: $
                        {profile && profile.portfolio.cash.toFixed(2)}
                      </p>
                      <div className="form-group">
                        <input
                          className="input-fields form-control"
                          type="amount"
                          placeholder="$"
                          name="amount"
                          value={amount}
                          onChange={(e) => onChangeBuyAmount(e)}
                        />
                        <div>
                          <label className="small text-dark" htmlFor="symbol">
                            Enter how much $ you want to invest.
                          </label>
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Buy!"
                      />
                    </form>
                  </div>
                  <TransAlert />
                </div>
              </div>
              <div id="Sell" className="tabcontent">
                <PortfolioValue />
                <div className="portfolio-inner-container">
                  <div className="buysell-form-box ml-3 mb-2">
                    <ul className="balance-ul">
                      <li className="text-dark mb-2">Unit Balance</li>
                      {profile &&
                        profile.portfolio.equity
                          .filter((e) => e.balance > 0)
                          .map((e, i) => {
                            return (
                              <li key={i} className="portfolio-item">
                                <p className="sell-balance mb-1">
                                  <span className="text-dark">
                                    {e.stock} :{' '}
                                  </span>
                                  {e.balance / e.price}
                                </p>
                              </li>
                            );
                          })}
                      <li className="portfolio-item text-dark">
                        cash:{' '}
                        {profile ? (
                          <NumberFormat
                            value={profile.portfolio.cash}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            decimalScale={2}
                          />
                        ) : null}
                      </li>
                    </ul>
                    <form className="form" onSubmit={(e) => onSellSubmit(e)}>
                      <br />
                      <div className="form-group">
                        <input
                          className="input-fields form-control"
                          type="input"
                          placeholder="Stock Symbol"
                          name="stock"
                          value={stock}
                          onChange={(e) => onChangeSell(e)}
                        />
                        <div>
                          <label className="small text-dark" htmlFor="symbol">
                            Enter the correct symbol. All CAPS.
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          className="input-fields form-control"
                          type="shares"
                          placeholder="Shares:"
                          name="shares"
                          value={shares}
                          onChange={(e) => onChangeSell(e)}
                        />
                        <div>
                          <label className="small text-dark" htmlFor="symbol">
                            Enter the number of shares you want to sell.
                          </label>
                        </div>
                        <label htmlFor="all" className="text-dark">
                          <input
                            type="checkbox"
                            name="all"
                            value="all"
                            className=""
                            onClick={(e) => onClickAllUnits(e)}
                          />
                          <span className="ml-1">All units</span>
                        </label>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Place Order"
                      />
                    </form>
                  </div>
                  <TransAlert />
                </div>
              </div>
              <div id="Chart" className="tabcontent">
                <PortfolioValue />
                <div className="portfolio-inner-container">
                  <p>Account value chart</p>
                  <h3 className="text-dark text-center py-5">
                    Under Construction
                  </h3>
                </div>
              </div>
              <div id="Transactions" className="tabcontent">
                <PortfolioValue />
                <table className="transactions-table table table-sm">
                  {profile &&
                    profile.portfolio.equity.map((e, i) => {
                      return (
                        <Fragment key={i}>
                          <thead>
                            <tr>
                              <th>{e.stock}</th>
                              <th> </th>
                              <th> </th>
                              <th> </th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-dark">
                              <th
                                scope="col"
                                className="transations-item-length"
                              >
                                Buy/Sell
                              </th>
                              <th
                                scope="col"
                                className="transations-item-length"
                              >
                                Shares
                              </th>
                              <th
                                scope="col"
                                className="transations-item-length"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="transations-item-length"
                              >
                                Dollar Amount
                              </th>
                              <th
                                scope="col"
                                className="transations-item-length"
                              >
                                Date
                              </th>
                            </tr>
                            {e.transactions.map((f, j) => {
                              return (
                                <tr key={j}>
                                  <td>{f.buysell}</td>
                                  <td>{f.shares.toFixed(3)}</td>
                                  <td>{f.price.toFixed(2)}</td>
                                  <td>{f.amount.toFixed(2)}</td>
                                  <td>
                                    {format(
                                      new Date(f.date),
                                      'yyyy-MM-dd hh:mm:ss'
                                    )}
                                  </td>
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
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getBalanceUpdate: PropTypes.func.isRequired,
  buyStock: PropTypes.func.isRequired,
  sellStock: PropTypes.func.isRequired,
  transAlert: PropTypes.func.isRequired,
  getSymbols: PropTypes.func.isRequired,
  getSymbol: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  symbols: state.symbol,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getBalanceUpdate,
  buyStock,
  sellStock,
  transAlert,
  getSymbols,
  getSymbol,
})(Portfolio);
