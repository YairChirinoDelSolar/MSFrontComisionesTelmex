import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

import Snackbar from '@mui/material/Snackbar'

import * as ToastActions from '../../../_actions/toast.actions'

function Toaster({ toast, popToast }) {
  const open = false
  const anchorOrigin = { vertical: 'top', horizontal: 'center' }
  const autoHideDuration = 3000

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    toast.forEach(tnot => {
      const { message, type: variant = 'info' } = tnot

      enqueueSnackbar(message, {
        anchorOrigin,
        variant,
        autoHideDuration,
        preventDuplicate: true,
        onClose: () => {
          popToast(tnot)
        }
      })
    })
  }, [toast])

  return <Snackbar open={open} />
}

Toaster.propTypes = {
  toast: PropTypes.array,
  popToast: PropTypes.func
}

const mapStateToProps = state => ({
  toast: state.toast.toast
})

const mapDispatchToProps = dispatch => ({
  popToast: notification => dispatch(ToastActions.popToast(notification))
})

export default connect(mapStateToProps, mapDispatchToProps)(Toaster)
