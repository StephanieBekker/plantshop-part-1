import { useState } from "react";

// The parent resets this local selection when the product ID changes.
export default function ProductGallery({ images, name }) {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div className="plant-gallery">
      <img
        className="plant-main-image"
        src={images[imageIndex]}
        alt={name}
      />

      {images.length > 1 && (
        <div className="plant-thumbnails" aria-label="Product images">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show image ${index + 1} of ${name}`}
              aria-pressed={imageIndex === index}
              onClick={() => setImageIndex(index)}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>

  );
}
