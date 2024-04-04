import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'

import { usePathname } from '../../_routes/hooks'
import { RouterLink } from '../../_routes/components'

import { useResponsive } from '../../_hooks/use-responsive'

import { account } from '../../_mock/account'

import Logo from '../../_components/logo'

import Scrollbar from '../../_components/scrollbar'
import Iconify from '../../_components/iconify'

import { NAV } from './config-layout'
import navConfig from './config-navigation'
import { hasPermission } from '../../_utils'

// ----------------------------------------------------------------------

function Nav({ empleado = {}, acl, openNav, onCloseNav }) {
  const pathname = usePathname()

  const upLg = useResponsive('up', 'lg')

  const { nombreCompleto = '' } = empleado

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: theme => alpha(theme.palette.grey[500], 0.12)
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{nombreCompleto}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  )

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig
        .filter(item => !item.permission || hasPermission(acl, item.permission))
        .map(item => (
          <NavItem key={item.title} item={item} />
        ))}
    </Stack>
  )

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {acl.length > 0 && renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  )

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH }
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: theme => `dashed 1px ${theme.palette.divider}`
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  )
}

Nav.propTypes = {
  empleado: PropTypes.object,
  acl: PropTypes.arrayOf(PropTypes.object),
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func
}

const mapStateToProps = state => ({
  empleado: state.authentication.profile.empleado,
  acl: state.authentication.acl
})

export default connect(mapStateToProps, () => ({}))(Nav)

// ----------------------------------------------------------------------

const icon = name => <Iconify icon={name} />

function NavItem({ item }) {
  const pathname = usePathname()
  const hasChildren = item.children?.length

  const [open, setOpen] = React.useState(
    hasChildren && item.children.map(i => i.path).includes(pathname)
  )

  const active = item.path === pathname

  const handleClick = () => setOpen(prev => !prev)

  return (
    <>
      <ListItemButton
        component={hasChildren ? null : RouterLink}
        href={hasChildren ? null : item.path}
        onClick={hasChildren ? handleClick : null}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.secondary',
          fontWeight: 'fontWeightMedium',
          ...(active && {
            color: 'primary.main',
            fontWeight: 'fontWeightSemiBold',
            bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              bgcolor: theme => alpha(theme.palette.primary.main, 0.16)
            }
          })
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {item.icon}
        </Box>

        <ListItemText disableTypography component="span">
          {item.title}{' '}
        </ListItemText>
        {hasChildren
          ? icon(open ? 'ic:baseline-expand-less' : 'ic:baseline-expand-more')
          : ''}
      </ListItemButton>
      {hasChildren ? (
        <Collapse in={open}>
          {item.children.map(subItem => (
            <NavSubItem key={subItem.title} item={subItem} />
          ))}
        </Collapse>
      ) : (
        ''
      )}
    </>
  )
}

NavItem.propTypes = {
  item: PropTypes.object
}

function NavSubItem({ item }) {
  const pathname = usePathname()

  const active = item.path === pathname

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        fontWeight: 'fontWeightMedium',
        paddingLeft: 4,
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: theme => alpha(theme.palette.primary.main, 0.16)
          }
        })
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <ListItemText disableTypography component="span">
        {item.title}{' '}
      </ListItemText>
    </ListItemButton>
  )
}

NavSubItem.propTypes = {
  item: PropTypes.object
}
