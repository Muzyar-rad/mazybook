import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import * as userService from "../services/registerUser";
import "../css/registerForm.css";

class RegisterForm extends Component {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .required(),
    name: Joi.string().required()
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

  submitHandler = async event => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
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
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/home" />;
    const { errors } = this.state;
    return (
      <form className="registerForm" onSubmit={this.submitHandler}>
        <h1>Sign Up</h1>
        <p className="userName">Email</p>
        <input
          className="userName"
          type="text"
          name="username"
          onChange={this.changeHandler}
        />
        <div className="errorUsername">
          {errors["username"] && (
            <div className="alert alert-danger">{errors["username"]}</div>
          )}
        </div>

        <p className="Pass">Password</p>
        <input
          className="Pass"
          type="password"
          name="password"
          onChange={this.changeHandler}
        />
        <div className="errorPassword">
          {errors["password"] && (
            <div className="alert alert-danger">{errors["password"]}</div>
          )}
        </div>
        <p className="name">Name</p>
        <input
          className="name"
          type="text"
          name="name"
          onChange={this.changeHandler}
        />
        <div className="errorName">
          {errors["name"] && (
            <div className="alert alert-danger">{errors["name"]}</div>
          )}
        </div>
        <button className="btn-info btn-lg mt-5">Register</button>
      </form>
    );
  }
}

export default RegisterForm;
