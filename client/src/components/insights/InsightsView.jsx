import { TIPS } from "../../constants/activities";
import { fmt } from "../../utils/format";

export default function InsightsView({ catTotals, topCategory, weekTotal, weekGoal }) {
  return (
    <div className="view-grid">
      <section className="card">
        <h3>Category Breakdown</h3>
        {Object.entries(catTotals).map(([category, value]) => (
          <p key={category} className="row-between">
            <span>{category}</span>
            <strong>{fmt(value)} kg</strong>
          </p>
        ))}
      </section>
      <section className="card">
        <h3>Recommendations</h3>
        {(topCategory ? TIPS[topCategory] : TIPS.transport).map((tip) => (
          <p key={tip} className="muted">
            {tip}
          </p>
        ))}
      </section>
      <section className="card">
        <h3>Weekly Status</h3>
        <p className="muted">
          {weekTotal <= weekGoal
            ? `You are below your weekly goal at ${fmt(weekTotal)} kg.`
            : `You are ${fmt(weekTotal - weekGoal)} kg above your weekly goal.`}
        </p>
      </section>
    </div>
  );
}
