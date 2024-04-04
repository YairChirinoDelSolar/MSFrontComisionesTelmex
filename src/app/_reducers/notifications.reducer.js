import { NOTIFICATIONS_CONSTANTS } from '../_constants'

const initialState = {
  items: {},
  totalRead: 0,
  totalUnRead: 0,
  refreshSteps: 0
}

export function notifications(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_CONSTANTS.ACTION_REFRESH_NOTIFICATIONS:
      return { ...state, refreshSteps: state.refreshSteps + 1 }
    case NOTIFICATIONS_CONSTANTS.ACTION_GET_READ:
      return { ...state, totalRead: action.data }
    case NOTIFICATIONS_CONSTANTS.ACTION_GET_UNREAD:
      return { ...state, totalUnRead: action.data }
    case NOTIFICATIONS_CONSTANTS.ACTION_GET_NOTIFICATIONS:
      return { ...state, items: action.data }
    case NOTIFICATIONS_CONSTANTS.ACTION_RESET_NOTIFICATIONS:
      return { ...initialState }
    default:
      return state
  }
}
