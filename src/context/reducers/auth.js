import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTHENTICATE_USER,
} from '../actions/types';

const auth = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem('accessToken', action.payload?.tokens?.accessToken)
      localStorage.setItem('refreshToken', action.payload?.tokens?.refreshToken)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload?.tokens?.accessToken,
        refreshToken: action.payload?.tokens?.refreshToken,
      }
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      }
    case LOGOUT_USER:
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
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