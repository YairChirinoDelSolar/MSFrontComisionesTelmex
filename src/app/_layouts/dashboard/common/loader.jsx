import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

function Loader({ isLoading }) {
  const zIndex = 9999

  return (
    <Box
      sx={{
        display: isLoading ? 'block' : 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        top: 0,
        zIndex
      }}
    >
      <LinearProgress color="secondary" sx={{ zIndex }} />
    </Box>
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool
}

const mapStateToProps = state => ({
  isLoading: state.loading.isLoading
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
