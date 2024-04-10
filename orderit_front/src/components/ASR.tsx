import React, { useEffect, useState } from 'react';
import Get_text from '../utils/Get_text';
import './ASR.css';

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

const ASR: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    recognition.onresult = async (event: any) => {
      const current = event.resultIndex;
      const transcriptResult = event.results[current][0].transcript;
      setTranscript(transcriptResult);
      if (event.results[current].isFinal) {
        console.log(transcriptResult);
        const response = await Get_text(transcriptResult);
        //const response = transcriptResult;
        console.log(response);
        console.log(response.genetrated);
        setResponseText(response.genetrated);
      }
    };
  
    recognition.onerror = (event: any) => {
      console.error('음성인식 에러:', event.error);
    };
  }, []);
  
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
      <h2 className='ASR-text'>음성인식</h2>
      <button onClick={handleListen}>{isListening ? '중지하기' : '시작하기'}</button>
      <div className='transcript'>인식된 내용: {transcript}</div>
      <div className='responseText'>응답: {responseText}</div>
    </div>
  );
}

export default ASR;
