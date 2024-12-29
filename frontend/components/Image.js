import NextImage from 'next/image';

export default function Image({ src, alt, ...props }) {
  // Handle empty or invalid src
  if (!src) {
    return null;
  }

  return (
    <NextImage
      src={src}
      alt={alt || ''}
      {...props}
      onError={(e) => {
        console.error(`Error loading image: ${src}`);
        // You could set a fallback image here
        e.target.src = '/placeholder.jpg';
      }}
    />
  );
} 