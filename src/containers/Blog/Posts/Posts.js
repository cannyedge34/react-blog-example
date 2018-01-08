import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
//import { Link } from 'react-router-dom';
import axios from '../../../axios';
import { Route } from 'react-router-dom';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
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
        console.log(err);
        //this.setState({ error: true });
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

  // postSelectedHandler = id => {
  //   this.setState({ selectedPostId: id });
  // };
  postSelectedHandler = id => {
    // this.props.history.push({
    //   pathname: '/posts/' + id
    // });
    this.props.history.push('/posts/' + id);
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link key={post.id} to={`/posts/${post.id}`}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + '/:id'}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
