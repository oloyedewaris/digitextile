import { LOGIN_USER, LOGOUT_USER, AUTHENTICATE_USER } from './types';

export const loginUser = data => dispatch => {
  dispatch({
    type: LOGIN_USER,
    payload: data
  })
}

export const authenticateUser = data => dispatch => {
  dispatch({
    type: AUTHENTICATE_USER,
    payload: data
  })
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_USER })
}
