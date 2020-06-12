import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from '../src/utils/setAuthToken';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Investors from './components/layout/Investors';
import Portfolio from './components/layout/portfolio/Portfolio';
import Footer from './components/layout/Footer';
import Dashboard from './components/layout/Dashboard';
import Admin from './components/admin/admin';
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
            <Navbar />
            <Alert />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/investors" component={Investors} />
              <Route exact path="/admin" component={Admin} />
              <PrivateRoute exact path="/portfolio" component={Portfolio} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Footer />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
