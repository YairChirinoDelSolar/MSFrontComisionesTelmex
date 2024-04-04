import { LOADING_CONSTANTS } from '../_constants'

export const showLoader = () => {
  return {
    type: LOADING_CONSTANTS.ACTION_SHOW_LOADER
  }
}

export const hideLoader = () => {
  return {
    type: LOADING_CONSTANTS.ACTION_HIDE_LOADER
  }
}
