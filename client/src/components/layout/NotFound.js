import React, { Fragment } from 'react';
import Navbar from './Navbar';

const NotFound = () => {
  return (
    <Fragment>
      <Navbar />
      <h2 className="text-dark">404 page not found</h2>
      <h5 className="text-dark">
        We are sorry but the page you are looking for does not exist.
      </h5>
    </Fragment>
  );
};

export default NotFound;
