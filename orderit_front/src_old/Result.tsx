import React from "react";
import "./Result.css";

interface ResultProps {
  setCurrentPage: (value: string) => void;
  TOGO: string;
  cart: object;
}

const Result: React.FC<ResultProps> = ({ setCurrentPage, TOGO, cart }) => {
  const toStart = () => {
    setCurrentPage('Start');
  };

  return (
    <div className="ResultWindow">
      <h1>TODO: 결제 완료 정보 출력</h1>
      <div onClick={toStart}>(임시)초기화면으로</div>
      <div>(임시)영수증 출력</div>
    </div>
  );
};

export default Result;