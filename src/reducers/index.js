import { combineReducers } from 'redux';
import { githubReducer } from './githubReducers';

const rootReducers = combineReducers({
  githubUser: githubReducer
});

export default rootReducers;
