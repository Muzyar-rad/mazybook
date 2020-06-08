import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import WelcomePage from "./components/welcomePage";
import HomePage from "./components/homePage";
import Profile from "./components/profile";
import NavBar from "./components/navBar";
import { getCurrentUser } from "./services/authService";
import "./App.css";
class App extends Component {
  state = { user: {} };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <NavBar />
        <Switch>
          <Route
            path="/welcome"
            render={props => <WelcomePage {...props} user={user} />}
          />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route
            path="/home"
            render={props => <HomePage {...props} user={user} />}
          />
          <Redirect from="/" exact to="/welcome" />
        </Switch>
      </div>
    );
  }
}

export default App;
