import { GET_SESSION } from './action'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SESSION:
      return action.session
    default:
      return state
  }
}
