import { USER_CONSTANTS } from '../_constants'
import { getItem } from '../_helpers/storage'

const storage = JSON.parse(getItem(USER_CONSTANTS.USER_STORAGE_KEY))
let initialState = {
  loading: false,
  loggedIn: false,
  acl: [],
  profile: {},
  auth: {}
}

if (storage) {
  const { acl, profile, auth } = storage
  initialState = { ...initialState, loggedIn: true, acl, profile, auth }
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case USER_CONSTANTS.ACTION_LOGIN_REQUEST:
      return { ...state, loggedIn: false, loading: true }
    case USER_CONSTANTS.ACTION_LOGIN_SUCCESS:
      return { ...state, loggedIn: true, auth: action.data }
    case USER_CONSTANTS.ACTION_LOGIN_ERROR:
      return { ...state, loggedIn: false, loading: false, auth: {} }
    case USER_CONSTANTS.ACTION_LOGOUT_REQUEST:
      return { ...state, loggedIn: false, auth: {}, acl: [], profile: {} }
    case USER_CONSTANTS.ACTION_GET_USER_ACL:
      return { ...state, acl: action.data }
    case USER_CONSTANTS.ACTION_GET_USER_ACL_ERROR:
      return { ...state, loading: false }
    case USER_CONSTANTS.ACTION_GET_USER_PROFILE:
      return { ...state, profile: action.data }
    case USER_CONSTANTS.ACTION_GET_USER_PROFILE_ERROR:
      return { ...state, loading: false }
    case USER_CONSTANTS.ACTION_RESET_USER_LOADING:
      return { ...state, loading: false }
    default:
      return state
  }
}
