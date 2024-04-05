// 사용 안함

import { useState, useEffect } from 'react';
import { useMenuList } from "../src/context/MenuListContext";
import { useCart } from "../src/context/CartContext";
import { addToCart } from '../src/utils/ManageCart';

import './MenuOptions.css';

interface MenuOptionsProps {
  selectedCategory: string;
  selectedMenu: string;
  closeMenuOptions: () => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ selectedCategory, selectedMenu, closeMenuOptions }) => {
  const { menuList } = useMenuList();
  const { cart, setCart } = useCart();
  const [selectedHotOrIce, setSelectedHotOrIce] = useState('');
  const [selectedShots, setSelectedShots] = useState(0);
  const [selectedDecaffeine, setSelectedDecaffeine] = useState('');
  const [selectedSizeup, setSelectedSizeup] = useState('');

  const addToCart_menuOptions = () => {
    const cartKey = `${selectedMenu}_${selectedHotOrIce}_${selectedShots}_${selectedDecaffeine}_${selectedSizeup}`;
    const cartItem = {
      menuName: selectedMenu,
      'HOT/ICE 선택': selectedHotOrIce,
      '샷 추가 횟수': selectedShots,
      '디카페인 선택': selectedDecaffeine,
      '사이즈업 선택': selectedSizeup,
      price: menuList[selectedCategory][selectedMenu].price,
    };
    const addNum = 1;
    addToCart({cart, setCart, cartKey, cartItem, addNum});
  };

  const hotIceOption = menuList[selectedCategory][selectedMenu]['HOT/ICE 여부'];
  const shotAddOption = menuList[selectedCategory][selectedMenu]['샷 추가 여부'];
  const decaffeineOption = menuList[selectedCategory][selectedMenu]['디카페인 여부'];
  const sizeupOption = menuList[selectedCategory][selectedMenu]['사이즈업 여부'];

  useEffect(() => {
    if (hotIceOption === 'HOT ONLY') setSelectedHotOrIce('HOT');
    else if (hotIceOption === 'ICE ONLY') setSelectedHotOrIce('ICE');
    else if (hotIceOption === 'Y') setSelectedHotOrIce('HOT');
    else if (hotIceOption === 'X') setSelectedHotOrIce('');
    setSelectedShots(0);
    setSelectedDecaffeine('');
    setSelectedSizeup('');
  }, [selectedMenu]);

  return (
    <div className="menuOptions-background">
      <div className="menuOptions-window">
        {hotIceOption === 'HOT ONLY' && (
          <div className="option"><h3 className='optionText'>HOT/ICE 선택</h3>
            <button onClick={() => setSelectedHotOrIce("HOT")} className={`optionButton ${selectedHotOrIce === "HOT" ? "selected" : ""}`}>HOT</button>
          </div>
        )}
        {hotIceOption === 'ICE ONLY' && (
          <div className="option"><h3 className='optionText'>HOT/ICE 선택</h3>
            <button onClick={() => setSelectedHotOrIce("ICE")} className={`optionButton ${selectedHotOrIce === "ICE" ? "selected" : ""}`}>ICE</button>
          </div>
        )}
        {hotIceOption === 'Y' && (
          <div className="option"><h3 className='optionText'>HOT/ICE 선택</h3>
            <>
              <button onClick={() => setSelectedHotOrIce("HOT")} className={`optionButton ${selectedHotOrIce === "HOT" ? "selected" : ""}`}>HOT</button>
              <button onClick={() => setSelectedHotOrIce("ICE")} className={`optionButton ${selectedHotOrIce === "ICE" ? "selected" : ""}`}>ICE</button>
            </>
          </div>
        )}
        {shotAddOption === 'Y' && (
          <div className="option"><h3 className='optionText'>샷 추가 횟수 {selectedShots}</h3>
            <button onClick={() => setSelectedShots(selectedShots + 1)} className='optionButton'>+</button>
            <button onClick={() => setSelectedShots(selectedShots > 0? selectedShots - 1 : 0)} className='optionButton'>-</button> {/* 샷 제거 버튼 */}
          </div>
        )}
        {decaffeineOption === 'Y' && (
          <div className="option">
            <h3 className='optionText'>디카페인</h3>
            <button onClick={() => setSelectedDecaffeine(selectedDecaffeine === '디카페인' ? '' : '디카페인')} className={`optionButton ${selectedDecaffeine === '디카페인' ? 'selected' : ''}`}></button>
          </div>
        )}
        {sizeupOption === 'Y' && (
          <div className="option">
            <h3 className='optionText'>사이즈업</h3>
            <button onClick={() => setSelectedSizeup(selectedSizeup === '사이즈업' ? '' : '사이즈업')} className={`optionButton ${selectedSizeup === '사이즈업' ? 'selected' : ''}`}></button>
          </div>
        )}
        <button className='optionButton2' onClick={() => {addToCart_menuOptions(); closeMenuOptions()}}>장바구니에 추가</button>
        <button className='optionButton2' onClick={closeMenuOptions}>닫기</button>
      </div>
    </div>
  );
};

export default MenuOptions;
