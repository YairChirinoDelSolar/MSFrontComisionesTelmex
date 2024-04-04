import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as ComisionesActions from '../../_actions/comisiones.actions'
import { ComisionesView } from '../../_sections/comisiones/view'
import { handleError } from '../../_utils'

function ComisionesPage({
  items,
  getComisiones,
  deleteComision,
  resetComisiones
}) {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [sort, setSort] = useState()

  const retrieve = () => {
    getComisiones({ page, size, sort }).catch(handleError)
  }

  useEffect(() => {
    retrieve()
    return resetComisiones
  }, [page, size, sort])

  const onDelete = idComision => {
    deleteComision(idComision).then(retrieve).catch(handleError)
  }

  return (
    <>
      <Helmet>
        <title> Catálogo de Comisiones </title>
      </Helmet>

      <ComisionesView
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

ComisionesPage.propTypes = {
  items: PropTypes.object,
  getComisiones: PropTypes.func,
  deleteComision: PropTypes.func,
  resetComisiones: PropTypes.func
}

const mapStateToProps = state => ({
  items: state.comisiones.items
})

const mapDispatchToProps = dispatch => ({
  getComisiones: pagination =>
    dispatch(ComisionesActions.getComisiones(pagination)),
  deleteComision: idComision =>
    dispatch(ComisionesActions.deleteComision(idComision)),
  resetComisiones: () => dispatch(ComisionesActions.resetComisiones())
})

export default connect(mapStateToProps, mapDispatchToProps)(ComisionesPage)
