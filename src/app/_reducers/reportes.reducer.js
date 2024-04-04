import { REPORTES_CONSTANTS } from '../_constants'

const initialState = { items: {} }

export function reportes(state = initialState, action) {
  switch (action.type) {
    case REPORTES_CONSTANTS.ACTION_GET_REPORTE:
      return { ...state, items: action.data }
    default:
      return state
  }
}
