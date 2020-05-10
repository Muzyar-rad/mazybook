import React, { Component } from "react";
import "../css/addComment.css";

class AddComment extends Component {
  state = { textComment: "" };

  changeHandler = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  submitHandler = event => {
    event.preventDefault();
    const { userid } = this.props.user;
    const postid = this.props.postid;
    const { textComment } = this.state;
    if (textComment === "") return;
    const comment = { userid, textComment, postid };
    this.props.addComment(comment);
    this.setState({ textComment: "" });
  };
  render() {
    return (
      <form className="addComment" onSubmit={this.submitHandler}>
        <textarea
          name="textComment"
          placeholder="Leave a comment ..."
          onChange={this.changeHandler}
          wrap="hard"
        ></textarea>
        <button>add</button>
      </form>
    );
  }
}

export default AddComment;
