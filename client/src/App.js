import React, { Fragment } from 'react';
import Feed from './components/feed/Feed';
import Navbar from './components/layouts/Navbar';
import Hamburger from './components/layouts/Hamburger';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Hamburger />
      <div id="main" className="container">
        <Feed />
      </div>
    </Fragment>
  );
};

export default App;
