import React, { Component } from "react";
import CommentItem from "./commentItem";

class Comments extends Component {
  state = {};

  render() {
    return this.props.comments.map(comment => (
      <CommentItem
        key={comment.commentid}
        comment={comment}
        delComment={this.props.delComment}
      />
    ));
  }
}

export default Comments;
