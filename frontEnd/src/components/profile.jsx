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
      <div className="card mx-auto mt-5 w-75 box">
        <div className="row-fluid">
          <div className="">
            <h1>Profile</h1>
            {/* <i className="fa fa-trash delete" onClick={this.deleteUser}></i> */}
          </div>
          <div className="">
            <img alt="Profile pic" src={Avatar} width="70" height="70" />
            <div className="">
              <p className="">{user.name}</p>
              <p className="">{user.email}</p>
            </div>
          </div>
          <p className="">Created at {user.createdat}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
