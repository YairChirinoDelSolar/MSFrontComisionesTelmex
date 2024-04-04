import { USER_CONSTANTS } from '../_constants'

const initialState = { items: {}, detail: {} }

export function users(state = initialState, action) {
  switch (action.type) {
    case USER_CONSTANTS.ACTION_GET_USER:
      return { ...state, detail: action.data }
    case USER_CONSTANTS.ACTION_RESET_USER:
      return { ...state, detail: {} }
    default:
      return state
  }
}
