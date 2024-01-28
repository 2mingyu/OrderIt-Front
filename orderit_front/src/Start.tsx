import React, { useEffect } from "react";
import "./Start.css";
import image1 from "./image-포장.png";
import image2 from "./image-매장.png";

interface StartProps {
  setCurrentPage: (value: string) => void;
  setMenuList: (value: object) => void;
  setTOGO: (value: string) => void;
}

const Start: React.FC<StartProps> = ({ setCurrentPage, setMenuList, setTOGO }) => {

  const LoadMenu = () => {
    // TODO: 백엔드에서 메뉴 가져와서 tmpMenuList 에 넣기
    let tmpMenuList = {
      'Coffee': {
        '에스프레소': {
          'HOT/ICE 여부': 'HOT ONLY',
          '샷 추가 여부': 'N',
          '디카페인 여부': 'N',
          '사이즈업 여부': 'N',
          price: 1000
        },
        '아메리카노': {
          'HOT/ICE 여부': 'Y',
          '샷 추가 여부': 'Y',
          '디카페인 여부': 'Y',
          '사이즈업 여부': 'Y',
          price: 2000
        },
        '에스프레소2': {
          'HOT/ICE 여부': 'HOT ONLY',
          '샷 추가 여부': 'N',
          '디카페인 여부': 'N',
          '사이즈업 여부': 'N',
          price: 1000
        },
        '아메리카노2': {
          'HOT/ICE 여부': 'Y',
          '샷 추가 여부': 'Y',
          '디카페인 여부': 'Y',
          '사이즈업 여부': 'Y',
          price: 2000
        },
        '에스프레소3': {
          'HOT/ICE 여부': 'HOT ONLY',
          '샷 추가 여부': 'N',
          '디카페인 여부': 'N',
          '사이즈업 여부': 'N',
          price: 1000
        },
        '아메리카노3': {
          'HOT/ICE 여부': 'Y',
          '샷 추가 여부': 'Y',
          '디카페인 여부': 'Y',
          '사이즈업 여부': 'Y',
          price: 2000
        }
      },
      'NonCoffee': {
        '그린티 라떼': {
          'HOT/ICE 여부': 'ICE ONLY',
          '샷 추가 여부': 'N',
          '디카페인 여부': 'N',
          '사이즈업 여부': 'Y',
          price: 3000
        },
        '레몬 에이드': {
          'HOT/ICE 여부': 'ICE ONLY',
          '샷 추가 여부': 'N',
          '디카페인 여부': 'N',
          '사이즈업 여부': 'Y',
          price: 4000
        }
      },
      'Dessert': {
        '레드벨벳케이크': {
          'HOT/ICE 여부': 'X',
          '샷 추가 여부': 'X',
          '디카페인 여부': 'X',
          '사이즈업 여부': 'N',
          price: 5000
        },
        '롤 케이크': {
          'HOT/ICE 여부': 'X',
          '샷 추가 여부': 'X',
          '디카페인 여부': 'X',
          '사이즈업 여부': 'N',
          price: 6000
        }
      }
    };
    setMenuList(tmpMenuList);
  }

  useEffect(() => {
    LoadMenu();
  }, []);

  return (
    <div className="StartWindow">
      <div className="div-1">
        <h2>주문 방법을 선택해 주세요</h2>
      </div>
      <div className="div-2">
        <div className="div-3" onClick={() => { setTOGO('포장'); setCurrentPage('Menu'); }}>
          <h2>포장</h2>
          <img className="image" alt="포장" src={image1} />
        </div>
        <div className="div-3" onClick={() => { setTOGO('매장'); setCurrentPage('Menu'); }}>
          <h2>매장</h2>
          <img className="image" alt="매장" src={image2} />
        </div>
      </div>
    </div>
  );
};

export default Start;