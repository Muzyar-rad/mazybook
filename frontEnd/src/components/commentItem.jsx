import React, { Component } from "react";
import Avatar from "../media/avatar.png";
import moment from "moment";
import "../css/commentItem.css";

class CommentItem extends Component {
  state = {};
  convertToDate(time) {
    return moment(time).format("MMMM Do YYYY, h:mm:ss a");
  }
  render() {
    const { textComment, createdAt, commentid, name } = this.props.comment;
    const commentTimestamp = this.convertToDate(createdAt);
    return (
      <div className="comment">
        <div className="flex">
          <img alt="Profile pic" src={Avatar} />{" "}
          <div className="holder">
            <div className="flexRow">
              <p className="user">{name}</p>
              <i
                className="fa fa-trash"
                onClick={() => this.props.delComment(commentid)}
              ></i>
            </div>
            <p className="text">{textComment}</p>
            <p className="commentDate">{commentTimestamp}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentItem;
