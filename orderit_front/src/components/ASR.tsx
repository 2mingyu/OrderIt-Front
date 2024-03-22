import React, { useState } from 'react';
import './ASR.css';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const ASR: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('브라우저가 SpeechRecognition을 지원하지 않습니다.');
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'ko-KR';
    recognition.interimResults = true;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      console.log('음성인식이 중지되었습니다.');
    } else {
      recognition.start();
      setIsListening(true);
      console.log('음성인식이 시작되었습니다.');

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        console.log(transcript);
      };

      recognition.onerror = (event: any) => {
        console.log('음성인식 에러 발생: ', event.error);
      };
    }
  };

  return (
    <div className='ASR'>
      <h2 className='ASR-text'>음성인식</h2>
      <button onClick={handleListen}>{isListening ? '중지하기' : '시작하기'}</button>
      <div className="transcript">인식된 내용: {transcript}</div>
    </div>
  );
}

export default ASR;
