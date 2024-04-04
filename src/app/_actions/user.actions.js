import { hideLoader, showLoader } from './loading.actions'
import { stageToast } from './toast.actions'
import * as UserService from '../_services/user.service'
import { setItem, getItem } from '../_helpers/storage'

import { USER_CONSTANTS } from '../_constants'

export const getProfile = () => dispatch => {
  dispatch({ type: USER_CONSTANTS.ACTION_USER_PROFILE_REQUEST })

  return UserService.getProfile()
    .then(response => {
      const storage = JSON.parse(getItem(USER_CONSTANTS.USER_STORAGE_KEY))
      const user = { ...storage, profile: response }

      dispatch({
        type: USER_CONSTANTS.ACTION_GET_USER_PROFILE,
        data: response
      })

      setItem(USER_CONSTANTS.USER_STORAGE_KEY, JSON.stringify(user))
    })
    .catch(error => {
      const { message = '' } = error
      dispatch({ type: USER_CONSTANTS.ACTION_GET_USER_PROFILE_ERROR })

      dispatch(
        stageToast({
          message: message || 'Error al solicitar información del usuario',
          type: 'error'
        })
      )

      throw error
    })
}

export const getACL = () => dispatch => {
  dispatch({ type: USER_CONSTANTS.ACTION_USER_ACL_REQUEST })

  return UserService.getACL()
    .then(response => {
      const storage = JSON.parse(getItem(USER_CONSTANTS.USER_STORAGE_KEY))
      const { data } = response
      const user = { ...storage, acl: data }

      dispatch({
        type: USER_CONSTANTS.ACTION_GET_USER_ACL,
        data
      })

      setItem(USER_CONSTANTS.USER_STORAGE_KEY, JSON.stringify(user))
    })
    .catch(error => {
      const { message = '' } = error
      dispatch({ type: USER_CONSTANTS.ACTION_GET_USER_ACL_ERROR })

      dispatch(
        stageToast({
          message: message || 'Error al solicitar el control de acceso',
          type: 'error'
        })
      )

      throw error
    })
}

export const createUser = request => dispatch => {
  dispatch(showLoader())
  return UserService.create(request)
    .then(data => {
      dispatch(hideLoader())

      dispatch({
        type: USER_CONSTANTS.ACTION_CREATE_USER,
        data
      })

      dispatch(
        stageToast({
          message: 'Usuario creado correctamente',
          type: 'success'
        })
      )
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al crear el usuario',
          type: 'error'
        })
      )

      throw error
    })
}

export const getEmptyUser = idEmpleado => dispatch => {
  const data = UserService.getEmpty(idEmpleado)

  dispatch({
    type: USER_CONSTANTS.ACTION_GET_USER,
    data
  })
}

export const resetUser = () => dispatch => {
  dispatch({ type: USER_CONSTANTS.ACTION_RESET_USER })
}
