import React, { Component } from 'react';
// import RepoCard from '../RepoCard';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRepoReadme } from '../../actions/githubActions';

class ReadmePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      readmeContent: '',
    }
  }

  componentDidMount = async () => {
    const {
      getRepoReadme,
      match: {
        params: {
          owner,
          repo,
        }
      }
    } = this.props;
  
    const repoReadmeMD = await getRepoReadme(owner, repo)
    console.log('btoa', typeof(repoReadmeMD.payload.content))
    const { content } = repoReadmeMD.payload;
    // const domparser = new DOMParser();
    // const contents = domparser.parseFromString(atob(content), 'text/html')

    // console.log('con', atob(contents))

    return this.setState({
      readmeContent: atob(content)
    })
  }

  render() {
    const { readmeContent } = this.state;
    // const domparser = new DOMParser();
    // const contents = domparser.parseFromString(readmeContent, 'text/html')
    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Welcome to the readme file contents</h2>
        <div>
          {readmeContent}
        </div>
      </div>
    );
  }
}

ReadmePage.propTypes = {
  readMe: PropTypes.string,
  getRepoReadme: PropTypes.func,
}

const mapStateToProps = state => ({
  readme: state.githubUser.repoReadme,
});

const mapDispatchToProps = (dispatch) => ({
  getRepoReadme: (owner, repo) => dispatch(fetchRepoReadme(owner, repo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadmePage);

