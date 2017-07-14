import { combineReducers } from 'redux';
import teams from './team-reducer';

const store = combineReducers({ teams });

export default store;
