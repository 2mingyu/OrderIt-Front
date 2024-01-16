import React from "react";
import "./TitleBar.css";
import logo from "./orderit-logo.png"

interface TitleBarProps {
    currentPage: string;
    setCurrentPage: (value: string) => void;
    TOGO: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ currentPage, setCurrentPage, TOGO }) => {
    const toStart = () => {
      setCurrentPage('Start');
    };

    let message;
    switch (currentPage) {
        case 'Login':
            message = <h1>로그인</h1>
            break;
        case 'Start':
            message = <h1>주문 방법을 선택해 주세요</h1>
            break;
        case 'Menu':
            message = <h1>메뉴를 선택해 주세요 ({TOGO})</h1>
            break;
        case 'Result':
            message = <h1>결제가 완료되었습니다</h1>
            break;
        default:
            message = <h1>Error</h1>
    }
    return (
        <div className="TitleBar">
            <div className="div-1">
                <img className="orderit-LOGO" alt="orderit-LOGO" src={logo} />
                {message}
            </div>
            {currentPage === 'Menu' &&
            <div className="Back" onClick={toStart}>
                <h2>돌아가기</h2>
            </div>}
        </div>
    )
}

export default TitleBar;