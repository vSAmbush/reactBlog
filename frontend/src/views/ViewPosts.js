import React from "react";
import Post from "../components/Post/Post";
import AddPost from "../components/AddPost/AddPost";
import ViewTypeSwitch from "../components/ViewTypeSwitch/ViewTypeSwitch";
import "./ViewPosts.css";
import Config from '../config';

class ViewPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            filterParams: [],
            currentViewType: 0
        };
        this.viewTypes = ['linear', 'grid'];
        this.filterConfig = {
            'date': value => {
                const sortType = +value ? [1, -1, 0] : [-1, 1, 0];

                return value ? [].concat(this.state.posts).sort((a, b) => {
                    if (a.created_at < b.created_at) {
                        return sortType[0];
                    }

                    if (a.created_at > b.created_at) {
                        return sortType[1];
                    }

                    return sortType[2];
                }) : this.state.posts;
            },
            'tag': value => value ? this.state.posts.filter(post => post.tag === value) : this.state.posts
        };

        this.deletePost = this.deletePost.bind(this);
        this.switchViewType = this.switchViewType.bind(this);
        this.dataFilter = this.dataFilter.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
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
        fetch(Config.apiDomainUrl + '/posts', {
            method: 'GET',
            headers: Config.defaultHeaders
        })
            .then(response => response.json())
            .then(posts => {
                if (posts.length !== this.state.posts.length) {
                    this.setState({
                        posts: posts
                    });
                }
            });
    }

    addNewPost(post) {
        this.state.posts.push(post);
        this.setState({
            posts: this.state.posts
        });
    }

    deletePost(id) {
        this.setState({
            posts: this.state.posts.filter((post)  => post.id !== id)
        });

        fetch(Config.apiDomainUrl + '/posts/' + id, {
            method: 'DELETE',
            headers: Config.defaultHeaders,
        });
    }

    switchViewType(e) {
        this.setState({
            currentViewType: this.viewTypes.indexOf(e.target.value)
        });
    }

    dataFilter(e) {
        const filter = e.target;

        this.setState({
            filterParams: [filter.getAttribute('data-filter'), filter.options[filter.selectedIndex].value]
        });
    }

    render() {
        let data = this.state.filterParams.length
            ? this.filterConfig[this.state.filterParams[0]](this.state.filterParams[1])
            : this.state.posts;

        return (
            <div>
                <h1>All Posts</h1>
                <AddPost addNewPost={this.addNewPost}/>
                <div className="filter-container">
                    <div className="form-component">
                        <select className="form-input form-input-select" data-filter="date" onChange={this.dataFilter}>
                            <option value="" defaultValue>Date</option>
                            <option value="0">Asc</option>
                            <option value="1">Desc</option>
                        </select>
                    </div>

                    <div className="form-component">
                        <select className="form-input form-input-select" data-filter="tag" onChange={this.dataFilter}>
                            <option value="" defaultValue>Tag</option>
                            { this.state.posts
                                .map(post => post.tag)
                                .filter(((value, index, self) => self.indexOf(value) === index))
                                .map((tag, index) => <option value={tag} key={index}>{tag}</option>)
                            }
                        </select>
                    </div>
                </div>
                <ViewTypeSwitch onClick={this.switchViewType} />
                <div className={this.viewTypes[this.state.currentViewType] + '-view-posts'}>
                    { data.map(post => <Post post={post} key={post.id} deletePost={this.deletePost} />) }
                </div>
            </div>
        );
    }
}

export default ViewPosts;