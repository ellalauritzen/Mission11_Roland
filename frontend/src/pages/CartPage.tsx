import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const totalCost = cart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div>
      <h2>Your Cart:</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item: CartItem) => (
            <div key={item.bookId}>
              <h3>{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price per unit: ${item.price.toFixed(2)}</p>
              <p>
                <strong>Subtotal: ${item.subtotal.toFixed(2)}</strong>
              </p>
              <button onClick={() => removeFromCart(item.bookId)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      <h3>Total: ${totalCost.toFixed(2)}</h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
