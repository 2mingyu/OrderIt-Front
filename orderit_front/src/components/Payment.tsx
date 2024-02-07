import './Payment.css';

interface PaymentProps {
  setIsPayment: (value: boolean) => void;
  total: number;
}

const Payment: React.FC<PaymentProps> = ({ setIsPayment, total }) => {
  const closePayment = () => {
    setIsPayment(false);
  };
  const toResult = () => {
    setIsPayment(false);
  };

  return (
    <div className='Payment-background'>
      <div className="Payment-window">
        <h1>카드를 입력해 주세요</h1>
        <div className='Payment-button' onClick={closePayment}>메뉴선택으로 되돌아가기</div>
        <div className='Payment-button' onClick={toResult}>(임시)결제완료 버튼</div>
      </div>
    </div>
  );
};

export default Payment;