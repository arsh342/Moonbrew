import NextImage from 'next/image';

export default function Image({ src, alt, fallback = '/placeholder.jpg', ...props }) {
  // Handle empty or invalid src
  if (!src) {
    return <NextImage src={fallback} alt="Fallback image" {...props} />;
  }

  return (
    <NextImage
      src={src}
      alt={alt || 'Image'}
      {...props}
      onError={(e) => {
        console.error(`Error loading image: ${src}`);
        // Fallback to a placeholder image if the image fails to load
        e.target.src = fallback;
      }}
    />
  );
}
