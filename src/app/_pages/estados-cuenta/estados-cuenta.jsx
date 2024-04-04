import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as EstadosCuentaAction from '../../_actions/estados-cuenta.actions'
import { EstadosCuentaView } from '../../_sections/estados-cuenta/view'
import { getTodayDate, handleError } from '../../_utils'

function EstadosCuentaPage({
  empleado = {},
  items,
  getEstadosCuenta,
  procesarArchivoEdoCuenta,
  deleteEstadoCuenta,
  calculateEstadoCuenta,
  resetEstadosCuenta
}) {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [sort, setSort] = useState()
  const [fechaArchivo, setFechaArchivo] = useState(getTodayDate())

  const { idEmpleado } = empleado
  const dateFormat = 'YYYY-MM-DD'

  const retrieve = () => {
    getEstadosCuenta({ page, size, sort }).catch(handleError)
  }

  useEffect(() => {
    retrieve()
    return resetEstadosCuenta
  }, [page, size, sort])

  const onChangeDate = (daysJSInstance, { validationError }) => {
    if (!validationError) {
      setFechaArchivo(daysJSInstance)
    }
  }

  const onSubmit = () => {
    const fecha = fechaArchivo.format(dateFormat)
    procesarArchivoEdoCuenta(fecha).then(retrieve).catch(handleError)
  }

  const onDelete = idEstadoCuenta => {
    deleteEstadoCuenta(idEstadoCuenta).then(retrieve).catch(handleError)
  }

  const onCalculate = idEstadoCuenta => {
    calculateEstadoCuenta(idEmpleado, idEstadoCuenta).catch(handleError)
  }

  return (
    <>
      <Helmet>
        <title> Estados de Cuenta </title>
      </Helmet>

      <EstadosCuentaView
        items={items}
        fechaArchivo={fechaArchivo}
        pagination={{ page, size }}
        setPage={setPage}
        setRowsPerPage={setSize}
        setSort={setSort}
        handleChangeDate={onChangeDate}
        handleSubmit={onSubmit}
        handleDelete={onDelete}
        handleCalculate={onCalculate}
      />
    </>
  )
}

EstadosCuentaPage.propTypes = {
  empleado: PropTypes.object,
  items: PropTypes.object,
  procesarArchivoEdoCuenta: PropTypes.func,
  getEstadosCuenta: PropTypes.func,
  deleteEstadoCuenta: PropTypes.func,
  calculateEstadoCuenta: PropTypes.func,
  resetEstadosCuenta: PropTypes.func
}

const mapStateToProps = state => ({
  empleado: state.authentication.profile.empleado,
  items: state.estadosCuenta.items
})

const mapDispatchToProps = dispatch => ({
  procesarArchivoEdoCuenta: fecha =>
    dispatch(EstadosCuentaAction.procesarArchivoEdoCuenta(fecha)),
  getEstadosCuenta: pagination =>
    dispatch(EstadosCuentaAction.getEstadosCuenta(pagination)),
  deleteEstadoCuenta: idEstadoCuenta =>
    dispatch(EstadosCuentaAction.deleteEstadoCuenta(idEstadoCuenta)),
  calculateEstadoCuenta: (idEmpleado, idEstadoCuenta) =>
    dispatch(
      EstadosCuentaAction.calculateEstadoCuenta(idEmpleado, idEstadoCuenta)
    ),
  resetEstadosCuenta: () => dispatch(EstadosCuentaAction.resetEstadosCuenta())
})

export default connect(mapStateToProps, mapDispatchToProps)(EstadosCuentaPage)
