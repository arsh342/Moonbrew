import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createUserWithEmailAndPassword, auth } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-hot-toast';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, googleSignIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      // Add user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: serverTimestamp()
      });

      router.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  async function handleGoogleSignIn(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      router.push('/');
    } catch (err) {
      setError('Failed to sign in with Google: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f1e4d3] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl font-semibold text-[#1e3932] mb-6 text-center">Join Us</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#1e3932] text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-[#d4b499] rounded focus:ring focus:ring-[#1e3932]"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#1e3932] text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-[#d4b499] rounded focus:ring focus:ring-[#1e3932]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#1e3932] text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-[#d4b499] rounded focus:ring focus:ring-[#1e3932]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#1e3932] text-white py-2 rounded font-medium hover:bg-[#163028]"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-[#d54b40] text-white py-2 rounded font-medium hover:bg-[#b53d35]"
          >
            Sign in with Google
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-[#6b6b6b]">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-[#1e3932] font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
