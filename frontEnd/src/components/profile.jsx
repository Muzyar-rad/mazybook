import React, { Component } from "react";
import * as userService from "../services/registerUser";
import Avatar from "../media/avatar.png";
import moment from "moment";
import { getCurrentUser, logout } from "./../services/authService";
import { getUser } from "./../services/registerUser";
import "../css/profile.css";

class Profile extends Component {
  state = { user: {} };

  convertToDate(time) {
    return moment(time).format("MMMM Do YYYY, h:mm:ss a");
  }

  async showUserOnProfile() {
    const { data: user } = await getUser();
    const createdat = this.convertToDate(user.createdat);
    delete user["createdat"];
    user.createdat = createdat;
    return user;
  }

  deleteUser = () => {
    const user = getCurrentUser();
    const userid = user.userid;
    userService.deleteUser(userid);
    logout();
    window.location = "/";
  };

  async componentDidMount() {
    const user = await this.showUserOnProfile();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="card mx-auto w-75 box">
        <div className="d-flex flex-row">
          <div className=" profile mt-2 ml-3">Profile</div>
          {/* <i className="fa fa-trash delete" onClick={this.deleteUser}></i> */}
        </div>
        <div className="d-flex flex-row">
          <img className="css" alt="Profile pic" src={Avatar} />
          <div className="d-flex flex-column justify-content-center">
            <div className="username">{user.name}</div>
            <div className="email">{user.email}</div>
          </div>
        </div>
        <div className="createdAt ml-4 mt-3">Created at {user.createdat}</div>
      </div>
    );
  }
}

export default Profile;
