import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getSymbol } from '../../../Actions/symbol';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

const Symbol = ({ stock, getSymbol }) => {
  const [symbolData, setSymbolData] = useState({
    symbol: '',
  });

  const { symbol } = symbolData;

  const onChangeSearch = (e) => {
    setSymbolData({
      ...symbolData,
      symbol,
      [e.target.name]: e.target.value,
    });
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    getSymbol(symbol);
    console.log(stock);
  };

  return getSymbol.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="buysell-form-box ml-3 mb-2">
        <form className="form" onSubmit={(e) => onSearchSubmit(e)}>
          <br />
          <div className="form-group">
            <input
              className="input-fields"
              type="input"
              placeholder="Company Name"
              name="symbol"
              value={symbol}
              onChange={(e) => onChangeSearch(e)}
            />
            <div>
              <label className="small text-dark" htmlFor="symbol">
                Enter company name to search for correct symbol. Capitalize the
                first letter (eg. Walmart)
              </label>
            </div>
          </div>
          <input type="submit" className="btn btn-primary" value="Search" />
        </form>
        <br />
        <div>
          <p className="text-dark">Search Result:</p>{' '}
          {stock.loading
            ? null
            : stock.symbol.stock.map((e) => (
                <li>{e.symbol + ' -- ' + e.securityName}</li>
              ))}
        </div>
      </div>
    </Fragment>
  );
};

Symbol.propTypes = {
  getSymbol: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.symbol,
});

export default connect(mapStateToProps, { getSymbol })(Symbol);
