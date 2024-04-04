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

import Label from '../../_components/label'
import Iconify from '../../_components/iconify'
import { RouterLink } from '../../_routes/components'

// ----------------------------------------------------------------------

export default function EmpleadosTableRow({
  selected,
  empleado,
  handleClick,
  handleDelete
}) {
  const {
    numeroEmpleado,
    nombreCompleto,
    rfc,
    tipoEmpleado: tipoEmpleadoObj = {},
    genero: generoObj = {},
    perfil: perfilObj = {},
    estatusEmpleado = {},
    idEmpleado,
    detalleBancario = [],
    estrategia,
    estrategiaGlobal,
    hasUser
  } = empleado

  const [open, setOpen] = useState(null)

  const { tipoEmpleado = '' } = { ...tipoEmpleadoObj }
  const { genero = '' } = { ...generoObj }
  const { perfil = '' } = { ...perfilObj }
  const { estatus = '' } = { ...estatusEmpleado }
  const [{ nombreBanco, cuentaBancaria, clabeInterbancaria } = {}] =
    detalleBancario || []

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
              {numeroEmpleado}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {nombreCompleto}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{rfc}</TableCell>

        <TableCell>{tipoEmpleado}</TableCell>

        <TableCell>{genero}</TableCell>

        <TableCell>{perfil}</TableCell>

        <TableCell>
          <Label color={(estatus === 'Activo' && 'success') || 'error'}>
            {estatus}
          </Label>
        </TableCell>

        <TableCell>{nombreBanco}</TableCell>

        <TableCell>{cuentaBancaria}</TableCell>

        <TableCell>{clabeInterbancaria}</TableCell>

        <TableCell>{estrategia}</TableCell>

        <TableCell>{estrategiaGlobal}</TableCell>

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
        <MenuItem href={`/empleados/edit/${idEmpleado}`} component={RouterLink}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Editar
        </MenuItem>

        {!hasUser && (
          <MenuItem href={`/user/create/${idEmpleado}`} component={RouterLink}>
            <Iconify icon="mdi:user-add" sx={{ mr: 2 }} />
            Usuario
          </MenuItem>
        )}

        <MenuItem
          onClick={() => handleDelete(idEmpleado)}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  )
}

EmpleadosTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  empleado: PropTypes.object,
  handleDelete: PropTypes.func
}
