import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Feed from '../feed/Feed';
import Profile from '../profile/Profile';
import ProfileFollowings from '../profile/ProfileFollowings';
import ProfileFollowers from '../profile/ProfileFollowers';
import Users from '../users/Users';
import Post from '../post/Post';
import CreatePost from '../posts/CreatePost';
import Logout from '../auth/Logout';
import Landing from '../layouts/Landing';
import LoginOrRegister from '../auth/LoginOrRegister';
import Login from '../auth/Login';
import Register from '../auth/Register';
import EditProfile from '../auth/EditProfile';
import ResetPassword from '../auth/ResetPassword';
import ResetPasswordConfirm from '../auth/ResetPasswordConfirm';
import NotFound from '../layouts/NotFound';
import Alert from '../layouts/Alert';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <div id="main" className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <PrivateRoute exact path="/feed" component={Feed} />
        <PrivateRoute exact path="/new-post" component={CreatePost} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/users" component={Users} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile-followings" component={ProfileFollowings} />
        <Route exact path="/profile-followers" component={ProfileFollowers} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/login-or-register" component={LoginOrRegister} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route
          exact
          path="/reset-password/:resetToken"
          component={ResetPasswordConfirm}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
