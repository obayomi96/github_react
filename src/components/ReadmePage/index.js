import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import showdown from 'showdown';

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
  
    const repoReadmeMD = await getRepoReadme(owner, repo);
    const { content } = repoReadmeMD.payload;
    const contentInPlainText = window.atob(content)
    const converter = new showdown.Converter();
    const text = contentInPlainText;
    const html = converter.makeHtml(text)

    this.setState({
      readmeContent: html
    })
  }

  render() {
    const { readmeContent } = this.state;

    const createMarkup = () => {
      return {__html: readmeContent};
    }
    
    return (
      <div>
        <div>
          <Link to="/">
           <h3>back</h3>
          </Link>
         <h2 style={{textAlign: 'center'}}>Welcome to the readme file contents</h2>
        </div>
        <div dangerouslySetInnerHTML={createMarkup()}></div>
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

