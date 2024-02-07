import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cart: any; // 카트 리스트의 타입을 더 구체적으로 정의할 수 있습니다.
  setCart: (cart: any) => void; // 카트 리스트를 설정하는 함수
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

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => useContext(CartContext);
