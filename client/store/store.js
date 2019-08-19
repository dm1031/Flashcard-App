import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import flashcard from './flashcard/reducer'
import session from './session/reducer'
import sessionCard from './sessionCard/reducer'
import user from './user/reducer'

const logger = createLogger({
  collapsed: true
})

const store = createStore(
  combineReducers({ flashcard, session, sessionCard, user }),
  applyMiddleware(thunk, logger)
)

export default store
