import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };
  componentDidMount() {
    // axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
    //   this.setState({ posts: res.data });
    //   //console.log(res);
    // })

    //Error handler try/catch
    const req = async () => {
      try {
        const res = await axios.get('/posts');
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Juan'
          };
        });
        this.setState({ posts: updatedPosts });
      } catch (err) {
        //console.log(err);
        this.setState({ error: true });
      }
    };
    req();

    // const req = async () => {
    //   const res = await axios.get(
    //     'https://jsonplaceholder.typicode.com/postsss'
    //   );
    //   const posts = res.data.slice(0, 4);
    //   const updatedPosts = posts.map(post => {
    //     return {
    //       ...post,
    //       author: 'Juan'
    //     };
    //   });
    //   this.setState({ posts: updatedPosts });
    // };
    // req();
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
