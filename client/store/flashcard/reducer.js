import { GET_FLASHCARDS, GET_SINGLE_FLASHCARD } from './action'

export default (state = [], action) => {
  switch (action.type) {
    case GET_FLASHCARDS:
      return action.flashcards
    case GET_SINGLE_FLASHCARD:
      return action.currentFlashcard
    default:
      return state
  }
}
