import React, { Component } from 'react';
import './LandingPage.css';

import RepoCard from '../RepoCard';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchUserProfile,
  fetchUserRepos,
  fetchRepoReadme,
} from '../../actions/githubActions';

class  LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      githubUser: {},
      userRepos: [],
      repoReadmeFile: {},
    };
  }

  componentDidMount = () => {
    const { user, repos } = this.props;
    this.setState({
      githubUser: user,
      userRepos: repos,
    })
  }

  viewReadme = (owner, repo) => {
    const { history } = this.props;
    history.push(`readme/${owner}/${repo}`)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = this.state;
    const { getUserProfile, getUserRepos } = this.props;
    const user = await getUserProfile(username);
    const repos = await getUserRepos(username);
    if (user) {
      this.setState({
        githubUser: user.payload,
        userRepos: repos.payload,
        username: '',
      });
    }
  }

  render () {

    const { username, githubUser, userRepos } = this.state;

    const repositories = userRepos ? userRepos.map((repo) => {
      return (
        <RepoCard
          key={repo.id}
          owner={repo.owner.login}
          name={repo.name}
          onClick={() => this.viewReadme(repo.owner.login, repo.name)}
        />
      )
    }) : ''
    
    return (
      <div>
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
                <img src={githubUser.avatar_url} height="60px" width="60px" alt="User avatar" />
                <h3>Full Name: {githubUser.name}</h3> <br/>
                <div>
                  repositories <br/>
                  {repositories}
                </div>
              </div>
            </div> : ''
          }
      </div>
    );
  }
}

LandingPage.propTypes = {
  user: PropTypes.shape(),
  repos: PropTypes.shape(),
  readMe: PropTypes.shape(),
  getUserProfile: PropTypes.func,
  getUserRepos: PropTypes.func,
  getRepoReadme: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
