import React from "react";
import PropTypes from "prop-types";

import "./RepoCard.css";

const RepoCard = props => {
  const { name, onClick } = props;

  return (
    <div className="repoCard-div">
      <div className="repo-info">
        <h3>{name}</h3>
        <div>
          <button className="view-btn" onClick={onClick}>View readme</button>
        </div>
      </div>
    </div>
  );
};

RepoCard.propTypes = {
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default RepoCard;
