import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'

import Nav from './nav'
import Main from './main'
import Header from './header'

import Loader from './common/loader'

// ----------------------------------------------------------------------

function DashboardLayout({ loggedIn, children }) {
  const [openNav, setOpenNav] = useState(false)

  return (
    <>
      <Loader />
      {loggedIn && <Header onOpenNav={() => setOpenNav(true)} />}
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' }
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  )
}

DashboardLayout.propTypes = {
  loggedIn: PropTypes.bool,
  children: PropTypes.node
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
})

export default connect(mapStateToProps, () => ({}))(DashboardLayout)
