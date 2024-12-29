import LoadingSpinner from './LoadingSpinner';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <LoadingSpinner size="large" />
    </div>
  );
} 