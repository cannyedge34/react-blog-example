import React, { Component } from 'react';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    body: '',
    author: 'Juan',
    submitted: false
  };

  componentDidMount() {
    //if unauth => this.props.history.replace('/posts')
    console.log(this.props);
  }

  postDataHandler = () => {
    const post = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author
    };
    const req = async () => {
      const res = await axios.post('/posts', post);
      // this.setState({
      //   loadedPost: res.data
      // });
      // this.setState({
      //   submitted: true
      // });
      // this.props.history.push('/posts');
      this.props.history.replace('/posts');
      console.log(res);
    };
    req();
  };

  render() {
    let redirect =
      this.state.submitted === true ? <Redirect to="/posts" /> : null;
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.body}
          onChange={event => this.setState({ body: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Juan">Juan</option>
          <option value="Peter">Peter</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
