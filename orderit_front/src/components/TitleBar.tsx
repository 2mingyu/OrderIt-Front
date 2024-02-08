import { useNavigate } from 'react-router-dom';
import { useDineOrTakeout } from '../context/DineOrTakeoutContext';

import './TitleBar.css';
import LOGO from '../assets/OrderIt-logo.png';



const TitleBar: React.FC = () => {
  const navigate = useNavigate();
  const { dineOrTakeout } = useDineOrTakeout();

  const handleClick = () => {
      navigate('/');
    };
  const message = dineOrTakeout === 'Dine' ? '매장' : '포장';

  return (
      <div className='TitleBar'>
          <div className='div-1'>
              <img className='LOGO' alt='LOGO' src={LOGO} />
              <div className='div-2'>
                <h1 className='tight-margin'>메뉴를 선택해 주세요</h1>
                <h1 className='tight-margin'>({message})</h1>
              </div>
          </div>
          <div className='Back' onClick={handleClick}>
              <h1>돌아가기</h1>
          </div>
      </div>
  )
}

export default TitleBar;