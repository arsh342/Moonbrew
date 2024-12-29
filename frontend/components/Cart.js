import { useCart } from './CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name} - ${item.price.toFixed(2)}</span>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 