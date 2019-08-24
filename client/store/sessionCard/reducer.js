import { ADD_SESSION_CARD, UPDATE_SESSION_CARD } from './action'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_SESSION_CARD:
      return [...state, action.sessionCard]
    case UPDATE_SESSION_CARD:
      return [
        ...state.filter(c => c.id !== action.sessionCard.id),
        action.sessionCard
      ]
    default:
      return state
  }
}
