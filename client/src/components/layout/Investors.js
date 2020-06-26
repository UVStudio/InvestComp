import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getAllProfiles } from '../../Actions/profiles';
import Navbar from './Navbar';
import NumberFormat from 'react-number-format';

const Investors = ({ profiles, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  const genericAvatar = './img/avatar.png';

  return (
    <Fragment>
      <Navbar />
      <section>
        <div className="investors-list-container">
          <h3>Investor List</h3>
          <div className="investors-list">
            <ul className="investors-list-ul">
              {profiles.loading
                ? null
                : profiles.profiles
                    .sort(
                      (a, b) =>
                        b.portfolio.profileBalance - a.portfolio.profileBalance
                    )
                    .map((e, i) => {
                      return (
                        <li key={i} className="investors-list-item">
                          <Link to={`/profile/${e._id}`}>
                            <img
                              src={
                                e.avatarId
                                  ? `api/avatar/image/${e.avatarId}`
                                  : genericAvatar
                              }
                              className="inv-list-item-avatar mr-4"
                              alt="avatar"
                            />
                          </Link>

                          <div className="investor-info">
                            <p className="name">{e.name}</p>
                            <p className="location">{e.location}</p>
                            <p className="balance">
                              <NumberFormat
                                value={e.portfolio.profileBalance}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                              />
                            </p>
                          </div>
                        </li>
                      );
                    })}
            </ul>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Investors.propTypes = {
  profiles: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getAllProfiles })(Investors);
