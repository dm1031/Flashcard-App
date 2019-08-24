import axios from 'axios'

// ------ actions

export const ADD_SESSION_CARD = 'ADD_SESSION_CARD'
export const UPDATE_SESSION_CARD = 'UPDATE_SESSION_CARD'

// ------ action creators

const addSessionCard = sessionCard => {
  return {
    type: ADD_SESSION_CARD,
    sessionCard
  }
}

const updateSessionCard = sessionCard => {
  return {
    type: UPDATE_SESSION_CARD,
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

export const updateSessionCardThunk = (sessionCardId, result) => {
  return dispatch => {
    return axios
      .put(`/sessionCard/${sessionCardId}`, { result })
      .then(res => res.data)
      .then(sessionCard => dispatch(updateSessionCard(sessionCard)))
  }
}
