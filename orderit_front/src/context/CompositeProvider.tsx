// 앱에 필요한 모든 Context Provider를 하나로 묶어서 관리
import React, { ReactNode } from 'react';
import { DineOrTakeoutProvider } from './DineOrTakeoutContext';
import { MenuListProvider } from './MenuListContext';
import { CartProvider } from './CartContext';

interface CompositeProviderProps {
  children: ReactNode;
}

const CompositeProvider: React.FC<CompositeProviderProps> = ({ children }) => {
  return (
    <DineOrTakeoutProvider>
      <MenuListProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </MenuListProvider>
    </DineOrTakeoutProvider>
  );
};

export default CompositeProvider;
