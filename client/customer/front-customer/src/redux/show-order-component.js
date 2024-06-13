import { createSlice } from '@reduxjs/toolkit'

export const orderComponentSlice = createSlice({
  name: 'orderComponent',
  initialState: {
    orderComponentVisible: false
  },
  reducers: {
    showOrderComponent: (state) => {
      state.orderComponentVisible = true
    }
  }
})

export const { showOrderComponent } = orderComponentSlice.actions

export default orderComponentSlice.reducer
