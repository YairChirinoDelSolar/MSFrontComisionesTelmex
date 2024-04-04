import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getItem } from '../_helpers/storage'

import { USER_CONSTANTS } from '../_constants'

export function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = getItem(USER_CONSTANTS.USER_STORAGE_KEY)

  // Si el usuario no está autenticado, navegamos a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: rest.location }} />
  }
  // Si el usuario está autenticado, renderizamos los hijos
  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.element
}
