import React from "react";
import {Link} from "react-router-dom";
import './Post.scss';
import Config from '../../config';
import PropTypes from 'prop-types';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        };

        this.saveUpdates = this.saveUpdates.bind(this);
    }

    saveUpdates(e) {
        let body = {};
        Array.from(e.target.closest('.post').getElementsByClassName('editable')).forEach(field => {
            body[field.getAttribute('data-name')] = field.innerText;
        });

        fetch(Config.apiDomainUrl + '/posts/' + this.props.post.id, {
            method: 'PUT',
            headers: Config.defaultHeaders,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(result => {
                if (Array.isArray(result) && result[0].hasOwnProperty('field') && result[0].hasOwnProperty('message')) {
                    this.setState({
                        errors: result
                    });
                    console.log(this.state);
                }
            });
    }

    render() {
        const post = this.props.post;

        return (
            <div className="post">
                <div className="post-header">
                    <h2 contentEditable suppressContentEditableWarning className="editable" data-name="title" onBlur={this.saveUpdates} >{post.title}</h2>
                    <span>{new Date(post.created_at * 1000).toLocaleDateString()}</span>
                </div>
                <div className="tags">
                    <span contentEditable suppressContentEditableWarning className="editable" data-name="tag" onBlur={this.saveUpdates} >{post.tag}</span>
                </div>
                <div className="description">
                    <span>Description</span>
                    <p contentEditable suppressContentEditableWarning className="editable" data-name="description" onBlur={this.saveUpdates} >{post.description}</p>
                </div>

                <div className="post-bottom-panel">
                    <button className="post-control-btn post-delete" onClick={() => this.props.deletePost(post.id)}>&times;</button>
                    <Link className="post-control-btn post-info" to={'/post/' + post.id}>&rarr;</Link>
                </div>
                <div className="error-messages">
                    {Object.keys(this.state.errors).length ? this.state.errors.map(error => <span>{error.message}</span>) : ''}
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired
};

export default Post;