import { useState, useEffect } from "react";

import { useMenuList } from "../context/MenuListContext";
import { useCart } from "../context/CartContext";

import './OrderPage.css';
import TitleBar from '../components/TitleBar';
import CategoryButtons from '../components/CategoryButtons';
import MenuItemList from '../components/MenuItemList';
// import MenuOptions from '../components/MenuOptions';
import ASR from '../components/ASR';
import CartList from '../components/CartList';
import Payment from '../components/Payment';
import Result from '../components/Result';


const OrderPage: React.FC = () => {
  const { menuList } = useMenuList();
  const { cart, setCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(menuList)[0]); // 첫 번째 카테고리 키 값으로 설정
  // const [selectedMenu, setSelectedMenu] = useState("");
  const [isPayment, setIsPayment] = useState('before'); // before, wait, after
  const [orderId, setOrderId] = useState(-1);

  const calculateTotal = () => {
    return Object.values(cart).reduce((total: number, item: TypeCartItem) => {
      return total + item.menuItem.price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    setCart({}); // 카트를 빈 객체로 초기화
  }, [setCart]);

  return (
    <div className="order-page">
      <TitleBar />
      <CategoryButtons selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={Object.keys(menuList)} />
      <MenuItemList selectedCategory={selectedCategory} />
      {/* MenuOptions 폐기
        selectedMenu &&
        <MenuOptions selectedCategory={selectedCategory} selectedMenu={selectedMenu} closeMenuOptions={() => setSelectedMenu("")} />
      */}
      <div className='container-1'>
        <ASR setIsPayment={setIsPayment}/>
        <CartList/>
        <div className='container-2'>
            <h2 className='container-2-text'>주문금액</h2>
            <h2 className='container-2-text'>{calculateTotal()}원</h2>
            <h2 className='container-2-button' onClick={() => setCart({})}>전체삭제</h2>
            <h2 className='container-2-button' onClick={() => setIsPayment('wait')}>결제하기</h2>
        </div>
      </div>
      {isPayment==='wait' && 
        <Payment setIsPayment={setIsPayment} total={calculateTotal()} setOrderId={setOrderId}/>
      }
      {isPayment==='after' &&
        <Result orderId={orderId} />
      }
    </div>
  );
};

export default OrderPage;
