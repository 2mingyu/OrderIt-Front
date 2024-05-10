interface AddToCartParams {
  cart: TypeCart;
  setCart: React.Dispatch<React.SetStateAction<TypeCart>>;
  cartKey: string;
  cartItem: TypeMenuItem;
  addNum: number;
}

export const addToCart = ({ cart, setCart, cartKey, cartItem, addNum }: AddToCartParams) => {
  setCart(prevCart => {
    const updatedCart = { ...prevCart };
    if (updatedCart[cartKey]) {
      updatedCart[cartKey].quantity += addNum;
    } else {
      updatedCart[cartKey] = {
        menuItem: cartItem,
        quantity: addNum,
      };
    }
    return updatedCart;
  });
};

interface PlusToCartParams {
  cart: TypeCart,
  setCart: React.Dispatch<React.SetStateAction<TypeCart>>,
  cartKey: string
  plusNum: number;
}

export const plusToCart = ({ cart, setCart, cartKey, plusNum }: PlusToCartParams) => {
  const updatedCart = { ...cart };
  updatedCart[cartKey].quantity += plusNum;
  setCart(updatedCart);
};

interface MinusFromCartParams {
  cart: TypeCart,
  setCart: React.Dispatch<React.SetStateAction<TypeCart>>,
  cartKey: string
  minusNum: number;
}

export const minusFromCart = ({ cart, setCart, cartKey, minusNum }: MinusFromCartParams) => {
  const updatedCart = { ...cart };

  if (updatedCart[cartKey] && updatedCart[cartKey].quantity > 1) {
    updatedCart[cartKey].quantity -= minusNum;
  }
  else {
    delete updatedCart[cartKey];
  }

  setCart(updatedCart);
};

export const clearCart = ( setCart: React.Dispatch<React.SetStateAction<TypeCart>> ) => {
  setCart({});
};
