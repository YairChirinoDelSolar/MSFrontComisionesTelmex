import { EMPLEADOS_CONSTANTS } from '../_constants'

const initialState = { items: {}, detail: {} }

export function empleados(state = initialState, action) {
  switch (action.type) {
    case EMPLEADOS_CONSTANTS.ACTION_GET_EMPLEADOS:
      return { ...state, items: action.data }
    case EMPLEADOS_CONSTANTS.ACTION_GET_EMPLEADO:
      return { ...state, detail: action.data }
    case EMPLEADOS_CONSTANTS.ACTION_RESET_EMPLEADOS:
      return { ...state, items: {} }
    case EMPLEADOS_CONSTANTS.ACTION_RESET_EMPLEADO:
      return { ...state, detail: {} }
    default:
      return state
  }
}
