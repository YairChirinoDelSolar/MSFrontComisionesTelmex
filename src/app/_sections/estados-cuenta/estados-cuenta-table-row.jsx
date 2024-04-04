import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Iconify from '../../_components/iconify'
import { RouterLink } from '../../_routes/components'
import Label from '../../_components/label'
import { ESTADOS_CUENTA_CONSTANTS } from '../../_constants'
import { fCont, fCurrency } from '../../_utils/format-number'

// ----------------------------------------------------------------------

export default function EstadosCuentaTableRow({
  selected,
  estadoCuenta: estadoCuentaProp,
  handleClick,
  handleDelete,
  handleCalculate
}) {
  const {
    idEstadoCuenta,
    nombreArchivo,
    estatusCarga: estatusCargaObj = {},
    montoChargeBk,
    montoCliente,
    montoNavegacion,
    montoOtros,
    montoPosteo,
    montoTotal,
    totalRegistros
  } = estadoCuentaProp

  const [open, setOpen] = useState(null)

  const { idEstatusCarga = 0, estatusCarga = '' } = { ...estatusCargaObj }

  const handleOpenMenu = event => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {nombreArchivo}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Label
            color={
              ESTADOS_CUENTA_CONSTANTS.ESTATUS_CARGA_COLOR_LABELS[
                idEstatusCarga
              ] || 'info'
            }
          >
            {estatusCarga}
          </Label>
        </TableCell>

        <TableCell>{fCurrency(montoPosteo)}</TableCell>
        <TableCell>{fCurrency(montoNavegacion)}</TableCell>
        <TableCell>{fCurrency(montoCliente)}</TableCell>
        <TableCell>{fCurrency(montoChargeBk)}</TableCell>
        <TableCell>{fCurrency(montoOtros)}</TableCell>
        <TableCell>{fCurrency(montoTotal)}</TableCell>

        <TableCell>{fCont(totalRegistros)}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 }
        }}
      >
        <MenuItem
          href={`/estados-cuenta/detail/${idEstadoCuenta}`}
          component={RouterLink}
        >
          <Iconify icon="mdi:eye" sx={{ mr: 2 }} />
          Ver
        </MenuItem>

        <MenuItem onClick={() => handleCalculate(idEstadoCuenta)}>
          <Iconify icon="fa6-solid:filter-circle-dollar" sx={{ mr: 2 }} />
          Comisión
        </MenuItem>

        <MenuItem
          onClick={() => handleDelete(idEstadoCuenta)}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  )
}

EstadosCuentaTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  estadoCuenta: PropTypes.object,
  handleDelete: PropTypes.func,
  handleCalculate: PropTypes.func
}
