/* eslint-disable perfectionist/sort-imports */
import React from 'react'
import 'simplebar-react/dist/simplebar.min.css'

import { useScrollToTop } from '../_hooks/use-scroll-to-top'

import Router from '../_routes/sections'
import ThemeProvider from '../_theme'

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop()

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}
