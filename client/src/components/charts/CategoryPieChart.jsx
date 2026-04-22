import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CATEGORY_COLORS } from "../../constants/activities";
import { fmt } from "../../utils/format";

export default function CategoryPieChart({ data }) {
  if (data.length === 0) return <p className="muted">No weekly category data yet.</p>;

  return (
    <div className="card">
      <h3>Weekly Category Mix</h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.key]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${fmt(value)} kg CO2`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
