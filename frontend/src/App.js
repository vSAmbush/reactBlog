import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import ViewPosts from "./views/ViewPosts";
import ViewPost from "./views/ViewPost";

class App extends React.Component {
  render() {
    return (
        <div className="App">
            <Router>
                <header className="App-header">
                    <Link className="App-link" to="/">Posts</Link>
                </header>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={ViewPosts} />
                        <Route path="/post/:id" component={ViewPost} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
  }
}

export default App;
