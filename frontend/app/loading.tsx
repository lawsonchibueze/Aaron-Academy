export default function Loading() {
  return (
    <div
      className="page-loader"
      role="status"
      aria-label="Loading Aaron's Soccer Academy"
    >
      <div className="page-loader__ball" aria-hidden="true">
        ⚽
      </div>
      <span className="page-loader__text">Loading...</span>
    </div>
  );
}
