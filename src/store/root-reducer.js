import { combineReducers } from 'redux'
import { userReducer } from './user/user.reducer'
// create reducer func

export const rootReducer = combineReducers({
  user: userReducer
});