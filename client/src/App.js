import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Head from './components/head/Head';
import Navbar from './components/layouts/Navbar';
import HamburgerMenu from './components/hamburger/HamburgerMenu';
import store from './store';
import { loadUser } from './actions/auth';
import Routes from './components/routing/Routes';
import WakeUpServer from './utils/wakeupServer';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <WakeUpServer />
        <Head />
        <Navbar />
        <HamburgerMenu />
        <Routes />
      </Router>
    </Provider>
  );
};

export default App;
