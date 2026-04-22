export default function AuthView({
  view,
  setView,
  authForm,
  setAuthForm,
  authError,
  onSubmit,
}) {
  return (
    <div className="auth-shell">
      <form
        className="card auth-card"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(view);
        }}
      >
        <h2>Footprint Logger</h2>
        <p className="muted">Track and manage carbon emissions with secure accounts.</p>
        <div className="filter-row">
          {["login", "register"].map((mode) => (
            <button
              type="button"
              key={mode}
              className={view === mode ? "btn-primary" : "btn-ghost"}
              onClick={() => setView(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
        <label>Username</label>
        <input
          type="text"
          value={authForm.username}
          onChange={(event) =>
            setAuthForm((prev) => ({ ...prev, username: event.target.value }))
          }
        />
        <label>Password</label>
        <input
          type="password"
          value={authForm.password}
          onChange={(event) =>
            setAuthForm((prev) => ({ ...prev, password: event.target.value }))
          }
        />
        {authError ? <p className="error-text">{authError}</p> : null}
        <button type="submit" className="btn-primary">
          {view === "login" ? "Sign in" : "Create account"}
        </button>
      </form>
    </div>
  );
}
