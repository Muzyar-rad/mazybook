import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import "../css/loginForm.css";

class LoginForm extends Component {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  validate = () => {
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  changeHandler = event => {
    let name = event.target.name;
    let value = event.target.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty({ name, value });
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    let data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  };

  submitHandler = async event => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      await auth.login(this.state.data);
      window.location = "/home";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/home" />;
    const { errors } = this.state;
    return (
      <div>
        <form className="loginCss" onSubmit={this.submitHandler}>
          <h1>Login</h1>
          <p className="User">Username</p>
          <input
            className="User"
            type="text"
            name="username"
            onChange={this.changeHandler}
          />
          {errors["username"] && (
            <div className="alert alert-danger">{errors["username"]}</div>
          )}
          <p className="Pass">Password</p>
          <input
            className="Pass"
            type="password"
            name="password"
            onChange={this.changeHandler}
          />
          {errors["password"] && (
            <div className="alert alert-danger">{errors["password"]}</div>
          )}
          <button className="btn-info btn-lg mt-5">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
