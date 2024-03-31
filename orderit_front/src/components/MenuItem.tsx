import React from 'react';
import './MenuItem.css';
import { useCart } from '../context/CartContext';
import { addToCart } from '../utils/ManageCart';

interface MenuItemProps {
  menuName: string;
  menuDetails: any;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuName, menuDetails }) => {
  const { cart, setCart } = useCart();

  const handleClick = (menuName: string) => {
    const cartKey = menuName;
    const cartItem = {
      menuName: menuName,
      price: menuDetails.price,
    };
    const addNum = 1;
    addToCart({cart, setCart, cartKey, cartItem, addNum});
  }

  return (
    <div className="menuItem" onClick={() => handleClick(menuName)}>
      <img src={menuDetails.imageUrl} className="menuImage" alt="menuImage"/>
      <div className="menuInfo">
        <h2 className="menuName">{menuName}</h2>
        <h3 className="menuPrice">{menuDetails.price}원</h3>
      </div>
    </div>
  );
};

export default MenuItem;
