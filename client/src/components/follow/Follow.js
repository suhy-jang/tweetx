import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Follow = ({ className, handleFollow, loading, followed, userId }) => {
  const [buttonType, setButtonType] = useState('');
  const [word, setWord] = useState('');
  const [hover, setHover] = useState(null);

  const setFollowButton = (followed) => {
    if (followed) {
      setWord(hover ? 'UNFOLLOW' : 'FOLLOWING');
      setButtonType('btn-following');
    } else {
      setWord('FOLLOW');
      setButtonType('btn-primary');
    }
  };

  useEffect(() => {
    setFollowButton(followed);
  }, [followed]);

  return (
    <button
      onClick={() => handleFollow(userId, followed)}
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
  className: PropTypes.string.isRequired,
  handleFollow: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  followed: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Follow;
