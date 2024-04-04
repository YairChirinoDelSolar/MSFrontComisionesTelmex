import { ESTADOS_CUENTA_CONSTANTS } from '../_constants'

const initialState = { items: {}, detail: {} }

export function estadosCuenta(state = initialState, action) {
  switch (action.type) {
    case ESTADOS_CUENTA_CONSTANTS.ACTION_GET_ESTADOS_CUENTA:
      return { ...state, items: action.data }
    case ESTADOS_CUENTA_CONSTANTS.ACTION_GET_DETALLE_CUENTA:
      return { ...state, detail: action.data }
    case ESTADOS_CUENTA_CONSTANTS.ACTION_RESET_ESTADOS_CUENTA:
      return { ...state, items: {} }
    case ESTADOS_CUENTA_CONSTANTS.ACTION_RESET_DETALLE_CUENTA:
      return { ...state, detail: {} }
    default:
      return state
  }
}
