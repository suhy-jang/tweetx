import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Head from './components/head/Head';
import Navbar from './components/layouts/Navbar';
import Hamburger from './components/layouts/Hamburger';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import ProfileFollowings from './components/profile/ProfileFollowings';
import ProfileFollowers from './components/profile/ProfileFollowers';
import Users from './components/users/Users';
import Post from './components/post/Post';
import CreatePost from './components/posts/CreatePost';
import Logout from './components/auth/Logout';
import Landing from './components/layouts/Landing';
import LoginOrRegister from './components/auth/LoginOrRegister';
import Login from './components/auth/Login';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Head title="" />
        <Navbar />
        <Hamburger />
        <div id="main" className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/profile-followings"
              component={ProfileFollowings}
            />
            <Route
              exact
              path="/profile-followers"
              component={ProfileFollowers}
            />
            <Route exact path="/users" component={Users} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/new-post" component={CreatePost} />
            <Route exact path="/logout" component={Logout} />
            <Route
              exact
              path="/login-or-register"
              component={LoginOrRegister}
            />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
