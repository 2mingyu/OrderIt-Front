import './MenuItemList.css';

import React from 'react';
import { useMenuList } from "../context/MenuListContext";
import MenuItem from './MenuItem';

interface MenuItemListProps {
  selectedCategory: string
  setSelectedMenu: (menuName: string) => void;
}

const MenuItemList: React.FC<MenuItemListProps> = ({ selectedCategory, setSelectedMenu }) => {
  const { menuList } = useMenuList();
  const menuItems = menuList[selectedCategory];
  return (
    <div className="menuList">
      {Object.keys(menuItems).map((menuName) => (
        <MenuItem
          key={menuName}
          menuName={menuName}
          menuDetails={menuItems[menuName]}
          setSelectedMenu={setSelectedMenu}
        />
      ))}
    </div>
  );
};

export default MenuItemList;
