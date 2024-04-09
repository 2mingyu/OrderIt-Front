import './MenuItemList.css';

import React from 'react';
import { useMenuList } from "../context/MenuListContext";
import MenuItem from './MenuItem';

interface MenuItemListProps {
  selectedCategory: string
}

const MenuItemList: React.FC<MenuItemListProps> = ({ selectedCategory }) => {
  const { menuList } = useMenuList();
  const menuItems = menuList[selectedCategory];
  return (
    <div className="menuList">
      {Object.keys(menuItems).map((menuName) => (
        <MenuItem
          key={menuName}
          menuDetails={menuItems[menuName]}
        />
      ))}
    </div>
  );
};

export default MenuItemList;
