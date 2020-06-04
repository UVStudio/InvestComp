import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TransAlert = ({ transAlert }) => {
  return (
    <div className={`alert alert-${transAlert.alertType}`}>
      {transAlert.msg}
    </div>
  );
};

TransAlert.propTypes = {
  transAlert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  transAlert: state.transAlert,
});

export default connect(mapStateToProps)(TransAlert);
