import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function BookDetailsPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    const priceNumber = Number(price);
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Project Found',
      quantity,
      price: priceNumber,
      subtotal: quantity * priceNumber,
      total: 0,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Your Cart:</h2>

      <h3>{title}</h3>
      <h4>Price: ${Number(price).toFixed(2)}</h4>
      <div>
        <input
          type="number"
          placeholder="How many copies do you want?"
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
        />
        <button onClick={handleAddToCart} className="btn btn-primary btn-sm">
          Add to Cart
        </button>
      </div>

      <button className="btn btn-dark btn-sm" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </>
  );
}

export default BookDetailsPage;
