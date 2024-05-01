import React from 'react';
import './MenuItem.css';
import { useCart } from '../context/CartContext';
import { addToCart } from '../utils/ManageCart';

interface MenuItemProps {
  menuDetails: TypeMenuItem;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuDetails }) => {
  const { cart, setCart } = useCart();

  const handleClick = (menuName: string) => {
    const cartKey = menuName;
    const cartItem = menuDetails;
    const addNum = 1;
    addToCart({cart, setCart, cartKey, cartItem, addNum});
  }

  return (
    <div className="menuItem" onClick={() => handleClick(menuDetails.kor_name)}>
      {menuDetails.imageObj && 
      <img src={menuDetails.imageObj.src} className="menuImage" alt={menuDetails.eng_name}/>}
      <div className="menuInfo">
        <h2 className="menuName">{menuDetails.kor_name}</h2>
        <h3 className="menuPrice">{menuDetails.price}원</h3>
      </div>
    </div>
  );
};

export default MenuItem;
