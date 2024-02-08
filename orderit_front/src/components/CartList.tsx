// src/components/CartList.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import './CartList.css'; // 카트 리스트에 대한 CSS 파일
import { plusToCart, minusFromCart } from '../utils/ManageCart';

const CartList: React.FC = () => {
  const { cart, setCart } = useCart();
  const plusNum = 1;
  const minusNum = 1;

  return (
    <div className="cartList">
      <h2 className='cartText'>장바구니</h2>
        {Object.keys(cart).map((cartKey) => (
          <div key={cartKey}>
            <div className='cartElement'>
              <h3 className='cartText'>{cartKey}</h3>
              <button className='optionButton' onClick={() => minusFromCart({ cart, setCart, cartKey, minusNum })}>-</button>
              <h3>{cart[cartKey].quantity}</h3>
              <button className='optionButton'onClick={() => plusToCart({ cart, setCart, cartKey, plusNum })}>+</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CartList;
