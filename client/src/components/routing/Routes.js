import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import PrivateComponent from './PrivateComponent';

const AppRoutes = () => {
  return (
    <div id="main" className="container">
      <Alert />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/feed" element={<PrivateComponent Component={Feed} />} />
        <Route
          path="/new-post"
          element={<PrivateComponent Component={CreatePost} />}
        />
        <Route
          path="/edit-profile"
          element={<PrivateComponent Component={EditProfile} />}
        />
        <Route
          path="/logout"
          element={<PrivateComponent Component={Logout} />}
        />
        <Route path="/users" element={<PrivateComponent Component={Users} />} />
        <Route
          path="/profile"
          element={<PrivateComponent Component={Profile} />}
        />
        <Route
          path="/profile-followings"
          element={<PrivateComponent Component={ProfileFollowings} />}
        />
        <Route
          path="/profile-followers"
          element={<PrivateComponent Component={ProfileFollowers} />}
        />
        <Route path="/post" element={<PrivateComponent Component={Post} />} />
        <Route path="/login-or-register" element={<LoginOrRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password/:resetToken"
          element={<ResetPasswordConfirm />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
