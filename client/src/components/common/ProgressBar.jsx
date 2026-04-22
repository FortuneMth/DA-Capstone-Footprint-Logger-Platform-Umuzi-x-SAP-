export default function ProgressBar({ value, max }) {
  const width = Math.min((value / Math.max(max, 1)) * 100, 100);
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${width}%` }} />
    </div>
  );
}
