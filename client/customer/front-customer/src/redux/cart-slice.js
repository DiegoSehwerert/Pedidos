import { createSlice } from '@reduxjs/toolkit'
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: []
  },
  reducers: {
    updateCart: (state, action) => {
      const productExists = state.cartProducts.find(product => product.id === action.payload.id)

      if (productExists) {
        state.cartProducts = state.cartProducts.map(product => {
          if (product.id === action.payload.id) {
            if (parseInt(action.payload.quantity) === 0 || action.payload.quantity < 0) {
              return null
            } else {
              return {
                ...product,
                ...action.payload
              }
            }
          } else {
            return product
          }
        }).filter(Boolean)
      } else {
        state.cartProducts.push(action.payload)
      }
    }
  }
})

export const { updateCart } = cartSlice.actions

export default cartSlice.reducer
