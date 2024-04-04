import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'

import * as NotificationsActions from '../../../_actions/notifications.actions'
import { getTimeFromToday, handleError } from '../../../_utils'
import Iconify from '../../../_components/iconify'
import Scrollbar from '../../../_components/scrollbar'
import { NOTIFICATIONS_CONSTANTS } from '../../../_constants'

function NotificationsPopover({
  items,
  totalUnRead,
  refreshSteps,
  subscribe,
  getRead,
  getUnRead,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  resetNotifications
}) {
  const [open, setOpen] = useState(null)

  const { content: notifications = [] } = items
  const readNotifications = notifications.filter(
    notification => notification.leido
  )
  const unReadNotifications = notifications.filter(
    notification => !notification.leido
  )

  const page = NOTIFICATIONS_CONSTANTS.POPOVER_INITIAL_PAGE
  const size = NOTIFICATIONS_CONSTANTS.POPOVER_MAX_NOTIFICATIONS_TO_SHOW
  const sort = NOTIFICATIONS_CONSTANTS.POPOVER_DATE_SORT

  useEffect(() => {
    subscribe()

    return resetNotifications
  }, [])

  useEffect(() => {
    Promise.allSettled([
      getRead(),
      getUnRead(),
      getNotifications({ page, size, sort })
    ]).catch(handleError)
  }, [refreshSteps])

  const handleOpen = event => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notificaciones</Typography>
            {totalUnRead > 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Tienes {totalUnRead}{' '}
                {totalUnRead > 1 ? 'notificaciones' : 'notificación'} sin leer
              </Typography>
            )}
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Marcar todas como leídas">
              <IconButton color="primary" onClick={markAllNotificationsAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {unReadNotifications.length ? (
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: 'overline' }}
                >
                  Nuevas
                </ListSubheader>
              }
            >
              {unReadNotifications.map(notification => (
                <NotificationItem
                  key={notification.idNotificacion}
                  notification={notification}
                  onClick={() =>
                    markNotificationAsRead(notification.idNotificacion)
                  }
                />
              ))}
            </List>
          ) : (
            ''
          )}

          {readNotifications.length ? (
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: 'overline' }}
                >
                  Vistas
                </ListSubheader>
              }
            >
              {readNotifications.map(notification => (
                <NotificationItem
                  key={notification.idNotificacion}
                  notification={notification}
                />
              ))}
            </List>
          ) : (
            ''
          )}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            Ver todas las notificaciones
          </Button>
        </Box>
      </Popover>
    </>
  )
}

NotificationsPopover.propTypes = {
  items: PropTypes.object,
  totalUnRead: PropTypes.number,
  refreshSteps: PropTypes.number,
  subscribe: PropTypes.func,
  getRead: PropTypes.func,
  getUnRead: PropTypes.func,
  getNotifications: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  markAllNotificationsAsRead: PropTypes.func,
  resetNotifications: PropTypes.func
}

const mapStateToProps = state => ({
  items: state.notifications.items,
  refreshSteps: state.notifications.refreshSteps,
  totalUnRead: state.notifications.totalUnRead
})

const mapDispatchToProps = dispatch => ({
  subscribe: () => dispatch(NotificationsActions.subscribe()),
  getRead: () => dispatch(NotificationsActions.getRead()),
  getUnRead: () => dispatch(NotificationsActions.getUnRead()),
  getNotifications: pagination =>
    dispatch(NotificationsActions.getNotifications(pagination)),
  markNotificationAsRead: idNotificacion =>
    dispatch(NotificationsActions.markNotificationAsRead(idNotificacion)),
  markAllNotificationsAsRead: () =>
    dispatch(NotificationsActions.markAllNotificationsAsRead()),
  resetNotifications: () => dispatch(NotificationsActions.resetNotifications())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPopover)

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.titulo}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: 'text.secondary' }}
      >
        &nbsp; {notification.descripcion}
      </Typography>
    </Typography>
  )
  const avatar = (
    <img
      alt={notification.titulo}
      src="/assets/icons/ic_notification_mail.svg"
    />
  )

  return {
    avatar,
    title
  }
}

// ----------------------------------------------------------------------

function NotificationItem({ notification, onClick }) {
  const { avatar, title } = renderContent(notification)
  const daysFromToday = getTimeFromToday(notification.fechaCreacion)
  let dateMessage = ''

  if (daysFromToday >= 1) {
    dateMessage = `Hace ${daysFromToday} día${daysFromToday > 1 ? 's' : ''}`
  } else {
    const hoursFromToday = getTimeFromToday(notification.fechaCreacion, 'hours')

    if (hoursFromToday >= 1) {
      dateMessage = `Hace ${hoursFromToday} hora${hoursFromToday > 1 ? 's' : ''}`
    } else {
      const minutesFromToday = getTimeFromToday(
        notification.fechaCreacion,
        'minutes'
      )

      if (minutesFromToday >= 1) {
        dateMessage = `Hace ${minutesFromToday} minuto${minutesFromToday > 1 ? 's' : ''}`
      } else {
        const secondsFromToday = getTimeFromToday(
          notification.fechaCreacion,
          'seconds'
        )

        if (secondsFromToday >= 1) {
          dateMessage = `Hace ${secondsFromToday} segundo${secondsFromToday > 1 ? 's' : ''}`
        }
      }
    }
  }

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.leido && {
          bgcolor: 'action.selected'
        })
      }}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {dateMessage}
          </Typography>
        }
      />
    </ListItemButton>
  )
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    idNotificacion: PropTypes.number,
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    leido: PropTypes.bool,
    fechaCreacion: PropTypes.number,
    tipo: PropTypes.string,
    prioridad: PropTypes.string
  }),
  onClick: PropTypes.func
}
