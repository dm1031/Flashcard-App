import axios from 'axios'

// ------ actions

export const ADD_SESSION_CARD = 'ADD_SESSION_CARD'

// ------ action creators

const addSessionCard = sessionCard => {
  return {
    type: ADD_SESSION_CARD,
    sessionCard
  }
}

// ------ thunks

export const addSessionCardThunk = data => {
  return dispatch => {
    return axios
      .post('/sessionCard', data)
      .then(res => res.data)
      .then(sessionCard => dispatch(addSessionCard(sessionCard)))
  }
}
