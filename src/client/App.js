/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import './app.css';
import { Switch, Route } from 'react-router-dom';

/* Components */
import NavBar from './components/NavBar';

/* Pages */
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('loggedIn') === 'true') {
      console.log('Already logged in');
      this.setState({ loggedIn: true });
    }
  }

  handleLogin() {
    this.setState({ loggedIn: true });
    localStorage.setItem('loggedIn', true);
  }

  render() {
    return (
      <div className="app">
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Login handleLogin={this.handleLogin} />}
          />
          <Route
            path="/home"
            component={Dashboard}
          />
        </Switch>
      </div>
    );
  }
}
