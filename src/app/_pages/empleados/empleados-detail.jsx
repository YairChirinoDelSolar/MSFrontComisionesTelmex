import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as CatalogosActions from '../../_actions/catalogos.actions'
import * as EmpleadosActions from '../../_actions/empleados.actions'
import { EmpleadosDetailView } from '../../_sections/empleados/view'
import { handleError } from '../../_utils'

function EmpleadosDetailPage({
  catalogs,
  detail,
  getEmpleado,
  getEmptyDetail,
  getCatalogTipoEmpleado,
  getCatalogEstatusEmpleado,
  getCatalogPerfilEmpleado,
  getCatalogGenero,
  createEmpleado,
  updateEmpleado,
  resetEmpleado
}) {
  const params = useParams()
  const { idEmpleado } = params
  const { estatusEmpleado, perfil, tipoEmpleado, genero } = catalogs

  useEffect(() => {
    if (idEmpleado) {
      getEmpleado(idEmpleado).catch(handleError)
    } else {
      getEmptyDetail()
    }

    const promises = []

    if (!tipoEmpleado) {
      promises.push(getCatalogTipoEmpleado())
    }

    if (!estatusEmpleado) {
      promises.push(getCatalogEstatusEmpleado())
    }

    if (!perfil) {
      promises.push(getCatalogPerfilEmpleado())
    }

    if (!genero) {
      promises.push(getCatalogGenero())
    }

    Promise.allSettled(promises).catch(handleError)
    return resetEmpleado
  }, [])

  return (
    <>
      <Helmet>
        <title>Detalle de Empleado</title>
      </Helmet>

      <EmpleadosDetailView
        idEmpleado={idEmpleado}
        catalogs={catalogs}
        detail={detail}
        handleCreate={createEmpleado}
        handleUpdate={updateEmpleado}
      />
    </>
  )
}

EmpleadosDetailPage.propTypes = {
  catalogs: PropTypes.object,
  detail: PropTypes.object,
  getEmpleado: PropTypes.func,
  getEmptyDetail: PropTypes.func,
  getCatalogTipoEmpleado: PropTypes.func,
  getCatalogEstatusEmpleado: PropTypes.func,
  getCatalogPerfilEmpleado: PropTypes.func,
  getCatalogGenero: PropTypes.func,
  createEmpleado: PropTypes.func,
  updateEmpleado: PropTypes.func,
  resetEmpleado: PropTypes.func
}

const mapStateToProps = state => ({
  detail: state.empleados.detail,
  catalogs: state.catalogs.catalogs
})

const mapDispatchToProps = dispatch => ({
  getEmpleado: idEmpleado => dispatch(EmpleadosActions.getEmpleado(idEmpleado)),
  getEmptyDetail: () => dispatch(EmpleadosActions.getEmptyEmpleado()),
  getCatalogTipoEmpleado: () =>
    dispatch(CatalogosActions.getCatalogTipoEmpleado()),
  getCatalogEstatusEmpleado: () =>
    dispatch(CatalogosActions.getCatalogEstatusEmpleado()),
  getCatalogPerfilEmpleado: () =>
    dispatch(CatalogosActions.getCatalogPerfilEmpleado()),
  getCatalogGenero: () => dispatch(CatalogosActions.getCatalogGenero()),
  createEmpleado: request => dispatch(EmpleadosActions.createEmpleado(request)),
  updateEmpleado: (idEmpleado, request) =>
    dispatch(EmpleadosActions.updateEmpleado(idEmpleado, request)),
  resetEmpleado: () => dispatch(EmpleadosActions.resetEmpleado())
})

export default connect(mapStateToProps, mapDispatchToProps)(EmpleadosDetailPage)
