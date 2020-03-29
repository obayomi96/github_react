import axios from "axios";

import {
  GET_USER_PROFILE,
  GET_USER_REPOS,
  GET_REPO_README,
} from "./types";

const API_URL = 'https://api.github.com';
const client_id = '57cd7f12ba532256fd43';
const client_secret = '149e945a07ea5c17e72f62129cbb07284055242c';

export const fetchUserProfile = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/users/${username}?client_id=${client_id}&client_secret=${client_secret}`
    );
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
      `${API_URL}/users/${username}/repos?client_id=${client_id}&client_secret=${client_secret}`
    );
    if (response.status === 200) {
      return dispatch({
        type: GET_USER_REPOS,
        payload: response.data
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

export const fetchRepoReadme = (owner, repo) => async (dispatch) => {
  try {
    const path = 'README.md';
    const response = await axios.get(
      `${API_URL}/repos/${owner}/${repo}/contents/${path}?client_id=${client_id}&client_secret=${client_secret}`
    );
    if (response.status === 200) {
      return dispatch({
        type: GET_REPO_README,
        payload: response.data
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};
