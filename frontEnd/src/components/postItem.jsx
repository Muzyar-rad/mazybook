import React, { Component } from "react";
import {
  getComments,
  saveComment,
  deleteComment
} from "../services/commentService";
import Avatar from "../media/avatar.png";
import AddComment from "./addComment";
import Comments from "./comments";
import moment from "moment";
import "../css/postItem.css";

class PostItem extends Component {
  state = { comments: [] };

  async componentDidMount() {
    const res = await getComments();
    const allComments = res.data;
    const comments = allComments.filter(
      comment => comment.postid === this.props.post.postid
    );
    this.setState({ comments });
  }

  addComment = async comment => {
    try {
      await saveComment(comment);
    } catch (ex) {
      console.log(ex);
    }
    window.location = "/home";
  };

  delComment = async cid => {
    const originalComments = this.state.comments;
    const comments = originalComments.filter(
      comment => comment.commentid !== cid
    );
    this.setState({
      comments
    });
    try {
      await deleteComment(cid);
    } catch (ex) {
      if (ex.response && ex.response.status === 403)
        this.setState({ comments: originalComments });
      window.location = "/home";
    }
  };
  convertToDate(time) {
    return moment(time).format("MMMM Do YYYY, h:mm:ss a");
  }

  fullPostImagePath(imageUrl) {
    return process.env.REACT_APP_IMAGE_URI + `${imageUrl}`;
  }
  render() {
    const { postid, postImage, text, createdAt, name } = this.props.post;
    const userName = this.props.user.name;
    let imagePath = null;
    if (postImage != null) imagePath = this.fullPostImagePath(postImage);
    const postTimestamp = this.convertToDate(createdAt);
    return (
      <div className="post">
        <div className="User">
          <img alt="Profile pic" src={Avatar} />
          <div className="flex">
            <p className="user">{name}</p>
            <p className="timeStamp">{postTimestamp}</p>
          </div>
          {userName === name && (
            <i
              className="fa fa-trash"
              onClick={() => this.props.delPost(postid)}
            ></i>
          )}
        </div>
        <div className="data">
          <p className="text">{text}</p>
          {imagePath === null ? null : <img src={imagePath} alt="" />}
        </div>
        <AddComment
          user={this.props.user}
          postid={postid}
          addComment={this.addComment}
        />
        <Comments comments={this.state.comments} delComment={this.delComment} />
      </div>
    );
  }
}

export default PostItem;
