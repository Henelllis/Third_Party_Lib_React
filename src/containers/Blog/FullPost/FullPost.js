import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPosts: null,
    }
    componentDidMount(){
        console.log(this.props);
        if(this.props.match.params.id){
            if(!this.state.loadedPosts || ( this.state.loadedPosts && this.state.loadedPosts.id !== this.props.match.params.id)){

                axios.get('/posts/' + this.props.match.params.id)
                    .then(response =>{
                        this.setState({loadedPosts: response.data});
                    });
            }
        }
    }

    deletePostHandler = () =>{
        axios.delete('/posts/' + this.props.id)
            .then(response =>{
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id){
            post = <p style={{textAlign: 'center'}}>LOADING ... </p>;
        }
        if(this.state.loadedPosts) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPosts.title}</h1>
                    <p>{this.state.loadedPosts.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}       

export default FullPost;