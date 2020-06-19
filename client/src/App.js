import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from '../src/utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/layout/Profile';
import ProfileByID from './components/layout/ProfileByID';
import Investors from './components/layout/Investors';
import Portfolio from './components/layout/portfolio/Portfolio';
import Dashboard from './components/layout/Dashboard';
import AdminRoute from './components/routing/AdminRoute';
import AdminReg from './components/admin/AdminReg';
import AdminLogin from './components/admin/AdminLogin';
import AdminDash from './components/admin/AdminDash';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadProfile } from './Actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadProfile());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="container-fluid no-lr-padding">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile/:id" component={ProfileByID} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/investors" component={Investors} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/portfolio" component={Portfolio} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/adminreg" component={AdminReg} />
              <Route exact path="/adminlogin" component={AdminLogin} />
              <AdminRoute exact path="/admindash" component={AdminDash} />
            </Switch>
            <Footer />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
