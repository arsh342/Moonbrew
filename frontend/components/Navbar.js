import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import { useCart } from '../components/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Logo className="h-10 w-10" />
          <span className="text-green-700 text-xl font-bold">Moonbrew</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link 
            href="/menu" 
            className="text-gray-900 hover:text-green-700 font-medium"
          >
            Menu
          </Link>
          {user && (
            <Link 
              href="/orders/" 
              className="text-gray-900 hover:text-green-700 font-medium"
            >
              Orders
            </Link>
          )}
          <Link 
            href="/cart" 
            className="text-gray-900 hover:text-green-700 relative font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 font-medium">
                {user.name || 'User'}
              </span>
              <button
                onClick={() => logout()}
                className="text-gray-900 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link 
                href="/auth/signin" 
                className="text-gray-900 hover:text-green-700 font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className="text-gray-900 hover:text-green-700 font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 