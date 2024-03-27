import { useEffect } from "react";
import { useMenuList } from '../context/MenuListContext';
import { useDineOrTakeout } from '../context/DineOrTakeoutContext';
import GetMenuList from '../utils/GetMenuList';
import { API_URL } from '../utils/apiConfig';

import './HomePage.css';
import LOGO from '../assets/OrderIt-logo.png';
import DineOrTakeoutButton from '../components/DineOrTakeoutButton';


const Home: React.FC = () => {
  const { setMenuList } = useMenuList();
  const { setDineOrTakeout } = useDineOrTakeout();

  useEffect(() => {
    setDineOrTakeout('');
    GetMenuList(setMenuList);
  }, [setMenuList, setDineOrTakeout]);

  return (
    <div className='home-page'>
      <img className='LOGO' alt="LOGO" src={LOGO}></img>
      <h1 className='h1'>주문 방법을 선택해 주세요</h1>
      <div className='buttons'>
        <DineOrTakeoutButton type='Dine'></DineOrTakeoutButton>
        <DineOrTakeoutButton type='Takeout'></DineOrTakeoutButton>
      </div>
      <div className='swagger' onClick={() => {window.open(`http://${API_URL}/swagger-ui/index.html`);}}>swagger</div>
    </div>
  );
};

export default Home;