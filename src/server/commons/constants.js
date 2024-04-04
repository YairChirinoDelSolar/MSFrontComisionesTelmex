/* Archivo de constantes */
const urlRegex = /(https?:)\/\/([a-zA-Z0-9-.]+):?(\d{4})*/
export const { BACKEND_SERVER_COMISIONES } = process.env
export const [, PROTOCOL_COMISIONES, HOST_COMISIONES, PORT_COMISIONES] =
  urlRegex.exec(BACKEND_SERVER_COMISIONES)

export const HTTP_TIMEOUT = process.env.HTTP_TIMEOUT
  ? Number(process.env.HTTP_TIMEOUT)
  : 120000

export const REJECT_UNAUTHORIZED = !!(
  process.env.REJECT_UNAUTHORIZED &&
  process.env.REJECT_UNAUTHORIZED.toString().toLowerCase() === 'true'
)

export const IS_SSL_PROTOCOL = !!(
  process.env.IS_SSL_PROTOCOL &&
  process.env.IS_SSL_PROTOCOL.toString().toLowerCase() === 'true'
)

export const HTTP_STATUS_CODE_200 = 200
export const HTTP_STATUS_CODE_201 = 201
export const HTTP_STATUS_CODE_202 = 202
export const HTTP_STATUS_CODE_401 = 401
export const HTTP_STATUS_CODE_404 = 404
export const HTTP_STATUS_CODE_500 = 500

export const HTTP_METHOD_GET = 'GET'
export const HTTP_METHOD_POST = 'POST'
export const HTTP_METHOD_PUT = 'PUT'
export const HTTP_METHOD_PATCH = 'PATCH'
export const HTTP_METHOD_DELETE = 'DELETE'

export const API_ROUTES = [
  'Auth',
  'Catalogos',
  'Comisiones',
  'Empleados',
  'EstadosCuenta',
  'Notifications',
  'Reportes',
  'User'
]

export const API_PATH_EMPLEADOS = {
  GET_EMPLEADOS: '/api/v1/empleado/',
  GET_EMPLEADO: '/api/v1/empleado/:empleado',
  CREATE_EMPLEADO: '/api/v1/empleado/',
  UPDATE_EMPLEADO: '/api/v1/empleado/:empleado',
  DELETE_EMPLEADO: '/api/v1/empleado/:empleado'
}

export const API_PATH_COMISIONES = {
  GET_COMISIONES: '/api/v1/comision/',
  GET_COMISION: '/api/v1/comision/:comision',
  CREATE_COMISION: '/api/v1/comision/',
  UPDATE_COMISION: '/api/v1/comision/:comision',
  DELETE_COMISION: '/api/v1/comision/:comision'
}

export const API_PATH_ESTADOS_CUENTA = {
  PROCESAR_ARCHIVO: '/api/v1/archivo/procesar/:fecha',
  CONSULTAR_ESTADO_CUENTA: '/api/v1/cuenta/check/:check',
  GET_CUENTAS: '/api/v1/cuenta/',
  GET_DETALLE_CUENTA: '/api/v1/detalle_cuenta/cuenta/:cuenta',
  DELETE_ESTADO_CUENTA: '/api/v1/cuenta/:cuenta',
  CALCULATE_ESTADO_CUENTA: '/api/v1/comision/procesar'
}

export const API_PATH_REPORTES = {
  GET_REPORTE: '/api/v1/comision/calculada',
  GET_REPORTE_EXCEL: '/api/v1/reporte/comision-calculada'
}

export const API_PATH_AUTH = {
  LOGIN: '/api/v1/auth/login'
}

export const API_PATH_USER = {
  PROFILE: '/api/v1/usuario/profile',
  CREATE: '/api/v1/usuario/save',
  ACL: '/api/v1/categoria/by/session'
}

export const API_PATH_NOTIFICATIONS = {
  GET_NOTIFICATIONS: '/api/v1/notificacion/',
  READ_NOTIFICATION: '/api/v1/notificacion/:notification',
  READ_ALL_NOTIFICATIONS: '/api/v1/notificacion/read/all'
}

export const API_PATH_CATALOGOS = '/api/v1/catalogo/:catalogo'
export const ROUTE_PARAM_CATALOGO_TIPO_EMPLEADO = 'tipo_empleado'
export const ROUTE_PARAM_CATALOGO_ESTATUS_EMPLEADO = 'estatus_empleado'
export const ROUTE_PARAM_CATALOGO_PERFIL_EMPLEADO = 'perfil'
export const ROUTE_PARAM_CATALOGO_GENERO = 'genero'
export const ROUTE_PARAM_CATALOGO_TIPO_CLIENTE = 'tipo_cliente'
export const ROUTE_PARAM_CATALOGO_TIPO_SERVICIO = 'tipo_servicio'
export const ROUTE_PARAM_CATALOGO_PORCENTAJE_COMISION = 'porcentaje-comision'
export const ROUTE_PARAM_CATALOGO_PAGO_CONCEPTO = 'pago-concepto'
export const ROUTE_PARAM_CATALOGO_ROL = 'rol'
