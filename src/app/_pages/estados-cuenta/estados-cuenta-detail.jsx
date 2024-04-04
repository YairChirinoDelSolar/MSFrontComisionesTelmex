import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as EstadosCuentaAction from '../../_actions/estados-cuenta.actions'
import EstadosCuentaDetailView from '../../_sections/estados-cuenta/view/estados-cuenta-detail-view'
import { handleError } from '../../_utils'

function EstadosCuentaDetailPage({
  detail,
  getDetalleCuenta,
  resetDetalleCuenta
}) {
  const params = useParams()
  const { idEstadoCuenta } = params

  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [sort, setSort] = useState()

  const retrieve = () => {
    getDetalleCuenta(idEstadoCuenta, { page, size, sort }).catch(handleError)
  }

  useEffect(() => {
    retrieve()
    return resetDetalleCuenta
  }, [page, size])

  return (
    <>
      <Helmet>
        <title>Detalle de Estado de Cuenta</title>
      </Helmet>

      <EstadosCuentaDetailView
        detail={detail}
        pagination={{ page, size }}
        setPage={setPage}
        setRowsPerPage={setSize}
        setSort={setSort}
      />
    </>
  )
}

EstadosCuentaDetailPage.propTypes = {
  detail: PropTypes.object,
  getDetalleCuenta: PropTypes.func,
  resetDetalleCuenta: PropTypes.func
}

const mapStateToProps = state => ({
  detail: state.estadosCuenta.detail
})

const mapDispatchToProps = dispatch => ({
  getDetalleCuenta: (cuenta, pagination) =>
    dispatch(EstadosCuentaAction.getDetalleCuenta(cuenta, pagination)),
  resetDetalleCuenta: () => dispatch(EstadosCuentaAction.resetDetalleCuenta())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EstadosCuentaDetailPage)
