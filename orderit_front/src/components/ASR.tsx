import { useCart } from '../context/CartContext';
import { useMenuList } from '../context/MenuListContext';
import { addToCart } from '../utils/ManageCart';
import React, { useEffect, useState } from 'react';
import Get_text from '../utils/Get_text';
import './ASR.css';

interface ASRProps {
  setIsPayment: (status: string) => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;  // 연속적으로 음성 인식
recognition.lang = 'ko-KR';
recognition.interimResults = true;  // 중간 결과 반환

const ASR: React.FC<ASRProps> = ({ setIsPayment }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseText, setResponseText] = useState('');
  const { cart, setCart } = useCart();
  const { menuList } = useMenuList();

  useEffect(() => {
    recognition.onresult = async (event: any) => {
      const current = event.resultIndex;
      const transcriptResult = event.results[current][0].transcript;
      setTranscript(transcriptResult);
      if (event.results[current].isFinal) {
        console.log(transcriptResult);
        const response = await Get_text(transcriptResult);
        console.log(response);
        handleFinalTranscript(response);
      }
    };
  
    recognition.onerror = (event: any) => {
      console.error('음성인식 에러:', event.error);
    };

    // 컴포넌트 언마운트 시 음성인식 중지
    return () => {
      if (isListening) {
        recognition.stop();
      }
    };
  }, [isListening]);

  const handleFinalTranscript = (response: any) => {
    response.Order.forEach(async (order: { menu: string; quantity: string }) => {
      const quantity = parseInt(order.quantity);
      let menuItemFound = null;
      let menuItemKey = '';
      if (order.menu === "receipt") {
        if (quantity === -1) {
          setIsPayment('wait');
          recognition.stop();
        }
        return;
      }

      Object.values(menuList).forEach(category => {
        Object.entries(category).forEach(([key, menuItem]) => {
          if (menuItem.eng_name === order.menu) {
            menuItemFound = menuItem;
            menuItemKey = menuItem.kor_name;
          }
        });
      });

      if (menuItemFound) {
        addToCart({
          cart,
          setCart,
          cartKey: menuItemKey,
          cartItem: menuItemFound,
          addNum: quantity
        });
      }
    });
    const responseString = response.Order.map((order: { menu: string; quantity: string }) =>
      `${order.menu} ${order.quantity}`
    ).join('\n');
    setResponseText(responseString);
  };
  
  const handleListen = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      console.log('음성인식 중지');
    }
    else {
      recognition.start();
      setIsListening(true);
      console.log('음성인식 시작');
    }
  };

  return (
    <div className='ASR'>
      <div className='ASR-title'>
        <h2 className='ASR-text'>음성인식</h2>
        <span className='record-border' onClick={handleListen}>
          {isListening? <div className='record-stop-button' /> : <div className='record-start-button' />}
        </span>
      </div>
      <div className='ASR-content'>
        <div className='transcript'>{transcript}</div>
        <pre className='responseText'>{responseText}</pre>
      </div>
    </div>
  );
}

export default ASR;
