import React, { Fragment } from 'react';
import Navbar from './Navbar';

const Investors = () => {
  return (
    <Fragment>
      <Navbar />
      <section>
        <div className="investors-list-container">
          <h3>Investor List</h3>
          <div className="investors-list">
            <ul className="investors-list-ul">
              <li className="investors-list-item">
                <img
                  src="./img/avatar.png"
                  className="inv-list-item-avatar mr-4"
                  alt="avatar"
                />
                <div className="investor-info">
                  <p className="name">Jennifer</p>
                  <p className="location">Seattle, USA</p>
                  <p className="balance">$103,642</p>
                </div>
              </li>
              <li className="investors-list-item">
                <img
                  src="./img/avatar.png"
                  className="inv-list-item-avatar mr-4"
                  alt="avatar"
                />
                <div className="investor-info">
                  <p className="name">Leo</p>
                  <p className="location">Toronto, Canada</p>
                  <p className="balance">$103,642</p>
                </div>
              </li>
              <li className="investors-list-item">
                <img
                  src="./img/avatar.png"
                  className="inv-list-item-avatar mr-4"
                  alt="avatar"
                />
                <div className="investor-info">
                  <p className="name">Amy</p>
                  <p className="location">Hong Kong, SAR</p>
                  <p className="balance">$103,642</p>
                </div>
              </li>
              <li className="investors-list-item">
                <img
                  src="./img/avatar.png"
                  className="inv-list-item-avatar mr-4"
                  alt="avatar"
                />
                <div className="investor-info">
                  <p className="name">Andrew</p>
                  <p className="location">Prince Albert, Canada</p>
                  <p className="balance">$103,642</p>
                </div>
              </li>
              <li className="investors-list-item">
                <img
                  src="./img/avatar.png"
                  className="inv-list-item-avatar mr-4"
                  alt="avatar"
                />
                <div className="investor-info">
                  <p className="name">Jennifer</p>
                  <p className="location">Seattle, USA</p>
                  <p className="balance">$103,642</p>
                </div>
              </li>
              <li className="investors-list-item">
                <img
                  src="./img/avatar.png"
                  className="inv-list-item-avatar mr-4"
                  alt="avatar"
                />
                <div className="investor-info">
                  <p className="name">Leo</p>
                  <p className="location">Toronto, Canada</p>
                  <p className="balance">$103,642</p>
                </div>
              </li>
              <li className="investors-list-item">
                <img
                  src="./img/avatar.png"
                  className="inv-list-item-avatar mr-4"
                  alt="avatar"
                />
                <div className="investor-info">
                  <p className="name">Amy</p>
                  <p className="location">Hong Kong, SAR</p>
                  <p className="balance">$103,642</p>
                </div>
              </li>
              <li className="investors-list-item">
                <img
                  src="./img/avatar.png"
                  className="inv-list-item-avatar mr-4"
                  alt="avatar"
                />
                <div className="investor-info">
                  <p className="name">Andrew</p>
                  <p className="location">Prince Albert, Canada</p>
                  <p className="balance">$103,642</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Investors;
