import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cart: TypeCart; // 카트 리스트의 타입을 더 구체적으로 정의할 수 있습니다.
  setCart: React.Dispatch<React.SetStateAction<TypeCart>>; // 카트 리스트를 설정하는 함수
}

// 초기 상태 정의
const initialState: CartContextType = {
  cart: {}, // 초기 카트 리스트는 비어 있음
  setCart: () => {}, // 초기 set 함수는 빈 함수
};

// Context 생성
const CartContext = createContext<CartContextType>(initialState);

// Provider 컴포넌트 정의
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState(initialState.cart);

  // useEffect를 사용하여 카트 상태가 변할 때마다 로그를 남깁니다.
  useEffect(() => {
    console.log('Cart Updated:', cart);
  }, [cart]);  // cart 상태가 변화할 때마다 이 useEffect가 실행됩니다.
  
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => useContext(CartContext);
