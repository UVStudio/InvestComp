import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { getAvatar } from '../../Actions/avatar';

const Avatar = ({ auth: { loading, profile } }) => {
  let avatarId;

  if (!loading && profile) {
    avatarId = profile.avatarId;
  }

  const avatarPath = `api/avatar/image/${avatarId}`;
  const genericAvatar = './img/avatar.png';

  return (
    <Fragment>
      {profile == null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="profile-info-left">
            <img
              className="round-img mb-3 shadow"
              src={avatarId ? avatarPath : genericAvatar}
              alt=""
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Avatar.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getAvatar })(Avatar);
