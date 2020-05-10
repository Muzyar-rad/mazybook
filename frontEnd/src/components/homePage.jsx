import React, { Component } from "react";
import AddPost from "./addPost";
import Posts from "./posts";
import { getPosts, savePost, deletePost } from "../services/postService";

class HomePage extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const res = await getPosts();
    const posts = res.data;
    this.setState({ posts });
  }

  addPost = async fileData => {
    try {
      const res = await savePost(fileData);
      this.setState({ posts: [res.data, ...this.state.posts] });
    } catch (ex) {
      console.log(ex);
    }
  };

  delPost = async pid => {
    const originalPosts = this.state.posts;
    const posts = originalPosts.filter(post => post.postid !== pid);
    this.setState({
      posts
    });
    try {
      await deletePost(pid);
    } catch (ex) {
      if (ex.response && ex.response.status === 403)
        this.setState({ posts: originalPosts });
      window.location = "/home";
    }
  };
  render() {
    const { user } = this.props;
    if (user == null) window.location = "/";

    return (
      <div>
        <AddPost user={user} addPost={this.addPost} />
        <Posts posts={this.state.posts} delPost={this.delPost} user={user} />
      </div>
    );
  }
}

export default HomePage;
