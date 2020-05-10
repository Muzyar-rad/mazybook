import React, { Component } from "react";
import PostItem from "./postItem";
class Posts extends Component {
  state = {};
  render() {
    return this.props.posts.map(post => (
      <PostItem
        key={post.postid}
        post={post}
        delPost={this.props.delPost}
        user={this.props.user}
      />
    ));
  }
}

export default Posts;
