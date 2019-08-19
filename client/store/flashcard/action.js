import axios from 'axios'

// ------ action
export const GET_FLASHCARDS = 'GET_FLASHCARDS'
export const GET_SINGLE_FLASHCARD = 'GET_SINGLE_FLASHCARD'

// ------ action creators
const getFlashcards = flashcards => {
  return {
    type: GET_FLASHCARDS,
    flashcards
  }
}

const getSingleFlashcard = currentFlashcard => {
  return {
    type: GET_SINGLE_FLASHCARD,
    currentFlashcard
  }
}

// ------ thunks
export const getFlashcardsThunk = () => {
  return dispatch => {
    return axios
      .get('/flashcards')
      .then(res => res.data)
      .then(flashcards => dispatch(getFlashcards(flashcards)))
  }
}

export const getSingleFlashcardThunk = result => {
  return dispatch => {
    return axios
      .get(`/flashcard/${result}`)
      .then(res => res.data)
      .then(currentFlashcard => dispatch(getSingleFlashcard(currentFlashcard)))
  }
}
