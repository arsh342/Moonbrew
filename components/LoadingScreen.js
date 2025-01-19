// Updated LoadingScreen.js
import LoadingSpinner from './LoadingSpinner'

export default function LoadingScreen() {
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner size="large" />
    </div>
  )
}
