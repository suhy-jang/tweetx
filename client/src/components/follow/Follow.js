import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { follow, unfollow } from '../../actions/auth';
import { connect } from 'react-redux';

const Follow = ({
  auth: { loading, user: authUser },
  user,
  className,
  follow,
  unfollow,
}) => {
  const [followState, setFollowState] = useState(null);
  const [buttonType, setButtonType] = useState('');
  const [word, setWord] = useState('');
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (followState) {
        setWord(hover ? 'UNFOLLOW' : 'FOLLOWING');
        setButtonType('btn-following');
      } else {
        setWord('FOLLOW');
        setButtonType('btn-primary');
      }
    } else {
      setHover(false);
    }
  }, [hover, followState, loading]);

  useEffect(() => {
    if (authUser && authUser.followings) {
      const followed = authUser.followings.some(
        (f) => f.following.id === user.id,
      );
      setFollowState(followed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const handleFollow = () => {
    if (followState === true) {
      unfollow(user.id, setFollowState);
    } else if (followState === false) {
      follow(user.id, setFollowState);
    }
  };

  if (!authUser) return <></>;

  return (
    <button
      onClick={handleFollow}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className={`btn ${buttonType} rounded-pill font-sm ${className}`}
      disabled={loading}
    >
      {word}
    </button>
  );
};

Follow.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { follow, unfollow })(Follow);
