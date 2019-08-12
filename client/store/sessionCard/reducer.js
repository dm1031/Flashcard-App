import { ADD_SESSION_CARD } from './action'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_SESSION_CARD:
      return [...state, action.sessionCard]
    default:
      return state
  }
}
