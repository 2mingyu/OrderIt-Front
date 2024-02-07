interface cartItem {
  menuName: string;
  'HOT/ICE 선택': string;
  '샷 추가 횟수': number;
  '디카페인 선택': string;
  '사이즈업 선택': string;
  price: number;
}

interface AddToCartParams {
  cart: { [key: string]: any };
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  cartKey: string;
  cartItem: cartItem;
  addNum: number;
}

export const addToCart = ({ cart, setCart, cartKey, cartItem, addNum }: AddToCartParams) => {
  const updatedCart = { ...cart };

  if (updatedCart[cartKey]) {
    updatedCart[cartKey].quantity += 1;
  }
  else {
    updatedCart[cartKey] = {
      ...cartItem,
      quantity: 1,
    };
  }

  setCart(updatedCart);
};

interface PlusToCartParams {
  cart: { [key: string]: any },
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>,
  cartKey: string
  plusNum: number;
}

export const plusToCart = ({ cart, setCart, cartKey, plusNum }: PlusToCartParams) => {
  const updatedCart = { ...cart };
  updatedCart[cartKey].quantity += 1;
  setCart(updatedCart);
};

interface MinusFromCartParams {
  cart: { [key: string]: any },
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>,
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

export const clearCart = ( setCart: React.Dispatch<React.SetStateAction<{ [key: string]: any }>> ) => {
  setCart({});
};
