import StatCard from "../common/StatCard";
import ActivityForm from "./ActivityForm";
import { fmt } from "../../utils/format";

export default function LogView({
  logForm,
  setLogForm,
  onAddLog,
  todayTotal,
  weekTotal,
}) {
  return (
    <div className="view-grid">
      <ActivityForm logForm={logForm} setLogForm={setLogForm} onSubmit={onAddLog} />
      <div className="cards-grid">
        <StatCard label="Today" value={fmt(todayTotal)} unit="kg CO2" />
        <StatCard label="This week" value={fmt(weekTotal)} unit="kg CO2" />
      </div>
    </div>
  );
}
