import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      clicked: '',
      failed: false,
      loggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    this.setState({
      [name]: target.value
    });
  }

  handleButtonClick(event) {
    const { target } = event;
    const { name } = target;
    if (name === 'signup') {
      this.setState({ clicked: name });
    }
    if (name === 'login') {
      this.setState({ clicked: name });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, clicked } = this.state;
    const { handleLogin } = this.props;

    if (clicked === 'signup') {
      console.log('signing up');
      axios.post('/api/signup', { email, password })
        .then(res => console.log(res.data));
    }
    if (clicked === 'login') {
      console.log('logging in');
      axios.post('/api/login', { email, password })
        .then((res) => {
          console.log(res.data);
          this.setState({ loggedIn: true });
          handleLogin();
        });
    }
  }

  render() {
    const {
      failed, email, password, loggedIn
    } = this.state;
    let alert;
    if (failed) {
      alert = <p className="login-alert text--medium text--alert">Failed logging in.</p>;
    }
    if (loggedIn) {
      return (<Redirect from="/" to="/home" />);
    }
    return (
      <main>
        <div className="login-container">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <p className="login-header text--large text--center">Welcome. Please Login.</p>
            <div className="login-input">
              <div className="input-group">
                <p className="label text--medium">Email Address</p>
                <input type="email" placeholder="Please enter email" onChange={this.handleChange} value={email} name="email" />
              </div>
              <div className="input-group">
                <p className="label text--medium">Password</p>
                <input className="login-input" type="password" placeholder="Please enter password" onChange={this.handleChange} value={password} name="password" />
              </div>
              {alert}
            </div>
            <div className="button-group">
              <input className="login-button" type="submit" value="Login" name="login" onClick={this.handleButtonClick} />
              <input className="signup-button" type="submit" value="Sign Up" name="signup" onClick={this.handleButtonClick} />
            </div>
          </form>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};


export default Login;
