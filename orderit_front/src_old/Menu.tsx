import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Menu.css";

// 회의 때 확인할 것. 옵션들 가격 

interface MenuProps {
  setCurrentPage: (value: string) => void;
  menuList: {
    [category: string]: {         // 'Coffee' 'NonCoffee' 'Dessert'
      [menuName: string]: {       // '에스프레소' '아메리카노' '그린티 라떼' '레몬에이드' ..
        'HOT/ICE 여부': string;   // 'HOT ONLY' 'Y' 'ICE ONLY' 'X'
        '샷 추가 여부': string;   // 'N' 'Y' 'X'
        '디카페인 여부': string;  // 'N' 'Y' 'X'
        '사이즈업 여부': string;  // 'N' 'Y'
        price: number;
      }
    }
  };
  cart: {
    [cartKey: string]: {
      menuName: string;         // '에스프레소' '아메리카노' '그린티 라떼' '레몬에이드' ..
      'HOT/ICE 선택': string;   // 'HOT' 'ICE' 'NONE'
      '샷 추가 횟수': number;
      '디카페인 선택': string;  // '디카페인' ''
      '사이즈업 선택': string;  // '사이즈업' ''
      quantity: number;
      price: number;
    };
  };
  setCart: (cart: {
    [cartKey: string]: {
      menuName: string;       // '에스프레소' '아메리카노' '그린티 라떼' '레몬에이드' ..
      'HOT/ICE 선택': string; // 'HOT' 'ICE' ''
      '샷 추가 횟수': number;
      '디카페인 선택': string;  // '디카페인' ''
      '사이즈업 선택': string;  // '사이즈업' ''
      quantity: number;
      price: number;
    };
  }) => void;
}

const Menu: React.FC<MenuProps> = ({ setCurrentPage, menuList, cart, setCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("Coffee");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isCard, setCard] = useState(false);
  const [selectedHotOrIce, setSelectedHotOrIce] = useState("");
  const [selectedShots, setSelectedShots] = useState(0);
  const [selectedDecaffeine, setSelectedDecaffeine] = useState('');
  const [selectedSizeup, setSelectedSizeup] = useState('');

  // selectedMenu가 변경될 때 (새로운 menuOptions가 render될 때)
  useEffect(() => {
    if (selectedMenu !== "") {
      const hotIceOption = menuList[selectedCategory][selectedMenu]['HOT/ICE 여부'];
      if (hotIceOption === 'HOT ONLY') setSelectedHotOrIce('HOT');
      else if (hotIceOption === 'ICE ONLY') setSelectedHotOrIce('ICE');
      else if (hotIceOption === 'Y') setSelectedHotOrIce('HOT');
      else if (hotIceOption === 'X') setSelectedHotOrIce('');

      setSelectedShots(0);
      setSelectedDecaffeine('');
      setSelectedSizeup('');
    }
  }, [selectedMenu]);

  // 결체 창 열기
  const openCard = () => {
    setCard(true);
  };

  //
  const showMenuOptions = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  //
  const closeMenuOptions = () => {
    setSelectedMenu("");
  };

  // 
  const renderMenuOptions = () => {
    if (selectedMenu === "") {
      return null;
    }
    const hotIceOption = menuList[selectedCategory][selectedMenu]['HOT/ICE 여부'];
    const shotAddOption = menuList[selectedCategory][selectedMenu]['샷 추가 여부'];
    const decaffeineOption = menuList[selectedCategory][selectedMenu]['디카페인 여부'];
    const sizeupOption = menuList[selectedCategory][selectedMenu]['사이즈업 여부'];
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
            <div className="option"><h3 className='optionText'>샷 추가 횟수 {selectedShots} {/* 샷 추가 횟수 표시 */} </h3>
              <button onClick={() => setSelectedShots(selectedShots + 1)} className='optionButton'>+</button> {/* 샷 추가 버튼 */}
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

  const addToCart_menuOptions = () => {
    const cartKey = `${selectedMenu}_${selectedHotOrIce}_${selectedShots}_${selectedDecaffeine}_${selectedSizeup}`;
    addToCart(cartKey, 1);
  }

  const addToCart = (cartKey: string, addNum: number) => {
    const updatedCart = { ...cart };

    if (updatedCart[cartKey]) {
      updatedCart[cartKey].quantity += addNum;
    } else {
      updatedCart[cartKey] = {
        menuName: selectedMenu,
        quantity: addNum,
        price: menuList[selectedCategory][selectedMenu].price,
        'HOT/ICE 선택': selectedHotOrIce,
        '샷 추가 횟수': selectedShots,
        '디카페인 선택': menuList[selectedCategory][selectedMenu]['디카페인 여부'],
        '사이즈업 선택': menuList[selectedCategory][selectedMenu]['사이즈업 여부'],
      };
    }
    setCart(updatedCart);
  };

  const removeFromCart = (cartKey: string, removeNum: number) => {
    const updatedCart = { ...cart };

    if (updatedCart[cartKey]) {
      updatedCart[cartKey].quantity -= removeNum;
      if (updatedCart[cartKey].quantity <= 0) {
        delete updatedCart[cartKey];
      }
      setCart(updatedCart);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    for (const cartKey in cart) {
      total += cart[cartKey].quantity * cart[cartKey].price;
    }
    return total;
  };

  useEffect(() => {
    setCart({});
  }, []);

  return (
    <div className="MenuWindow">
      <div className="categoryButtons">
        {Object.keys(menuList).map((category) => (
          <div className={`categoryButton ${selectedCategory === category ? 'selected' : ''}`}
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="menuList">
        {Object.keys(menuList[selectedCategory]).map((menuName) => (
          <div className="menuElement" key={menuName} onClick={() => showMenuOptions(menuName)}>
            <div className="menuImage">이미지 들어갈 자리</div>
            <div className="menuInfo">
              <h2>{menuName}</h2>
              <h3 className="menuPrice">{menuList[selectedCategory][menuName].price}원</h3>
            </div>
          </div>
        ))}
      </div>
      {renderMenuOptions()}
      <div className='bottomContainer'>
        <div className='ASR-text'>
          여기에 음성인식 내용이 들어갈거임
        </div>
        <div className="cartList">
          <h2 className='cartText'>장바구니</h2>
            {Object.keys(cart).map((cartKey) => (
              <div key={cartKey}>
                <div className='cartElement'>
                  <h3 className='cartText'>{cartKey}</h3>
                  <button className='optionButton' onClick={() => removeFromCart(cartKey, 1)}>-</button>
                  <h3>{cart[cartKey].quantity}</h3>
                  <button className='optionButton'onClick={() => addToCart(cartKey, 1)}>+</button>
                </div>
              </div>
            ))}
        </div>
        <div className="bottom-rightContainer">
          <div className="bottom-rightTextContainer">
            <h2 className='bottom-rightText'>주문금액</h2>
            <h2 className='bottom-rightText'>{calculateTotal()} 원</h2>
          </div>
          <div className="bottom-rightButtonContainer">
            <button className='bottom-rightButton' onClick={() => setCart({})}>전체삭제</button>
            <button className="bottom-rightButton" onClick={openCard}>결제하기</button>
          </div>
        </div>
      </div>
      {isCard && (
        <div className="CardOverMenu">
          <Card setCurrentPage={setCurrentPage} setCard={setCard} total={calculateTotal()} />
        </div>
        )}
    </div>
  );
};

export default Menu;
