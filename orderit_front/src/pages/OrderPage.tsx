import { useState, useEffect } from "react";

import { useMenuList } from "../context/MenuListContext";
import { useCart } from "../context/CartContext";

import './OrderPage.css';
import TitleBar from '../components/TitleBar';
import CategoryButtons from '../components/CategoryButtons';
import MenuItemList from '../components/MenuItemList';
import MenuOptions from '../components/MenuOptions';
import ASR from '../components/ASR';
import CartList from '../components/CartList';
import Payment from '../components/Payment';


const Order: React.FC = () => {
  const { menuList } = useMenuList();
  const { setCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(menuList)[0]); // 첫 번째 카테고리 키 값으로 설정
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isPayment, setIsPayment] = useState(false);

  useEffect(() => {
    setCart({}); // 카트를 빈 객체로 초기화
  }, [setCart]);

  return (
    <div className="order-page">
      <TitleBar />
      <CategoryButtons selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={Object.keys(menuList)} />
      <MenuItemList selectedCategory={selectedCategory} setSelectedMenu={setSelectedMenu} />
      {selectedMenu &&
        <MenuOptions selectedCategory={selectedCategory} selectedMenu={selectedMenu} closeMenuOptions={() => setSelectedMenu("")} />
      }
      <div className='container-1'>
        <ASR/>
        <CartList/>
        <div className='container-2'>
            <h2 className='container-2-text'>주문금액</h2>
            <h2 className='container-2-text'>{0}원</h2>
            <h2 className='container-2-button' onClick={() => setCart({})}>전체삭제</h2>
            <h2 className='container-2-button' onClick={() => setIsPayment(true)}>결제하기</h2>
        </div>
      </div>
      {isPayment && 
        <Payment setIsPayment={setIsPayment} total={0}/>
      }
    </div>
  );
};

export default Order;
