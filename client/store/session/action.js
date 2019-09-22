import axios from 'axios'
import store from '../store'
import { get } from 'http'

// ------ action
export const GET_SESSION = 'GET_SESSION'

// ------ action creators
const getSession = session => {
  return {
    type: GET_SESSION,
    session
  }
}

// ------ thunks
export const createSessionThunk = isTimed => {
  return dispatch => {
    return axios
      .post('/session', { user: store.getState().user, isTimed })
      .then(res => res.data)
      .then(session => dispatch(getSession(session)))
  }
}

export const updateSessionWithFactorsThunk = (sessionId, factors) => {
  return dispatch => {
    return axios
      .put(`/session/${sessionId}`, factors)
      .then(res => res.data)
      .then(session => dispatch(getSession(session)))
  }
}
