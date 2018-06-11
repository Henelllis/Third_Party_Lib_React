import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Henry',
        submitted: false,
    }

    postDataHandler = () =>{
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('/posts', post)
            .then(reponse => {
                //console.log(reponse);
                this.props.history.replace('/posts/');
                //replace and push relate to history stack of site
                //this.setState({submitted:true})
            })
    }

    componentDidMount(){
        //If Inauth (alternative approach) this.props.history.replace('/posts/')
        console.log(this.props);
    }

    render () {

        let redirect = null;
        if(this.state.submitted){
            redirect = <Redirect to="/posts" />
        }

        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Henry</option>
                    <option value="Manu">Tyler</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;