import NextImage from "next/image"

export default function Image({ src, alt, fallback = "/placeholder.jpg", ...props }) {
  if (!src) {
    return <NextImage src={fallback} alt="Fallback image" {...props} />
  }

  return (
    <NextImage
      src={src}
      alt={alt || "Image"}
      {...props}
      onError={(e) => {
        console.error(`Error loading image: ${src}`)
        e.target.src = fallback
      }}
    />
  )
}

