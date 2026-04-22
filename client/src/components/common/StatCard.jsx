export default function StatCard({ label, value, unit }) {
  return (
    <div className="card stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">
        {value}
        <span>{unit}</span>
      </p>
    </div>
  );
}
