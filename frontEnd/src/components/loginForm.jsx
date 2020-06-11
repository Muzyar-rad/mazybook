import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import "../css/loginForm.css";

class LoginForm extends Component {
  state = { data: { email: "", password: "" }, errors: {} };

  schema = {
    email: Joi.string().required(),
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

  submitDemo = async event => {
    event.preventDefault();
    await auth.login({ email: "demo@yahoo.com", password: "test1" });
    window.location = "/home";
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/home" />;
    const { errors } = this.state;
    return (
      <div>
        <form className="loginCss" onSubmit={this.submitHandler}>
          <h1>Login</h1>
          <p className="User">Email</p>
          <input
            className="User"
            type="text"
            name="email"
            onChange={this.changeHandler}
          />
          <div className="errorUser">
            {errors["email"] && (
              <div className="alert alert-danger">{errors["email"]}</div>
            )}
          </div>
          <p className="Pass">Password</p>
          <input
            className="Pass"
            type="password"
            name="password"
            onChange={this.changeHandler}
          />
          <div className="errorPass">
            {errors["password"] && (
              <div className="alert alert-danger">{errors["password"]}</div>
            )}
          </div>
          <div className="flexButton">
            <button className="btn-info btn-lg mt-5 mr-2">Login</button>
            <button
              className="btn-info btn-lg mt-5 ml-2"
              onClick={this.submitDemo}
            >
              Login as Demo
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
