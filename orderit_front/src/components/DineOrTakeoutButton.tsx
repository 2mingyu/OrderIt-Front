import { useNavigate } from 'react-router-dom';
import { useDineOrTakeout } from '../context/DineOrTakeoutContext';

import './DineOrTakeoutButton.css';
import DineImage from '../assets/Dine-icon.png';
import TakeoutImage from '../assets/Takeout-icon.webp';

interface DineOrTakeoutButtonProps {
  type: 'Dine' | 'Takeout';
}

const DineOrTakeoutButton: React.FC<DineOrTakeoutButtonProps> = (props) => {
  const navigate = useNavigate();
  const { setDineOrTakeout } = useDineOrTakeout();
  const { type } = props;
  
  const handleClick = () => {
    setDineOrTakeout(type);
    navigate('/Order');
  };
  const imageSrc = type === 'Dine'? DineImage : TakeoutImage;
  const buttonText = type === 'Dine'? '매장' : '포장';
  
  return (
    <div className='DineOrTakeoutButton' onClick={handleClick}>
      <img className="image" src={imageSrc} alt={buttonText} />
      <h2>{buttonText}</h2>
    </div>
  );
};

export default DineOrTakeoutButton;