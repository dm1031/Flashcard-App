import { LOGIN_USER } from './action'

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.user
    default:
      return state
  }
}
