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
      <div className="profile">
        <div className="flexRow1">
          <h1>Profile</h1>
          {/* <i className="fa fa-trash delete" onClick={this.deleteUser}></i> */}
        </div>
        <div className="flexRow2">
          <img alt="Profile pic" src={Avatar} width="70" height="70" />
          <div className="flexColumn">
            <p className="name">{user.name}</p>
            <p className="email">{user.email}</p>
          </div>
        </div>
        <p className="createdat">Created at {user.createdat}</p>
      </div>
    );
  }
}

export default Profile;
