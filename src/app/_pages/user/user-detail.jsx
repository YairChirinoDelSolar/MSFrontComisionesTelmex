import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as UserActions from '../../_actions/user.actions'
import * as CatalogosActions from '../../_actions/catalogos.actions'
import { UserDetailView } from '../../_sections/user/view'
import { handleError } from '../../_utils'

function UserDetailPage({
  detail,
  catalogs,
  getEmptyDetail,
  createUser,
  getCatalogRol,
  resetUser
}) {
  const params = useParams()
  const { idEmpleado } = params
  const { rol } = catalogs

  useEffect(() => {
    getEmptyDetail(idEmpleado)

    const promises = []

    if (!rol) {
      promises.push(getCatalogRol())
    }

    Promise.allSettled(promises).catch(handleError)
    return resetUser
  }, [])

  return (
    <>
      <Helmet>
        <title>Crear Usuario</title>
      </Helmet>

      <UserDetailView
        detail={detail}
        catalogs={catalogs}
        handleCreate={createUser}
      />
    </>
  )
}

UserDetailPage.propTypes = {
  detail: PropTypes.object,
  catalogs: PropTypes.object,
  getEmptyDetail: PropTypes.func,
  createUser: PropTypes.func,
  getCatalogRol: PropTypes.func,
  resetUser: PropTypes.func
}

const mapStateToProps = state => ({
  detail: state.users.detail,
  catalogs: state.catalogs.catalogs
})

const mapDispatchToProps = dispatch => ({
  getEmptyDetail: idEmpleado => dispatch(UserActions.getEmptyUser(idEmpleado)),
  createUser: request => dispatch(UserActions.createUser(request)),
  getCatalogRol: () => dispatch(CatalogosActions.getCatalogRol()),
  resetUser: () => dispatch(UserActions.resetUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailPage)
