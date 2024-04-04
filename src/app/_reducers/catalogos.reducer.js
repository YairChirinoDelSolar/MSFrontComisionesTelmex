import { CATALOGOS_CONSTANTS } from '../_constants'

const initialState = { catalogs: {} }

export function catalogs(state = initialState, action) {
  switch (action.type) {
    case CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_TIPO_EMPLEADO:
      return {
        ...state,
        catalogs: { ...state.catalogs, tipoEmpleado: action.data }
      }
    case CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_ESTATUS_EMPLEADO:
      return {
        ...state,
        catalogs: { ...state.catalogs, estatusEmpleado: action.data }
      }
    case CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_PERFIL_EMPLEADO:
      return {
        ...state,
        catalogs: { ...state.catalogs, perfil: action.data }
      }
    case CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_GENERO:
      return {
        ...state,
        catalogs: { ...state.catalogs, genero: action.data }
      }
    case CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_TIPO_CLIENTE:
      return {
        ...state,
        catalogs: { ...state.catalogs, tipoCliente: action.data }
      }
    case CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_TIPO_SERVICIO:
      return {
        ...state,
        catalogs: { ...state.catalogs, tipoServicio: action.data }
      }
    case CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_PORCENTAJE_COMISION:
      return {
        ...state,
        catalogs: { ...state.catalogs, porcentajeComision: action.data }
      }
    case CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_PAGO_CONCEPTO:
      return {
        ...state,
        catalogs: { ...state.catalogs, pagoConcepto: action.data }
      }
    case CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_ROL:
      return {
        ...state,
        catalogs: { ...state.catalogs, rol: action.data }
      }
    default:
      return state
  }
}
