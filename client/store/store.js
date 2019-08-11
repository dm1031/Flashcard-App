import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import flashcards from './flashcards/reducer'

const logger = createLogger({
  collapsed: true
})

const store = createStore(
  combineReducers({ flashcards }),
  applyMiddleware(thunk, logger)
)

export default store
