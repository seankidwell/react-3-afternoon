import React, { Component } from "react";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import axios from "axios";
import Post from "./Post/Post.js";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.baseUrl = "https://practiceapi.devmountain.com/api";
  }

  componentDidMount() {
    axios.get(`${this.baseUrl}/posts`).then(response => {
      this.setState({ posts: response.data });
    });
  }

  updatePost(id, text) {
    axios.put(`${this.baseUrl}/posts?id=${id}`, {text}).then(response => {
      this.setState({posts: response.data});
    })
  }

  deletePost(id) {
    axios.delete(`${this.baseUrl}/posts?id=${id}`).then(response => {
      this.setState({posts: response.data});
    })
  }

  createPost(text) {
    axios.post(`${this.baseUrl}/posts`, {text}).then(response => {
      this.setState({posts: response.data});
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost}/>
          {posts.map(post => <Post
          text={post.text}
          date={post.date}
          key={post.id}
          id={post.id}
          updatePostFn={this.updatePost}
          deletePostFn={this.deletePost}/>)}
        </section>
      </div>
    );
  }
}

export default App;
