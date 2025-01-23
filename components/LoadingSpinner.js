export default function LoadingSpinner({ size = "medium" }) {
  const sizeClasses = {
    small: "h-6 w-6 border-2",
    medium: "h-10 w-10 border-3",
    large: "h-16 w-16 border-4",
  }

  const spinnerSize = sizeClasses[size] || sizeClasses.medium

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${spinnerSize} animate-spin rounded-full border-t-yellow-500 border-r-yellow-500 border-b-emerald-700 border-l-emerald-700`}
        aria-label="Loading"
      />
    </div>
  )
}

