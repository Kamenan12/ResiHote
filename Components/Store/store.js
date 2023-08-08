import { configureStore } from '@reduxjs/toolkit'
import getHoteSlice from './getHoteSlice'

export const store = configureStore({
  reducer: {
    hote: getHoteSlice,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //   immutableCheck: false,
    //   serializableCheck: false,
    // })
  },
})