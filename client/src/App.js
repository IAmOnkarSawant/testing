import React from 'react';
import './App.css';
import LoginRegister from './components/auth/LoginRegister';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Categories from './components/pages/Categories';
import Explore from './components/pages/Explore';
import Admin from './components/Admin/Admin';
import { AnimatePresence } from 'framer-motion'
import ProtectedRoute from './components/protected/protectedRoute'
import AdminAuth from './components/protected/isAdmin'
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UsersCollection from './components/Admin/ManageUsers/UsersCollection';
import SpamCategories from './components/Admin/SpamCategory/SpamCategories';
import NotFoundPage from './components/pages/NotFoundPage';
import PostsBycategory from './components/pages/PostsBycategory';
import PostIndividual from './components/pages/PostIndividual';
import MyProfile from './components/pages/MyProfile';
import PrivateGroups from './components/pages/PrivateGroups';
import privateGroupsById from './components/pages/PrivateGroupsById';
import Modal from './components/pages/Modal';
import { Component } from 'react';
import SpamPosts from './components/Admin/SpamPosts/SpamPosts';
import FollowedCategories from './components/pages/FollowedCategories';

class App extends Component {
  constructor(props) {
    super(props);
    this.previousLocation = this.props.location;
  }

  componentWillUpdate() {
    let { location } = this.props;

    if (!(location.state && location.state.modal)) {
      this.previousLocation = location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    return (
      <AnimatePresence >
        <div className="App">
          <Switch location={isModal ? this.previousLocation : location} key={location.pathname} >
            <Redirect exact from="/" to="/explore/" />
            <Redirect exact from="/profile/" to="/profile/Myposts/" />
            <Redirect exact from="/admin/" to="/admin/userscoll/" />
            {/* basic routes */}
            <Route exact path="/auth/:page/" component={(props) => <LoginRegister {...props} />} />
            <ProtectedRoute exact path="/profile/:page/" component={(props) => <MyProfile {...props} />} />

            <Route exact path="/explore/" component={Explore} />

            <AdminAuth exact path="/admin/" component={(props) => <Admin {...props} />} />
            <AdminAuth exact path="/admin/userscoll/" component={(props) => <UsersCollection {...props} />} />
            <AdminAuth exact path="/admin/spamposts/" component={(props) => <SpamPosts {...props} />} />
            <AdminAuth exact path="/admin/spamcategories/" component={(props) => <SpamCategories {...props} />} />

            {/* //protected routes */}

            <ProtectedRoute exact path="/categories/" component={Categories} />
            <ProtectedRoute exact path="/categories/:categoryName/:categoryId/" component={PostsBycategory} />

            <ProtectedRoute exact path="/groups/" component={PrivateGroups} />
            <ProtectedRoute exact path="/groups/:groupName/:groupId/" component={privateGroupsById} />

            <ProtectedRoute exact path="/followedcategories/" component={FollowedCategories} />

            <ProtectedRoute exact path="/post/:postId/" component={PostIndividual} />

            <ProtectedRoute exact path="/modal/:groupName/:id/:pref/"><Modal isModal={isModal} /></ProtectedRoute>

            <Route path="*" component={() => <NotFoundPage message="UH.. PAGE NOT FOUND" />} />
          </Switch>

          {isModal
            ? <ProtectedRoute exact path="/modal/:groupName/:id/:pref/"><Modal isModal={isModal} /></ProtectedRoute>
            : null
          }

          <ToastContainer
            position="top-center"
            autoClose={12000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
            transition={Slide}
          />
        </div>
      </AnimatePresence>
    );
  }
}

export default withRouter(App);
