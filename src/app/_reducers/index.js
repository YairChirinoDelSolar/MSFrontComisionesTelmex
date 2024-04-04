import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { catalogs } from './catalogos.reducer'
import { comisiones } from './comisiones.reducer'
import { empleados } from './empleados.reducer'
import { estadosCuenta } from './estados-cuenta.reducer'
import { loading } from './loading.reducer'
import { notifications } from './notifications.reducer'
import { users } from './users.reducer'
import { reportes } from './reportes.reducer'
import { toast } from './toast.reducer'

const rootReducer = combineReducers({
  authentication,
  catalogs,
  comisiones,
  empleados,
  estadosCuenta,
  loading,
  notifications,
  reportes,
  toast,
  users
})

export default rootReducer
