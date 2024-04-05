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
        {Object.keys(cart).reverse().map((cartKey) => (
          <div key={cartKey}>
            <div className='cartElement'>
              <h3 className='cartText'>{cartKey}</h3>
              <div className='cartButton' onClick={() => minusFromCart({ cart, setCart, cartKey, minusNum })}>-</div>
              <h3 className='quantity-text'>{cart[cartKey].quantity}</h3>
              <div className='cartButton'onClick={() => plusToCart({ cart, setCart, cartKey, plusNum })}>+</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CartList;
