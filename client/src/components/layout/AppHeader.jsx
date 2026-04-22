const NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "log", label: "Log Activity" },
  { id: "insights", label: "Insights" },
];

export default function AppHeader({ username, view, setView, onLogout }) {
  return (
    <header className="app-header">
      <h1>Footprint Logger</h1>
      <nav>
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className={view === item.id ? "btn-primary" : "btn-ghost"}
            onClick={() => setView(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="row-between narrow">
        <span className="muted">{username}</span>
        <button type="button" className="btn-ghost" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </header>
  );
}
