import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserProfile, fetchUserRepos } from './actions/githubActions';

class  App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      githubUser: {},
      userRepos: [],
    };
  }

  componentDidMount = async () => {
    const { getUserProfile, getUserRepos } = this.props;
    const user = await getUserProfile();
    const repos = await getUserRepos();
    console.log('app user profile', user);
    console.log('app user repos', repos);
  }

  render () {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.githubUser.userProfile,
  repos: state.githubUser.userRepos,
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: () => dispatch(fetchUserProfile()),
  getUserRepos: () => dispatch(fetchUserRepos())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
