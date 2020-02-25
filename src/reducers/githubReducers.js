import {
  GET_USER_PROFILE,
  GET_USER_REPOS,
  GET_REPO_README
} from '../actions/types';

export const initialState = {
  userProfile: {},
  userRepos: [],
  repoReadme: {},
}

export const githubReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case GET_USER_REPOS:
      return {
        ...state,
        userRepos: action.payload,
      };
    case GET_REPO_README:
      return {
        ...state,
        repoReadme: action.payload,
      }
    default:
      return state;
  }
};
