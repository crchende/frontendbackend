import { createStore, applyMiddleware } from 'redux'
//import { configureStore } from '@reduxjs/toolkit'
import reduxPromise from 'redux-promise-middleware'
import reduxLogger from 'redux-logger'
import rootReducer from './reducers'

const middleware = [reduxPromise, reduxLogger]

export default createStore(rootReducer, applyMiddleware(...middleware))
//export default configureStore(rootReducer, applyMiddleware(...middleware))