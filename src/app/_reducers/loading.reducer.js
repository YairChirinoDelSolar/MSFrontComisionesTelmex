import { LOADING_CONSTANTS } from '../_constants'

const initialState = { isLoading: false, steps: 0 }

export function loading(state = initialState, action) {
  let { steps } = state

  switch (action.type) {
    case LOADING_CONSTANTS.ACTION_SHOW_LOADER:
      steps += 1
      return { ...state, steps, isLoading: steps > 0 }
    case LOADING_CONSTANTS.ACTION_HIDE_LOADER:
      steps -= 1
      return { ...state, steps, isLoading: steps > 0 }
    default:
      return state
  }
}
