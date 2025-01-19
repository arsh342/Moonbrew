import LoadingSpinner from './LoadingSpinner';

export default function LoadingScreen() {
  return (
    <div 
      className="min-h-screen bg-cream-50 flex items-center justify-center"
      role="status" // For accessibility: Indicates loading state
      aria-live="polite" // Announces when the content is being loaded
    >
      <LoadingSpinner size="large" />
      <span className="sr-only">Loading...</span> {/* Visually hidden text for screen readers */}
    </div>
  );
}
