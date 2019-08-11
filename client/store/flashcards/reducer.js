import { GET_FLASHCARDS } from './action'

export default (state = [], action) => {
  switch (action.type) {
    case GET_FLASHCARDS:
      return action.flashcards
    default:
      return state
  }
}
