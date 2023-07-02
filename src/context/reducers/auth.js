import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTHENTICATE_USER,
} from '../actions/types';

const auth = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem('accessToken', action.payload.accessToken)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      }
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: localStorage.getItem('accessToken'),
      }
    case LOGOUT_USER:
      localStorage.removeItem('accessToken')
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      }
    default:
      return state
  }
}

export default auth;