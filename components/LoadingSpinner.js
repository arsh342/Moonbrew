export default function LoadingSpinner({ size = "medium" }) {
  // Define size classes based on the size prop
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12"
  };

  // Ensure fallback to medium if the size is not defined correctly
  const spinnerSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${spinnerSize} animate-spin rounded-full border-2 border-gray-300 border-t-green-700`}
        aria-label="Loading" // Accessibility improvement for screen readers
      />
    </div>
  );
}
