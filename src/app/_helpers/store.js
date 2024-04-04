import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import rootReducer from '../_reducers'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat([thunk])
})
