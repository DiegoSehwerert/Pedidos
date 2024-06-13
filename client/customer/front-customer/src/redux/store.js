import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart-slice'
import orderComponentReducer from './show-order-component'
import checkoutSlice from './show-checkout'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orderComponent: orderComponentReducer,
    checkout: checkoutSlice
  }
})

export default store
