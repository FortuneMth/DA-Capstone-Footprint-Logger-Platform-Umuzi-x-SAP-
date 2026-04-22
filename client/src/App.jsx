import { useCallback, useEffect, useMemo, useState } from "react";
import AppHeader from "./components/layout/AppHeader";
import AuthView from "./components/layout/AuthView";
import DashboardView from "./components/dashboard/DashboardView";
import LogView from "./components/log/LogView";
import InsightsView from "./components/insights/InsightsView";
import Toast from "./components/common/Toast";
import { ACTIVITIES, ALL_ACTIVITIES } from "./constants/activities";
import { api } from "./services/api";
import { DEFAULT_COMMUNITY_AVERAGE, fmt, today, weekStart } from "./utils/format";
import "./styles.css";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  const [view, setView] = useState(() => (token ? "dashboard" : "login"));
  const [authForm, setAuthForm] = useState({ username: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [logForm, setLogForm] = useState({ activityId: "", qty: "", category: "transport", note: "" });
  const [logs, setLogs] = useState([]);
  const [filterCat, setFilterCat] = useState("all");
  const [communityAverage, setCommunityAverage] = useState(DEFAULT_COMMUNITY_AVERAGE);
  const [toast, setToast] = useState(null);

  const handleUnauthorized = useCallback(() => {
    setToken("");
    setUsername("");
    setLogs([]);
    setView("login");
  }, []);

  const showToast = useCallback((msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const hydrateLog = useCallback((entry) => {
    const meta = ALL_ACTIVITIES.find((item) => item.id === entry.activityId);
    return { ...entry, unit: meta?.unit || "" };
  }, []);

  const loadData = useCallback(async () => {
    if (!token) return;
    try {
      const [activityData, statsData] = await Promise.all([
        api.getActivities(token, handleUnauthorized),
        api.getCommunityAverage(),
      ]);
      setLogs(activityData.map(hydrateLog));
      setCommunityAverage(statsData.averageWeeklyCO2 || DEFAULT_COMMUNITY_AVERAGE);
    } catch (error) {
      showToast(error.message, "error");
    }
  }, [token, handleUnauthorized, hydrateLog, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const weekLogs = useMemo(() => logs.filter((log) => log.date >= weekStart()), [logs]);
  const todayTotal = useMemo(
    () => logs.filter((log) => log.date === today()).reduce((sum, log) => sum + log.co2, 0),
    [logs]
  );
  const weekTotal = useMemo(() => weekLogs.reduce((sum, log) => sum + log.co2, 0), [weekLogs]);
  const totalAll = useMemo(() => logs.reduce((sum, log) => sum + log.co2, 0), [logs]);

  const catTotals = useMemo(() => {
    const totals = { transport: 0, food: 0, energy: 0 };
    weekLogs.forEach((log) => {
      if (totals[log.category] !== undefined) totals[log.category] += log.co2;
    });
    return totals;
  }, [weekLogs]);

  const pieData = useMemo(
    () =>
      Object.entries(catTotals)
        .filter(([, value]) => value > 0)
        .map(([key, value]) => ({ key, name: key, value })),
    [catTotals]
  );

  const barData = useMemo(() => {
    const byDay = {};
    logs.slice(-28).forEach((log) => {
      byDay[log.date] = (byDay[log.date] || 0) + log.co2;
    });
    return Object.entries(byDay).map(([date, value]) => ({ name: date.slice(5), value }));
  }, [logs]);

  const topCategory = useMemo(
    () => Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0]?.[0],
    [catTotals]
  );
  const weekGoal = communityAverage * 0.9;
  const goalMet = weekTotal <= weekGoal;
  const filteredLogs =
    filterCat === "all" ? [...logs].reverse() : [...logs].filter((item) => item.category === filterCat).reverse();

  async function handleAuth(mode) {
    try {
      const result =
        mode === "login"
          ? await api.login(authForm)
          : await api.register(authForm);
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.user.username);
      setToken(result.token);
      setUsername(result.user.username);
      setAuthError("");
      setView("dashboard");
    } catch (error) {
      setAuthError(error.message);
    }
  }

  async function handleAddLog() {
    const activity = ALL_ACTIVITIES.find((item) => item.id === logForm.activityId);
    if (!activity || Number(logForm.qty) <= 0) {
      showToast("Select a valid activity and quantity.", "error");
      return;
    }
    const payload = {
      activityId: activity.id,
      label: activity.label,
      category: Object.keys(ACTIVITIES).find((key) => ACTIVITIES[key].some((item) => item.id === activity.id)),
      quantity: Number(logForm.qty),
      co2kg: Number((Number(logForm.qty) * activity.co2).toFixed(2)),
      date: today(),
      note: logForm.note,
    };

    try {
      const created = await api.createActivity(token, payload, handleUnauthorized);
      setLogs((prev) => [...prev, hydrateLog(created)]);
      setLogForm({ activityId: "", qty: "", category: "transport", note: "" });
      showToast(`Saved ${fmt(payload.co2kg)} kg CO2`, "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  }

  async function handleDelete(id) {
    try {
      await api.deleteActivity(token, id, handleUnauthorized);
      setLogs((prev) => prev.filter((item) => item.id !== id));
      showToast("Activity deleted", "info");
    } catch (error) {
      showToast(error.message, "error");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUsername("");
    setLogs([]);
    setView("login");
  }

  if (!token) {
    return (
      <>
        <Toast toast={toast} />
        <AuthView
          view={view}
          setView={setView}
          authForm={authForm}
          setAuthForm={setAuthForm}
          authError={authError}
          onSubmit={handleAuth}
        />
      </>
    );
  }

  return (
    <div className="app-shell">
      <Toast toast={toast} />
      <AppHeader username={username} view={view} setView={setView} onLogout={handleLogout} />
      <main className="main-shell">
        {view === "dashboard" ? (
          <DashboardView
            username={username}
            logs={logs}
            weekTotal={weekTotal}
            todayTotal={todayTotal}
            totalAll={totalAll}
            weekGoal={weekGoal}
            goalMet={goalMet}
            communityAverage={communityAverage}
            pieData={pieData}
            barData={barData}
            filterCat={filterCat}
            setFilterCat={setFilterCat}
            filteredLogs={filteredLogs}
            onDelete={handleDelete}
          />
        ) : null}
        {view === "log" ? (
          <LogView
            logForm={logForm}
            setLogForm={setLogForm}
            onAddLog={handleAddLog}
            todayTotal={todayTotal}
            weekTotal={weekTotal}
          />
        ) : null}
        {view === "insights" ? (
          <InsightsView
            catTotals={catTotals}
            topCategory={topCategory}
            weekTotal={weekTotal}
            weekGoal={weekGoal}
          />
        ) : null}
      </main>
    </div>
  );
}
