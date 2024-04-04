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

// ----------------------------------------------------------------------

export default function ComisionesTableRow({
  selected,
  comision,
  handleClick,
  handleDelete
}) {
  const {
    idComision,
    velocidad,
    paquete,
    renta,
    posteo,
    navegacion,
    pagoCliente,
    tipoCliente: tipoClienteObj = {},
    tipoServicio: tipoServicioObj = {},
    porcentajeComision: aliasPorcentajeComisionObj = {},
    total
  } = comision

  const [open, setOpen] = useState(null)

  const { tipoCliente = '' } = { ...tipoClienteObj }
  const { tipoServicio = '' } = { ...tipoServicioObj }
  const { aliasPorcentajeComision = '' } = { ...aliasPorcentajeComisionObj }

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
              {velocidad}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {paquete}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{renta}</TableCell>

        <TableCell>{posteo}</TableCell>

        <TableCell>{navegacion}</TableCell>

        <TableCell>{pagoCliente}</TableCell>

        <TableCell>{tipoCliente}</TableCell>

        <TableCell>{tipoServicio}</TableCell>

        <TableCell>{aliasPorcentajeComision}</TableCell>

        <TableCell>{total}</TableCell>

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
          href={`/comisiones/edit/${idComision}`}
          component={RouterLink}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Editar
        </MenuItem>

        <MenuItem
          onClick={() => handleDelete(idComision)}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  )
}

ComisionesTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  comision: PropTypes.object,
  handleDelete: PropTypes.func
}
