import { combineReducers } from 'redux'
import projectReducer from './project-reducer'
import taskReducer from './task-reducer'
import userReducer from './user-reducer'
import userSuggestionReducer from './user-suggestion-reducer'
import taskCommentReducer from './taskcomment-reducer'
import usersReducer from "./users-reducer"

const rootReducer = combineReducers({
  project: projectReducer,
  task: taskReducer,
  taskcomment: taskCommentReducer,
  user: userReducer,
  userSuggestion: userSuggestionReducer,
  users: usersReducer
})

export default rootReducer