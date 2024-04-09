import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuListContextType {
  menuList: TypeMenuList;
  setMenuList: (menuList: TypeMenuList) => void; // 메뉴 리스트를 설정하는 함수
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
