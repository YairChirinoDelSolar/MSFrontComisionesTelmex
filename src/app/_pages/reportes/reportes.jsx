import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as CatalogosActions from '../../_actions/catalogos.actions'
import * as ReportesAction from '../../_actions/reportes.actions'
import * as EstadosCuentaAction from '../../_actions/estados-cuenta.actions'
import { ReportesView } from '../../_sections/reportes/view'
import { handleError } from '../../_utils'

function ReportesPage({
  catalogs,
  items,
  estadosCuentaPagination,
  getCatalogPagoConcepto,
  getCatalogTipoEmpleado,
  getReporte,
  resetReporte,
  getEstadosCuenta,
  resetEstadosCuenta
}) {
  const [filterBy, setFilterBy] = useState({})
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [sort, setSort] = useState()

  const { pagoConcepto, tipoEmpleado } = catalogs

  const retrieve = () => {
    getReporte({ page, size, sort, ...filterBy }).catch(handleError)
  }

  useEffect(() => {
    retrieve()
    // TODO: Cambiar por petición a catálogo de estados de cuenta
    getEstadosCuenta({ page: 0, size: 200 }).catch(handleError)

    const promises = []

    if (!pagoConcepto) {
      promises.push(getCatalogPagoConcepto())
    }

    if (!tipoEmpleado) {
      promises.push(getCatalogTipoEmpleado())
    }

    Promise.allSettled(promises).catch(handleError)
    return () => {
      resetReporte()
      resetEstadosCuenta()
    }
  }, [page, size])

  return (
    <>
      <Helmet>
        <title> Reportes </title>
      </Helmet>

      <ReportesView
        items={items}
        catalogs={catalogs}
        estadosCuentaPagination={estadosCuentaPagination}
        pagination={{ page, size }}
        setPage={setPage}
        setRowsPerPage={setSize}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setSort={setSort}
        handleSubmit={retrieve}
      />
    </>
  )
}

ReportesPage.propTypes = {
  catalogs: PropTypes.object,
  items: PropTypes.object,
  estadosCuentaPagination: PropTypes.object,
  getCatalogPagoConcepto: PropTypes.func,
  getCatalogTipoEmpleado: PropTypes.func,
  getReporte: PropTypes.func,
  resetReporte: PropTypes.func,
  getEstadosCuenta: PropTypes.func,
  resetEstadosCuenta: PropTypes.func
}

const mapStateToProps = state => ({
  catalogs: state.catalogs.catalogs,
  items: state.reportes.items,
  estadosCuentaPagination: state.estadosCuenta.items
})

const mapDispatchToProps = dispatch => ({
  getCatalogPagoConcepto: () =>
    dispatch(CatalogosActions.getCatalogPagoConcepto()),
  getCatalogTipoEmpleado: () =>
    dispatch(CatalogosActions.getCatalogTipoEmpleado()),
  getReporte: pagination => dispatch(ReportesAction.getReporte(pagination)),
  resetReporte: () => dispatch(ReportesAction.resetReporte()),
  getEstadosCuenta: pagination =>
    dispatch(EstadosCuentaAction.getEstadosCuenta(pagination)),
  resetEstadosCuenta: () => dispatch(EstadosCuentaAction.resetEstadosCuenta())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportesPage)
