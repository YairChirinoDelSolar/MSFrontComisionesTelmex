import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SnackbarProvider } from 'notistack'

import { store } from '@helpers'

// setup fake backend
import App from '@app'

const root = createRoot(document.getElementById('root'))

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </Suspense>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
)
