// receive actions and dispatch
// state
import { compose, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'
// configure store replace create store

import { rootReducer } from './root-reducer'
// before action gets dispatched to reducer => middleware
const middleWares = [logger]
// pass multiple middleware functions
const composeEnhancers = compose(applyMiddleware(...middleWares))

export const store = configureStore(rootReducer, undefined, composeEnhancers)

