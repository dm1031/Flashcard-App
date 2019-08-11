import axios from 'axios'

// ------ action
export const GET_FLASHCARDS = 'GET_FLASHCARDS'

// ------ action creator
const getFlashcards = flashcards => {
  return {
    type: GET_FLASHCARDS,
    flashcards
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
