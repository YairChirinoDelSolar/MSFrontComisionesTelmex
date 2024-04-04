import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as CatalogosActions from '../../_actions/catalogos.actions'
import * as ComisionesActions from '../../_actions/comisiones.actions'
import { ComisionesDetailView } from '../../_sections/comisiones/view'
import { handleError } from '../../_utils'

function ComisionesDetailPage({
  catalogs,
  detail,
  getComision,
  getEmptyDetail,
  getCatalogTipoCliente,
  getCatalogTipoServicio,
  getCatalogPorcentajeComision,
  createComision,
  updateComision,
  resetComision
}) {
  const params = useParams()
  const { idComision } = params
  const { tipoCliente, tipoServicio, porcentajeComision } = catalogs

  useEffect(() => {
    if (idComision) {
      getComision(idComision).catch(handleError)
    } else {
      getEmptyDetail()
    }

    const promises = []

    if (!tipoCliente) {
      promises.push(getCatalogTipoCliente())
    }

    if (!tipoServicio) {
      promises.push(getCatalogTipoServicio())
    }

    if (!porcentajeComision) {
      promises.push(getCatalogPorcentajeComision())
    }

    Promise.allSettled(promises).catch(handleError)
    return resetComision
  }, [])

  return (
    <>
      <Helmet>
        <title>Detalle de Comisión</title>
      </Helmet>

      <ComisionesDetailView
        idComision={idComision}
        catalogs={catalogs}
        detail={detail}
        handleCreate={createComision}
        handleUpdate={updateComision}
      />
    </>
  )
}

ComisionesDetailPage.propTypes = {
  catalogs: PropTypes.object,
  detail: PropTypes.object,
  getComision: PropTypes.func,
  getEmptyDetail: PropTypes.func,
  getCatalogTipoCliente: PropTypes.func,
  getCatalogTipoServicio: PropTypes.func,
  getCatalogPorcentajeComision: PropTypes.func,
  createComision: PropTypes.func,
  updateComision: PropTypes.func,
  resetComision: PropTypes.func
}

const mapStateToProps = state => ({
  detail: state.comisiones.detail,
  catalogs: state.catalogs.catalogs
})

const mapDispatchToProps = dispatch => ({
  getComision: idComision =>
    dispatch(ComisionesActions.getComision(idComision)),
  getEmptyDetail: () => dispatch(ComisionesActions.getEmptyComision()),
  getCatalogTipoCliente: () =>
    dispatch(CatalogosActions.getCatalogTipoCliente()),
  getCatalogTipoServicio: () =>
    dispatch(CatalogosActions.getCatalogTipoServicio()),
  getCatalogPorcentajeComision: () =>
    dispatch(CatalogosActions.getCatalogPorcentajeComision()),
  createComision: request =>
    dispatch(ComisionesActions.createComision(request)),
  updateComision: (idComision, request) =>
    dispatch(ComisionesActions.updateComision(idComision, request)),
  resetComision: () => dispatch(ComisionesActions.resetComision())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComisionesDetailPage)
