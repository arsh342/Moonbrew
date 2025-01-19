// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  function signup(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }

  function login(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }

  function logout() {
    return signOut(auth)
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function googleSignIn() {
    const googleProvider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: userData?.name || firebaseUser.displayName || 'User',
          ...userData
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Updated redirect logic
  useEffect(() => {
    if (user && router.isReady) {
      // Only redirect from auth pages
      const authRoutes = ['/auth/signin', '/auth/signup'];
      
      if (authRoutes.includes(router.pathname)) {
        router.push('/index');
      }
    } else if (!user && router.isReady) {
      // Protect private routes
      const protectedRoutes = ['/dashboard', '/orders', '/favorites'];
      
      if (protectedRoutes.includes(router.pathname)) {
        router.push('/auth/signin');
      }
    }
  }, [user, router.isReady, router.pathname]);

  const value = {
    user,
    signup,
    login,
    logout,
    googleSignIn,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
}