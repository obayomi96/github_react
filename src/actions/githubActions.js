import axios from "axios";

import {
  GET_USER_PROFILE,
  GET_USER_REPOS,
  GET_REPO_README,
} from "./types";

const API_URL = process.env.API_URL;
const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

console.log('sss', client_id);

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
