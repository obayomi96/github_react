import React, { Component } from 'react';
import showdown from 'showdown';
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
    console.log('btoa', repoReadmeMD.payload.content)
    const { content } = repoReadmeMD.payload;

    console.log('coon', content)
    const stringy = window.atob(content)

    const converter = new showdown.Converter();
    const text = stringy;
    const html = converter.makeHtml(text)

    // const showDown = 
    console.log('hshhd', html);

    // const domparser = new DOMParser();
    // const contents = domparser.parseFromString(stringy, 'text/html');


    // console.log('con', atob(content))

    return this.setState({
      readmeContent: html
    })
  }

  //   createMarkup = () => {
  //   return {__html: 'First &middot; Second'};
  // }
  
  //   MyComponent = () => {
  //   return <div dangerouslySetInnerHTML={createMarkup()} />;
  // }

  render() {
    const { readmeContent } = this.state;

    const createMarkup = () => {
      return {__html: readmeContent};
    }
    
    //   MyComponent = () => {
    //   return <div dangerouslySetInnerHTML={createMarkup()} />;
    // }


    // const domparser = new DOMParser();
    // const contents = domparser.parseFromString(readmeContent, 'text/html')
    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Welcome to the readme file contents</h2>
        <div dangerouslySetInnerHTML={createMarkup()}>
          {/* {readmeContent} */}
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

