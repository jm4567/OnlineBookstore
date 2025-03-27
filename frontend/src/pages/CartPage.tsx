import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, quantities } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (quantities[item.bookId] || 1) * item.price,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.bookId}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={quantities[item.bookId] || 1}
                    onChange={(e) =>
                      updateQuantity(item.bookId, Number(e.target.value))
                    }
                    style={{ width: '50px' }}
                  />
                </td>
                <td>
                  ${((quantities[item.bookId] || 1) * item.price).toFixed(2)}
                </td>
                <td>
                  <button
                    onClick={() => removeFromCart(item.bookId)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
