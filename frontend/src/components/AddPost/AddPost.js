import React from "react";
import './AddPost.scss';
import Config from '../../config';
import PropTypes from 'prop-types';

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tag: '',
            description: '',
            errors: {}
        };

        this.addNewPost = this.addNewPost.bind(this);
    }

    addNewPost(e) {
        e.preventDefault();

        fetch(Config.apiDomainUrl + '/posts', {
            method: 'POST',
            headers: Config.defaultHeaders,
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(result => {
                if (Array.isArray(result) && result[0].hasOwnProperty('field') && result[0].hasOwnProperty('message')) {
                    let errors = {};
                    for (let error of result) {
                        errors[error.field] = error.message;
                    }

                    this.setState({
                        errors: errors
                    });
                } else {
                    this.props.addNewPost(result);
                    this.setState({
                        title: '',
                        tag: '',
                        description: '',
                        errors: {}
                    });
                }
            });

    }

    render() {
        return (
            <div className="add-post-container">
                <form className="add-post-form" onSubmit={this.addNewPost}>
                    <div className="form-component grid-input">
                        <input value={this.state.title} onChange={e => this.setState({title: e.target.value})} className="form-input form-input-text" type="text" placeholder="Enter title..." />
                        { (this.state.errors && this.state.errors.hasOwnProperty('title')) ? <span>{this.state.errors['title']}</span> : '' }
                    </div>

                    <div className="form-component grid-input">
                        <input value={this.state.tag} onChange={e => this.setState({tag: e.target.value})} className="form-input form-input-text" type="text" placeholder="Enter tag..." />
                        { (this.state.errors && this.state.errors.hasOwnProperty('tag')) ? <span>{this.state.errors['tag']}</span> : '' }
                    </div>

                    <div className="form-component grid-description">
                        <textarea value={this.state.description} onChange={e => this.setState({description: e.target.value})} className="form-input form-input-textarea" placeholder="Enter description..." />
                        { (this.state.errors && this.state.errors.hasOwnProperty('description')) ? <span>{this.state.errors['description']}</span> : '' }
                    </div>

                    <div className="form-component">
                        <button className="form-input form-input-submit" type="submit">Add</button>
                    </div>
                </form>
            </div>
        )
    }
}

AddPost.propTypes = {
    addNewPost: PropTypes.func.isRequired
};

export default AddPost;