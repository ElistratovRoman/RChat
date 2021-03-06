import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users'
import chat from './chat'


export default combineReducers({
  users,
  chat,
  routing: routerReducer
})
