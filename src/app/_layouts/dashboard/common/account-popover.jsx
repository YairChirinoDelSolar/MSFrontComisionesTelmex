import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Popover from '@mui/material/Popover'
import { alpha } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import * as AuthActions from '../../../_actions/authentication.actions'
import { account } from '../../../_mock/account'
import { useRouter } from '../../../_routes/hooks'
import { handleError } from '../../../_utils'

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill'
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill'
  }
]

// ----------------------------------------------------------------------

function AccountPopover({ empleado = {}, logout }) {
  const router = useRouter()
  const [open, setOpen] = useState(null)

  const { nombreCompleto = '', perfil: { perfil = '' } = {} } = empleado

  const handleLogout = () => {
    setOpen(null)
    logout()
      .then(() => {
        router.push('/login')
      })
      .catch(handleError)
  }

  const handleOpen = event => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: theme => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: theme =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
          })
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={nombreCompleto}
          sx={{
            width: 36,
            height: 36,
            border: theme => `solid 2px ${theme.palette.background.default}`
          }}
        >
          {nombreCompleto}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {nombreCompleto}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {perfil}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map(option => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Cerrar Sesión
        </MenuItem>
      </Popover>
    </>
  )
}

AccountPopover.propTypes = {
  empleado: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = state => ({
  empleado: state.authentication.profile.empleado
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(AuthActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPopover)
