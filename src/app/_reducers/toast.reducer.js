import { TOAST_CONSTANTS } from '../_constants'

const initialState = { toast: [] }

export function toast(state = initialState, action) {
  let toastNotifications

  switch (action.type) {
    case TOAST_CONSTANTS.ACTION_PUSH_TOAST:
      return { ...state, toast: [...state.toast, action.data] }
    case TOAST_CONSTANTS.ACTION_POP_TOAST:
      toastNotifications = state.toast.filter(
        n => JSON.stringify(action.data) !== JSON.stringify(n)
      )
      return { ...state, toast: toastNotifications }
    default:
      return state
  }
}
