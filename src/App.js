import React, { Component } from 'react';
import './App.css';

// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchUserProfile,
  fetchUserRepos,
  fetchRepoReadme,
} from './actions/githubActions';

class  App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      githubUser: {},
      userRepos: [],
      repoReadmeFile: {},
    };
  }

  viewReadme = async (owner, repo) => {
    const { getRepoReadme } = this.props;
    const repoReadmeMD = await getRepoReadme(owner, repo)
    console.log('readme', repoReadmeMD.payload);
    return this.setState({
      repoReadmeFile: repoReadmeMD.payload
    })
  }

  handleChange = async (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = this.state;
    console.log('the usr', username);
    const { getUserProfile, getUserRepos } = this.props;
    const user = await getUserProfile(username);
    const repos = await getUserRepos(username);
    if (user) {
      this.setState({
        githubUser: user.payload,
        userRepos: repos.payload,
        username: '',
      })
    }
  }

  render () {

    const { username, githubUser, userRepos, repoReadmeFile } = this.state;

    console.log('redme', repoReadmeFile)

    const repositories = userRepos.map((repo) => {
      return (
        <div key={repo.id}>
          <p>Name: {repo.name} </p>
          <div
            onClick={() => this.viewReadme(repo.owner.login, repo.name)}
          >
            View readme
          </div>
        </div>
      )
    })
    
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Search Username..."
                onChange={this.handleChange}
                />
                <input
                  type="submit"
                  name="submit"
                  onSubmit={this.handleSubmit}
                />
            </form>
          </div>
        </header>
          {
            githubUser.name ? 
            <div>
              <div className="github-user">
                <h3>Full Name: {githubUser.name}</h3> <br/>
                <div>
                  repositories <br/>
                  {repositories}
                </div>
              </div>
            </div> : ''
          }
          {
            repoReadmeFile.name ?
            <div>
              <h1>README.md file</h1>
              {repoReadmeFile.name}
            </div> : ''
          }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.githubUser.userProfile,
  repos: state.githubUser.userRepos,
  readme: state.githubUser.repoReadme,
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (username) => dispatch(fetchUserProfile(username)),
  getUserRepos: (username) => dispatch(fetchUserRepos(username)),
  getRepoReadme: (owner, repo) => dispatch(fetchRepoReadme(owner, repo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
