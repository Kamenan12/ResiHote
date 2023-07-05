import { configureStore } from '@reduxjs/toolkit'
import getHoteSlice from './getHoteSlice'

export const store = configureStore({
  reducer: {
    hote: getHoteSlice,
  },
})