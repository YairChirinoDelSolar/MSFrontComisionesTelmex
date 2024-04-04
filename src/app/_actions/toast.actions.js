import { TOAST_CONSTANTS } from '../_constants'

export const pushToast =
  ({ message, type }) =>
  dispatch => {
    const data = { message, type }
    dispatch({
      type: TOAST_CONSTANTS.ACTION_PUSH_TOAST,
      data
    })
  }

export const popToast =
  ({ message, type }) =>
  dispatch => {
    const data = { message, type }
    dispatch({
      type: TOAST_CONSTANTS.ACTION_POP_TOAST,
      data
    })
  }

export const stageToast = ({ message, type }) => {
  const data = { message, type }
  return {
    type: TOAST_CONSTANTS.ACTION_PUSH_TOAST,
    data
  }
}
