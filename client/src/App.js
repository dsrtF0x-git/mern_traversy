import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from './components/layout/Landing';
import Alert from "./components/layout/Alert";
import { Provider } from "react-redux";
import PrivateRoute from "./components/routing/PrivateRoute";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
}

export default App;
