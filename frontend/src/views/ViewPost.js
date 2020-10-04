import React from "react";
import Config from "../config";

class ViewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            errors: {},
            isUpdated: false
        };
        let { match: {params} } = props;
        this.params = params;
        this.timeOut = null;

        this.fetchData = this.fetchData.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location !== prevProps.location) {
            this.fetchData();
        }
    }

    fetchData() {
        fetch(Config.apiDomainUrl + '/posts/' + this.params.id, {
            method: 'GET',
            headers: Config.defaultHeaders
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    post: result
                });
            });
    }

    async updatePost() {
        const response = await fetch(Config.apiDomainUrl + '/posts/' + this.params.id, {
            method: 'PUT',
            headers: Config.defaultHeaders,
            body: JSON.stringify(this.state.post)
        });

        const result = await response.json();

        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }

        if (Array.isArray(result) && result[0].hasOwnProperty('field') && result[0].hasOwnProperty('message')) {
            let errors = {};
            for (let error of result) {
                errors[error.field] = error.message;
            }
            this.setState({errors});
        } else {
            this.timeOut = setTimeout(() => {
                this.setState({isUpdated: false});
            }, 1000);
            this.setState({
                errors: {},
                isUpdated: true
            });
        }
    }

    async deletePost() {
        const response = await fetch(Config.apiDomainUrl + '/posts/' + this.params.id, {
            method: 'DELETE',
            headers: Config.defaultHeaders,
            body: JSON.stringify(this.state.post)
        });

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="view-post-container">
                <h1>This post</h1>
                { this.state.isUpdated ? <div className="form-alert form-alert-success">Successfully updated</div> : '' }
                <div className="view-post">
                    <div className="form-component">
                        <input value={this.state.post.title} onChange={e => this.setState({ post: {...this.state.post, title: e.target.value} })} className="form-input form-input-text" type="text" placeholder="Enter title..." />
                        { (this.state.errors && this.state.errors.hasOwnProperty('title')) ? <span>{this.state.errors['title']}</span> : '' }
                    </div>

                    <div className="form-component">
                        <input value={this.state.post.tag} onChange={e => this.setState({ post: {...this.state.post, tag: e.target.value} })} className="form-input form-input-text" type="text" placeholder="Enter tag..." />
                        { (this.state.errors && this.state.errors.hasOwnProperty('tag')) ? <span>{this.state.errors['tag']}</span> : '' }
                    </div>

                    <div className="form-component">
                        <textarea value={this.state.post.description} onChange={e => this.setState({ post: {...this.state.post, description: e.target.value} })} className="form-input form-input-textarea" placeholder="Enter description..." />
                        { (this.state.errors && this.state.errors.hasOwnProperty('description')) ? <span>{this.state.errors['description']}</span> : '' }
                    </div>

                    <div className="flex-container">
                        <div className="form-component">
                            <button className="form-input form-input-submit" type="button" onClick={this.updatePost}>Update</button>
                        </div>

                        <div className="form-component">
                            <button style={{backgroundColor: 'red'}} className="form-input form-input-submit" type="button" onClick={this.deletePost}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewPost;