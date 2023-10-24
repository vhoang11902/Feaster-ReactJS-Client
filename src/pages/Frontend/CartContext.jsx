import { createContext } from "react";

const CartContext = createContext({
    cartItems: [],
    setCartItems: () => {}
  });
  
export default CartContext;