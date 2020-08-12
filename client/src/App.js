import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Head from './components/head/Head';
import Navbar from './components/layouts/Navbar';
import HamburgerMenu from './components/layouts/HamburgerMenu';
import Routes from './components/routing/Routes';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Head />
        <Navbar />
        <HamburgerMenu />
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
