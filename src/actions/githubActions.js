import { GET_USER_PROFILE, GET_USER_REPOS } from "./types";
import axios from "axios";

export const fetchUserProfile = () => async dispatch => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/obayomi96?client_id=57cd7f12ba532256fd43&client_secret=149e945a07ea5c17e72f62129cbb07284055242c`
    );
    console.log("res", response);
    if (response.status = 200) {
      return dispatch({
        type: GET_USER_PROFILE,
        payload: response
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

export const fetchUserRepos = () => async dispatch => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/obayomi96/repos?client_id=57cd7f12ba532256fd43&client_secret=149e945a07ea5c17e72f62129cbb07284055242c`
    );
    console.log("repo res", response);
    if (response.status === 200) {
      return dispatch({
        type: GET_USER_REPOS,
        payload: response
      });
    }
  } catch (err) {
    console.log("repo err", err);
  }
};
