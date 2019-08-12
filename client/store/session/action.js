import axios from 'axios'

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
export const createSessionThunk = () => {
  return dispatch => {
    return axios
      .post('/session')
      .then(res => res.data)
      .then(session => dispatch(getSession(session)))
  }
}
