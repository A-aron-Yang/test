import React, { createContext, useReducer, useContext } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, name, price, quantity } = action.payload
      const existing = state.find(item => item.id === id)
      if (existing) {
        // bump quantity
        return state.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...state, { id, name, price, quantity }]
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id)
    case 'CLEAR_CART':
      return []
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, [])
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

export function useCart() {
  return useContext(CartStateContext)
}
export function useCartDispatch() {
  return useContext(CartDispatchContext)
}
