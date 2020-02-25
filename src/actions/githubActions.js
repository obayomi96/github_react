import axios from "axios";

import {
  GET_USER_PROFILE,
  GET_USER_REPOS,
  GET_REPO_README,
} from "./types";

export const fetchUserProfile = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=57cd7f12ba532256fd43&client_secret=149e945a07ea5c17e72f62129cbb07284055242c`
    );
    console.log("res", response);
    if (response.status = 200) {
      return dispatch({
        type: GET_USER_PROFILE,
        payload: response.data
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

export const fetchUserRepos = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?client_id=57cd7f12ba532256fd43&client_secret=149e945a07ea5c17e72f62129cbb07284055242c`
    );
    console.log("repo res", response);
    if (response.status === 200) {
      return dispatch({
        type: GET_USER_REPOS,
        payload: response.data
      });
    }
  } catch (err) {
    console.log("repo err", err);
  }
};

export const fetchRepoReadme = (owner, repo) => async (dispatch) => {
  try {
    const path = 'README.md';
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?client_id=57cd7f12ba532256fd43&client_secret=149e945a07ea5c17e72f62129cbb07284055242c`
    );
    console.log("repo readme", response);
    if (response.status === 200) {
      return dispatch({
        type: GET_REPO_README,
        payload: response.data
      });
    }
  } catch (err) {
    console.log("repo err", err);
  }
};
