import React from 'react'
import { Helmet } from 'react-helmet-async'

import { AppView } from '../_sections/overview/view'

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Inicio | Comisiones </title>
      </Helmet>

      <AppView />
    </>
  )
}
