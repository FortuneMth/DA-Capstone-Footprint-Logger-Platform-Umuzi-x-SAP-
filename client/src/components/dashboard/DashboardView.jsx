import StatCard from "../common/StatCard";
import ProgressBar from "../common/ProgressBar";
import CategoryPieChart from "../charts/CategoryPieChart";
import DailyBarChart from "../charts/DailyBarChart";
import { fmt } from "../../utils/format";

export default function DashboardView({
  username,
  logs,
  weekTotal,
  todayTotal,
  totalAll,
  weekGoal,
  goalMet,
  communityAverage,
  pieData,
  barData,
  filterCat,
  setFilterCat,
  filteredLogs,
  onDelete,
}) {
  return (
    <div className="view-grid">
      <section>
        <h2>{username} Dashboard</h2>
        <div className="cards-grid">
          <StatCard label="Today" value={fmt(todayTotal)} unit="kg CO2" />
          <StatCard label="This week" value={fmt(weekTotal)} unit="kg CO2" />
          <StatCard label="All time" value={fmt(totalAll)} unit="kg CO2" />
          <StatCard label="Logs" value={logs.length} unit="entries" />
        </div>
      </section>

      <section className="card">
        <h3>Goal Progress</h3>
        <p className="muted">Status: {goalMet ? "On track" : "Above target"}</p>
        <p className="muted">Week total {fmt(weekTotal)} / Goal {fmt(weekGoal)} kg</p>
        <ProgressBar value={weekTotal} max={Math.max(weekGoal, weekTotal)} />
        <p className="muted">
          Community average: {fmt(communityAverage)} kg/week
        </p>
      </section>

      <section className="charts-grid">
        <CategoryPieChart data={pieData} />
        <DailyBarChart data={barData} />
      </section>

      <section className="card">
        <div className="row-between">
          <h3>Recent Activity</h3>
          <div className="filter-row">
            {["all", "transport", "food", "energy"].map((cat) => (
              <button
                type="button"
                key={cat}
                className={filterCat === cat ? "btn-primary" : "btn-ghost"}
                onClick={() => setFilterCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {filteredLogs.slice(0, 8).map((log) => (
          <div className="log-row" key={log.id}>
            <div>
              <p>{log.label}</p>
              <p className="muted">
                {log.date} | {log.qty} {log.unit}
              </p>
            </div>
            <div className="row-between narrow">
              <strong>{fmt(log.co2)} kg</strong>
              <button type="button" className="btn-ghost" onClick={() => onDelete(log.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
