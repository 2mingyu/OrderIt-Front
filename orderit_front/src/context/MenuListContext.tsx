import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuListContextType {
  menuList: any; // 메뉴 리스트의 타입을 더 구체적으로 정의할 수 있습니다.
  setMenuList: (menuList: any) => void; // 메뉴 리스트를 설정하는 함수
}

// 초기 상태 정의
const initialState: MenuListContextType = {
  menuList: {}, // 초기 메뉴 리스트는 비어 있음
  setMenuList: () => {}, // 초기 set 함수는 빈 함수
};

// Context 생성
const MenuListContext = createContext<MenuListContextType>(initialState);

// Provider 컴포넌트 정의
export const MenuListProvider = ({ children }: { children: ReactNode }) => {
  const [menuList, setMenuList] = useState(initialState.menuList);

  return (
    <MenuListContext.Provider value={{ menuList, setMenuList }}>
      {children}
    </MenuListContext.Provider>
  );
};

// Custom Hook
export const useMenuList = () => useContext(MenuListContext);
