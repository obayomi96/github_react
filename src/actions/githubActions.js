import axios from "axios";

import {
  GET_USER_PROFILE,
  GET_USER_REPOS,
  GET_REPO_README,
} from "./types";

const API_URL = process.env.REACT_APP_API_URL;
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export const fetchUserProfile = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/users/${username}?client_id=${client_id}&client_secret=${client_secret}`
    );
    if (response.status === 200) {
      return dispatch({
        type: GET_USER_PROFILE,
        payload: response.data
      });
    }
  } catch (err) {
    if (err) throw err;
  }
};

export const fetchUserRepos = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/users/${username}/repos?per_page=100?client_id=${client_id}&client_secret=${client_secret}`
    );
    if (response.status === 200) {
      return dispatch({
        type: GET_USER_REPOS,
        payload: response.data
      });
    }
  } catch (err) {
    if (err) throw err;
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
    if (err) throw err;
  }
};
