import './Payment.css';

interface PaymentProps {
  setIsPayment: (value: string) => void;
  total: number;
}

const Payment: React.FC<PaymentProps> = ({ setIsPayment, total }) => {
  const closePayment = () => {
    setIsPayment('before');
  };
  const succeessPayment = () => {
    setIsPayment('after');
  };

  return (
    <div className='Payment-background'>
      <div className='Payment-window'>
        <h1>카드를 입력해 주세요</h1>
        <div className='Payment-button' onClick={closePayment}><h3>메뉴선택으로 되돌아가기</h3></div>
        <div className='Payment-button' onClick={succeessPayment}><h3>(임시)결제완료 버튼</h3></div>
      </div>
    </div>
  );
};

export default Payment;