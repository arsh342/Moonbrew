import { useCart } from './CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.cartItemId} className="flex justify-between">
            <span>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</span>
            <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
