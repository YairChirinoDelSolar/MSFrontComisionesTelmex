import React from 'react'
import PropTypes from 'prop-types'

import Stack from '@mui/material/Stack'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'

// ----------------------------------------------------------------------

export default function EstadosCuentaDetailTableRow({
  selected,
  registroEstadoCuenta,
  handleClick
}) {
  const {
    quincena,
    rubro,
    master,
    estrategia,
    promotor,
    folio,
    division,
    subdireccion,
    empresa,
    fecha,
    importeBase,
    importePosteo,
    telPago
  } = registroEstadoCuenta

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {quincena}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell component="th" scope="row">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {rubro}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{master}</TableCell>

      <TableCell>{estrategia}</TableCell>

      <TableCell>{promotor}</TableCell>

      <TableCell>{folio}</TableCell>

      <TableCell>{division}</TableCell>

      <TableCell>{subdireccion}</TableCell>

      <TableCell>{empresa}</TableCell>

      <TableCell>{fecha}</TableCell>

      <TableCell>{importeBase}</TableCell>

      <TableCell>{importePosteo}</TableCell>

      <TableCell>{telPago}</TableCell>
    </TableRow>
  )
}

EstadosCuentaDetailTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  registroEstadoCuenta: PropTypes.object
}
