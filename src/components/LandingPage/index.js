import React, { Component } from 'react';
import swal from '@sweetalert/with-react';
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
    if (user && username !== '') {
      this.setState({
        githubUser: user.payload,
        userRepos: repos.payload,
        username: '',
      });
    } else {
      swal({
        text: 'Input a valid github username',
        icon: 'error',
        button: true,
        timer: 3000,
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
          <div className="search-div">
            <form onSubmit={this.handleSubmit}>
              <input
                className="search-bar"
                type="text"
                name="username"
                value={username}
                placeholder="Enter a username..."
                onChange={this.handleChange}
                />
                <input
                  className="submit-btn"
                  type="submit"
                  name="submit"
                  onSubmit={this.handleSubmit}
                />
            </form>
          </div>
        </header>
          {
            githubUser.name ? 
            <div className="github-user">
              <div className="owner-div">
                <div className="image-div">
                <img className="owner-img" src={githubUser.avatar_url} alt="User avatar" />
                </div>
                <h3 className="owner-name">{githubUser.name}</h3> <br/>
              </div>
                <h3>REPOSITORIES</h3>
              <div className="repos-div">
                {repositories}
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
