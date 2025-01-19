import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  useEffect(() => {
    // Wait for user status to be resolved
    if (user === undefined) {
      setIsLoading(true);
    } else if (!user) {
      router.replace('/auth/signin'); // Use replace to prevent navigating back
    } else {
      setIsLoading(false); // User is authenticated
    }
  }, [user, router]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>; // Or use a spinner
  }

  return user ? children : null; // Render children if the user is authenticated
}
