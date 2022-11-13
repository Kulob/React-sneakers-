import React from "react";
import { AppContext } from "../App";

export const useCart = () => {
  const { cartBasket, setCartBasket } = React.useContext(AppContext);
  const totalPrice = cartBasket.reduce((sum, obj) => obj.price + sum, 0);

  return { cartBasket, setCartBasket, totalPrice };
};