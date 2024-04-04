import { USER_CONSTANTS } from '../_constants'
import { userServiceOld } from '../_services'
import { alertActions } from '.'
import { history } from '../_helpers'

export const userActionsOld = {
  login,
  logout,
  register,
  getAll,
  delete: _delete
}

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }))

    userServiceOld.login(username, password).then(
      user => {
        dispatch(success(user))
        window.location = '/'
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      }
    )
  }

  function request(user) {
    return { type: USER_CONSTANTS.LOGIN_REQUEST, user }
  }
  function success(user) {
    return { type: USER_CONSTANTS.LOGIN_SUCCESS, user }
  }
  function failure(error) {
    return { type: USER_CONSTANTS.LOGIN_FAILURE, error }
  }
}

function logout() {
  userServiceOld.logout()
  return { type: USER_CONSTANTS.LOGOUT }
}

function register(user) {
  return dispatch => {
    dispatch(request(user))

    userServiceOld.register(user).then(
      user => {
        dispatch(success())
        history.push('/login')
        dispatch(alertActions.success('Registration successful'))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      }
    )
  }

  function request(user) {
    return { type: USER_CONSTANTS.REGISTER_REQUEST, user }
  }
  function success(user) {
    return { type: USER_CONSTANTS.REGISTER_SUCCESS, user }
  }
  function failure(error) {
    return { type: USER_CONSTANTS.REGISTER_FAILURE, error }
  }
}

function getAll() {
  return dispatch => {
    dispatch(request())

    userServiceOld.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error.toString()))
    )
  }

  function request() {
    return { type: USER_CONSTANTS.GETALL_REQUEST }
  }
  function success(users) {
    return { type: USER_CONSTANTS.GETALL_SUCCESS, users }
  }
  function failure(error) {
    return { type: USER_CONSTANTS.GETALL_FAILURE, error }
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id))

    userServiceOld.delete(id).then(
      user => dispatch(success(id)),
      error => dispatch(failure(id, error.toString()))
    )
  }

  function request(id) {
    return { type: USER_CONSTANTS.DELETE_REQUEST, id }
  }
  function success(id) {
    return { type: USER_CONSTANTS.DELETE_SUCCESS, id }
  }
  function failure(id, error) {
    return { type: USER_CONSTANTS.DELETE_FAILURE, id, error }
  }
}
