import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart, quantities } = useCart();

  //calculate total donation amount
  const total = cart.reduce(
    (sum, item) => sum + (quantities[item.bookId] || 1) * item.price,
    0
  );

  const quantity = cart.reduce((sum, item) => sum + quantities[item.bookId], 0);

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒
      <strong>{total.toFixed(2)}</strong>
      <strong style={{ marginLeft: '8px' }}>({quantity})</strong>
    </div>
  );
};
export default CartSummary;
