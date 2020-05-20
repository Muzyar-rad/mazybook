import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatar from "../media/avatar.png";
import "../css/addPost.css";

class AddPost extends Component {
  state = { text: "", postImage: null };

  changeHandler = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  fileSelectedHandler = event => {
    this.setState({ postImage: event.target.files[0] });
  };
  submitHandler = async event => {
    event.preventDefault();
    let { postImage, text } = this.state;
    const user = this.props.user;
    const fd = new FormData();
    if (user) fd.append("userid", user.userid);
    else new Error("User is not logged in");
    if (postImage != null) fd.append("postImage", postImage, postImage.name);
    fd.append("text", text);
    if (postImage === null && text === "") return;
    await this.props.addPost(fd);
    this.setState({ text: "", postImage: null });
    window.location = "/home";
  };
  render() {
    return (
      <div className="addpost">
        <div className="userFlex">
          <img alt="Profile pic" src={Avatar} />
          <p className="user">
            <Link to={"/profile"}> {this.props.user.name}</Link>
          </p>
        </div>
        <form className="css" onSubmit={this.submitHandler}>
          <textarea
            className="css"
            name="text"
            placeholder="Share your thoughts ..."
            onChange={this.changeHandler}
          ></textarea>
          <div className="flexRow">
            <i
              className="fa fa-upload"
              onClick={() => this.fileInput.click()}
            ></i>
            <div className="selected">
              {this.state.postImage !== null ? "Selected!" : null}
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileSelectedHandler}
              ref={fileInput => (this.fileInput = fileInput)}
            />
          </div>
          <button className="css">Post</button>
        </form>
      </div>
    );
  }
}

export default AddPost;
