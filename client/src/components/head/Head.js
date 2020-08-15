import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
  return (
    <Helmet>
      <title>{title ? `${title} / ` : ''}TweetX</title>
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string,
};

export default Head;
