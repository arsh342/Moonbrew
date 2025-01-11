import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../components/CartContext';
import Logo from './Logo';
import { Menu, X, ShoppingCart, User, LogOut, Coffee, Clock, Heart } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false); // Close mobile menu after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Announcement Banner */}
      <div className="bg-green-700 text-white text-center text-sm py-1">
        <p>Free delivery on orders over $30! ☕</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Logo className="h-10 w-10 transition-transform group-hover:scale-110" />
            <span className="text-green-700 text-xl font-bold hidden sm:block">
              Moonbrew
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/menu" 
              className="flex items-center space-x-1 text-gray-900 hover:text-green-700 font-medium transition-colors"
            >
              <Coffee size={18} />
              <span>Menu</span>
            </Link>
            
            <Link 
              href="/favorites" 
              className="flex items-center space-x-1 text-gray-900 hover:text-green-700 font-medium transition-colors"
            >
              <Heart size={18} />
              <span>Favorites</span>
            </Link>

            {user && (
              <Link 
                href="/orders" 
                className="flex items-center space-x-1 text-gray-900 hover:text-green-700 font-medium transition-colors"
              >
                <Clock size={18} />
                <span>Orders</span>
              </Link>
            )}
            
            {/* Cart Icon with Animation */}
            <Link 
              href="/cart" 
              className="relative group"
            >
              <div className="text-gray-900 hover:text-green-700 transition-colors">
                <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-900">
                  <User size={18} />
                  <span className="font-medium">{user.name || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-900 hover:text-red-600 font-medium transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/auth/signin" 
                  className="text-gray-900 hover:text-green-700 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="bg-green-700 text-white px-4 py-2 rounded-full font-medium hover:bg-green-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-900 hover:text-green-700 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-900 hover:text-green-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <Link 
              href="/menu" 
              className="flex items-center space-x-2 text-gray-900 hover:text-green-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Coffee size={18} />
              <span>Menu</span>
            </Link>
            
            <Link 
              href="/favorites" 
              className="flex items-center space-x-2 text-gray-900 hover:text-green-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={18} />
              <span>Favorites</span>
            </Link>

            {user && (
              <Link 
                href="/orders" 
                className="flex items-center space-x-2 text-gray-900 hover:text-green-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <Clock size={18} />
                <span>Orders</span>
              </Link>
            )}

            <Link 
              href="/cart" 
              className="flex items-center space-x-2 text-gray-900 hover:text-green-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart size={18} />
              <span>Cart ({totalItems})</span>
            </Link>

            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-900">
                  <User size={18} />
                  <span className="font-medium">{user.name || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-900 hover:text-red-600 font-medium"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link 
                  href="/auth/signin" 
                  className="block text-gray-900 hover:text-green-700 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="block bg-green-700 text-white px-4 py-2 rounded-full font-medium hover:bg-green-800 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}