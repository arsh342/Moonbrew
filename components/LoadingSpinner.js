// Updated LoadingSpinner.js
export default function LoadingSpinner({ size = "medium" }) {
  const sizeClasses = {
    small: "h-6 w-6 border-4",
    medium: "h-10 w-10 border-4",
    large: "h-16 w-16 border-4"
  }

  const spinnerSize = sizeClasses[size] || sizeClasses.medium

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${spinnerSize} animate-spin rounded-full border-t-green-600 border-l-green-600 border-r-green-300 border-b-green-300`}
        aria-label="Loading"
      />
    </div>
  )
}
