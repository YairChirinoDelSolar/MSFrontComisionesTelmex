import React from 'react'
import PropTypes from 'prop-types'

import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'

// ----------------------------------------------------------------------

export default function ReportesTableRow({ selected, registro, handleClick }) {
  const {
    idEmpleadoComision,
    montoPagadoConcepto,
    montoEsperadoConcepto,
    montoTotal,
    empnumero,
    empnombrecompleto,
    idEstatus,
    empclabeinterbancaria,
    empcuentabancaria,
    empestrategia,
    empestrategiaglobal,
    iemprfc,
    estatus,
    pagoconcepto
  } = registro

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell>{idEmpleadoComision}</TableCell>

      <TableCell>{montoPagadoConcepto}</TableCell>

      <TableCell>{montoEsperadoConcepto}</TableCell>

      <TableCell>{montoTotal}</TableCell>

      <TableCell>{empnumero}</TableCell>

      <TableCell>{empnombrecompleto}</TableCell>

      <TableCell>{idEstatus}</TableCell>

      <TableCell>{empclabeinterbancaria}</TableCell>

      <TableCell>{empcuentabancaria}</TableCell>

      <TableCell>{empestrategia}</TableCell>

      <TableCell>{empestrategiaglobal}</TableCell>

      <TableCell>{iemprfc}</TableCell>

      <TableCell>{estatus}</TableCell>

      <TableCell>{pagoconcepto}</TableCell>
    </TableRow>
  )
}

ReportesTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  registro: PropTypes.object,
  handleDelete: PropTypes.func
}
