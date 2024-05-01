
import { API_URL_SPRING } from '../utils/apiConfig_spring';

import './HomePage.css';
import LOGO from '../assets/OrderIt-logo.png';
import DineOrTakeoutButton from '../components/DineOrTakeoutButton';
import { API_URL_FLASK } from "../utils/apiConfig_flask";


const Home: React.FC = () => {

  return (
    <div className='home-page'>
      <img className='LOGO' alt="LOGO" src={LOGO}></img>
      <h1 className='h1'>주문 방법을 선택해 주세요</h1>
      <div className='buttons'>
        <DineOrTakeoutButton type='Dine'></DineOrTakeoutButton>
        <DineOrTakeoutButton type='Takeout'></DineOrTakeoutButton>
      </div>
      <div className='swagger'>
        <div onClick={() => {window.open(`http://${API_URL_SPRING}/swagger-ui/index.html`);}}>spring swagger</div>
        <div onClick={() => {window.open(`http://${API_URL_FLASK}`);}}>flask swagger</div>
      </div>
    </div>
  );
};

export default Home;