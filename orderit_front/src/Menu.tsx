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
      <div className="menuOptions">
        {hotIceOption === 'HOT ONLY' && (
          <p>HOT/ICE 선택:
            <button onClick={() => setSelectedHotOrIce("HOT")} className={selectedHotOrIce === "HOT" ? "selected" : ""}>HOT</button>
          </p>
        )}
        {hotIceOption === 'ICE ONLY' && (
          <p>HOT/ICE 선택:
            <button onClick={() => setSelectedHotOrIce("ICE")} className={selectedHotOrIce === "ICE" ? "selected" : ""}>ICE</button>
          </p>
        )}
        {hotIceOption === 'Y' && (
          <p>HOT/ICE 선택:
            <>
              <button onClick={() => setSelectedHotOrIce("HOT")} className={selectedHotOrIce === "HOT" ? "selected" : ""}>HOT</button>
              <button onClick={() => setSelectedHotOrIce("ICE")} className={selectedHotOrIce === "ICE" ? "selected" : ""}>ICE</button>
            </>
          </p>
        )}
        {shotAddOption === 'Y' && (
          <p>샷 추가 횟수: {selectedShots} {/* 샷 추가 횟수 표시 */}
            <button onClick={() => setSelectedShots(selectedShots + 1)}>+</button> {/* 샷 추가 버튼 */}
            <button onClick={() => setSelectedShots(selectedShots - 1)}>-</button> {/* 샷 제거 버튼 */}
          </p>
        )}
        {decaffeineOption === 'Y' && (
          <p>
            디카페인 여부:
            <input
              type="checkbox"
              checked={selectedDecaffeine === '디카페인'}
              onChange={() => setSelectedDecaffeine(selectedDecaffeine === '디카페인' ? '' : '디카페인')}
            />
          </p>
        )}
        {sizeupOption === 'Y' && (
          <p>
            사이즈업 여부:
            <input
              type="checkbox"
              checked={selectedSizeup === '사이즈업'}
              onChange={() => setSelectedSizeup(selectedSizeup === '사이즈업' ? '' : '사이즈업')}
            />
          </p>
        )}
        <button onClick={closeMenuOptions}>닫기</button>
        <button onClick={() => addToCart_menuOptions()}>장바구니에 추가</button>
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
          <div className="categoryButton"
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="menuList">
        {Object.keys(menuList[selectedCategory]).map((menuName) => (
          <div key={menuName} onClick={() => showMenuOptions(menuName)}>
            <h2>{menuName}</h2>
          </div>
        ))}
      </div>
      {renderMenuOptions()}
      <div className="cartList">
        <h3>장바구니</h3>
        <ul>
          {Object.keys(cart).map((cartKey) => (
            <li key={cartKey}>
              {cartKey}: {cart[cartKey].quantity}개
              <button onClick={() => removeFromCart(cartKey, 1)}>빼기</button>
              <button onClick={() => addToCart(cartKey, 1)}>더하기</button>
            </li>
          ))}
        </ul>
        <p>총 가격: {calculateTotal()}원</p>
      </div>
      <button onClick={() => setCart({})}>장바구니 전체 비우기</button> {/* 장바구니 전체 비우기 버튼 */}
      <div className="openCardButton" onClick={openCard}>
        결제하기 ({calculateTotal()}원)
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
