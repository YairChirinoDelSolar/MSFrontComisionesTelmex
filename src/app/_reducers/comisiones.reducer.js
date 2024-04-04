import { COMISIONES_CONSTANTS } from '../_constants'

const initialState = { items: {}, detail: {} }

export function comisiones(state = initialState, action) {
  switch (action.type) {
    case COMISIONES_CONSTANTS.ACTION_GET_COMISIONES:
      return { ...state, items: action.data }
    case COMISIONES_CONSTANTS.ACTION_GET_COMISION:
      return { ...state, detail: action.data }
    case COMISIONES_CONSTANTS.ACTION_RESET_COMISIONES:
      return { ...state, items: {} }
    case COMISIONES_CONSTANTS.ACTION_RESET_COMISION:
      return { ...state, detail: {} }
    default:
      return state
  }
}
