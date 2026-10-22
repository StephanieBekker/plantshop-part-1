// Reuse the same visual placeholders while Home or Shop waits for the catalogue.
export default function ProductGridSkeleton({ count = 6 }) {
  return (
    <>
      <p className="sr-only" role="status">Loading plants...</p>
      <div className="product-grid" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <div className="product-card skeleton-card" key={index}>
            <div className="skeleton-image" />
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-short" />
            <div className="skeleton-button" />
          </div>
        ))}
      </div>
    </>
  );
}
