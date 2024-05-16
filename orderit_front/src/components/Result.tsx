import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Result.css';
import ReceptIcon from '../assets/Recept-icon.webp'
import { API_URL_SPRING } from '../utils/apiConfig_spring';

interface ResultProps {
  orderId: number;
}

const Result: React.FC<ResultProps> = ({ orderId }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const printRecept = async () => {
    try {
      const response = await fetch(
        `http://${API_URL_SPRING}/api/order/${orderId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      if (response.status === 200) {
        console.log(`/api/order/${orderId} ${response.status}`);
        return true;
      }
      else {
        throw new Error(`/api/order/${orderId} ${response.status}`);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // 5초 후에 메인 페이지로 이동
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 5000);

    // 컴포넌트가 언마운트되거나 타임아웃이 실행된 후에 setInterval과 setTimeout을 정리
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div className='Result-background'>
      <div className='Result-window'>
        <h1>{countdown}</h1>
        <img className="image" src={ReceptIcon} alt='영수증 출력' />
        <div className='Result-button' onClick={printRecept} ><h3>영수증 출력</h3></div>
      </div>
    </div>
  );
};

export default Result;
