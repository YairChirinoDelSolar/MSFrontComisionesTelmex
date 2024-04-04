import { showLoader, hideLoader } from './loading.actions'
import { stageToast } from './toast.actions'
import * as AuthService from '../_services/authentication.service'
import { removeItem, setItem } from '../_helpers/storage'

import { USER_CONSTANTS } from '../_constants'

export const login = user => dispatch => {
  dispatch({ type: USER_CONSTANTS.ACTION_LOGIN_REQUEST })

  return AuthService.auth(user)
    .then(response => {
      const { data } = response

      dispatch({
        type: USER_CONSTANTS.ACTION_LOGIN_SUCCESS,
        data
      })

      setItem(USER_CONSTANTS.USER_STORAGE_KEY, JSON.stringify({ auth: data }))
    })
    .catch(error => {
      const { message = '' } = error
      dispatch({ type: USER_CONSTANTS.ACTION_LOGIN_ERROR })

      dispatch(
        stageToast({
          message: message || 'Correo o contraseña incorrectos',
          type: 'error'
        })
      )

      throw error
    })
}

export const logout = () => dispatch => {
  dispatch(showLoader())
  dispatch({ type: USER_CONSTANTS.ACTION_LOGOUT_REQUEST })
  removeItem(USER_CONSTANTS.USER_STORAGE_KEY)

  // TODO: Realizar petición de cierre de sesión
  return new Promise(resolve => {
    dispatch(hideLoader())
    dispatch({ type: USER_CONSTANTS.ACTION_LOGOUT_SUCCESS })

    resolve()
  })
}

export const resetUserLoading = () => dispatch => {
  dispatch({ type: USER_CONSTANTS.ACTION_RESET_USER_LOADING })
}
