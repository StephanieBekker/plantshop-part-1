// Only the API information is pending; local product content remains visible.
export default function ProductInformationSkeleton() {
  return (
    <>
      <p className="sr-only" role="status">Loading plant information...</p>
      <div aria-hidden="true">
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-short" />
      </div>
    </>
  );
}
