import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const admin = (props) => {
  return <div>admin</div>;
};

admin.propTypes = {};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(admin);
