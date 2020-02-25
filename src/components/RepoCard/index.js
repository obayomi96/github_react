import React from 'react';
import PropTypes from 'prop-types';

import './RepoCard.css';

const RepoCard = (props) => {
  const { owner, name, onClick } = props;
  console.log('owner', owner)

  return (
    <div className="repoCard-div">
      <h3>Repo owner: {owner}</h3>
      <h3>Repo name: {name}</h3>
      <button onClick={onClick}>View readme</button>
    </div>
  )
}

RepoCard.propTypes = {
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default RepoCard;
