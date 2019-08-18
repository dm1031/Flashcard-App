import axios from 'axios'

// ------ actions

export const LOGIN_USER = 'LOGIN_USER'

// ------ action creators

const loginUser = user => {
  return {
    type: LOGIN_USER,
    user
  }
}

// ------ thunks

export const loginUserThunk = credentials => {
  return dispatch => {
    return axios
      .post('/login', credentials)
      .then(res => res.data)
      .then(user => dispatch(loginUser(user)))
  }
}

export const checkIfUserLoggedInThunk = () => {
  return dispatch => {
    return axios
      .get('/auth')
      .then(res => res.data)
      .then(user => dispatch(loginUser(user)))
  }
}
