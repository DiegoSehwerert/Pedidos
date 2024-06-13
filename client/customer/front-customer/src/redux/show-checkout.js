import { createSlice } from '@reduxjs/toolkit'

export const checkoutSlice = createSlice({
  name: 'checkout-slice',
  initialState: {
    checkoutVisible: false
  },
  reducers: {
    checkoutSlice: (state) => {
      state.checkoutVisible = true
    }
  }
})

export const { checkaoutReducer } = checkoutSlice.actions

export default checkoutSlice.reducer
