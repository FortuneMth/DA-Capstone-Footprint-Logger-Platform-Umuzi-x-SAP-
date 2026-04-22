import { ACTIVITIES, ALL_ACTIVITIES } from "../../constants/activities";
import { fmt } from "../../utils/format";

export default function ActivityForm({ logForm, setLogForm, onSubmit }) {
  const list = ACTIVITIES[logForm.category] || ALL_ACTIVITIES;
  const selected = ALL_ACTIVITIES.find((item) => item.id === logForm.activityId);
  const estimate = selected ? Number(logForm.qty || 0) * selected.co2 : 0;

  return (
    <form
      className="card form-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <h3>Log Activity</h3>
      <label>Category</label>
      <div className="filter-row">
        {Object.keys(ACTIVITIES).map((cat) => (
          <button
            type="button"
            key={cat}
            className={logForm.category === cat ? "btn-primary" : "btn-ghost"}
            onClick={() => setLogForm((prev) => ({ ...prev, category: cat, activityId: "" }))}
          >
            {cat}
          </button>
        ))}
      </div>
      <label>Activity</label>
      <select
        value={logForm.activityId}
        onChange={(event) => setLogForm((prev) => ({ ...prev, activityId: event.target.value }))}
      >
        <option value="">Select activity</option>
        {list.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      <label>Quantity</label>
      <input
        type="number"
        min="0"
        step="any"
        value={logForm.qty}
        onChange={(event) => setLogForm((prev) => ({ ...prev, qty: event.target.value }))}
      />
      <label>Note</label>
      <input
        type="text"
        value={logForm.note}
        onChange={(event) => setLogForm((prev) => ({ ...prev, note: event.target.value }))}
      />
      <p className="muted">Estimated emissions: {fmt(estimate)} kg CO2</p>
      <button type="submit" className="btn-primary">
        Save Activity
      </button>
    </form>
  );
}
