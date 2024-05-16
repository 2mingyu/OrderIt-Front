import { useCart } from '../context/CartContext';
import { useDineOrTakeout } from '../context/DineOrTakeoutContext';
import Post_order from '../utils/Post_order';
import './Payment.css';

interface PaymentProps {
  setIsPayment: (value: string) => void;
  total: number;
  setOrderId: (value: number) => void;
}

const Payment: React.FC<PaymentProps> = ({ setIsPayment, total, setOrderId }) => {
  const { cart } = useCart();
  const { dineOrTakeout } = useDineOrTakeout();
  const closePayment = () => {
    setIsPayment('before');
  };
  const succeessPayment = async () => {
    if (dineOrTakeout === null) return;
    const response = await Post_order(cart, dineOrTakeout);
    console.log(response);
    setOrderId(response["orderId"]);
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