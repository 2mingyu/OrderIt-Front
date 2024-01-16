import React from "react";
import "./Login.css";

interface LoginProps {
  setCurrentPage: (value: string) => void;
}

const Login: React.FC<LoginProps> = ({ setCurrentPage }) => {
  const handleLogin = () => {
    // TODO: 로그인 구현
    setCurrentPage('Start');
  };
  
  return (
    <div className="LoginWindow">
      <div className="LoginElements">
        <h1>TODO: 로그인 구현</h1>
        <div className="ID">
          <div className="title">ID</div>
          <div className="textfield">
            <div className="text">Enter your ID</div>
          </div>
        </div>
        <div className="password">
          <div className="title">password</div>
          <div className="textfield">
            <div className="text">Enter your password</div>
          </div>
        </div>
        <div className="login">
          <div className="text-wrapper" onClick={handleLogin}>로그인</div>
        </div>
      </div>
    </div>
  );
};

export default Login;