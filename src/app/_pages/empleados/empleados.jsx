import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as EmpleadosActions from '../../_actions/empleados.actions'
import { EmpleadosView } from '../../_sections/empleados/view'
import { handleError } from '../../_utils'

function EmpleadosPage({
  items,
  getEmpleados,
  deleteEmpleado,
  resetEmpleados
}) {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [sort, setSort] = useState()

  const retrieve = () => {
    getEmpleados({ page, size, sort }).catch(handleError)
  }

  useEffect(() => {
    retrieve()
    return resetEmpleados
  }, [page, size, sort])

  const onDelete = idEmpleado => {
    deleteEmpleado(idEmpleado).then(retrieve).catch(handleError)
  }

  return (
    <>
      <Helmet>
        <title> Catálogo de Empleados </title>
      </Helmet>

      <EmpleadosView
        items={items}
        pagination={{ page, size }}
        setPage={setPage}
        setRowsPerPage={setSize}
        setSort={setSort}
        handleDelete={onDelete}
      />
    </>
  )
}

EmpleadosPage.propTypes = {
  items: PropTypes.object,
  getEmpleados: PropTypes.func,
  deleteEmpleado: PropTypes.func,
  resetEmpleados: PropTypes.func
}

const mapStateToProps = state => ({
  items: state.empleados.items
})

const mapDispatchToProps = dispatch => ({
  getEmpleados: pagination =>
    dispatch(EmpleadosActions.getEmpleados(pagination)),
  deleteEmpleado: idEmpleado =>
    dispatch(EmpleadosActions.deleteEmpleado(idEmpleado)),
  resetEmpleados: () => dispatch(EmpleadosActions.resetEmpleados())
})

export default connect(mapStateToProps, mapDispatchToProps)(EmpleadosPage)
