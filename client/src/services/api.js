const API_BASE = "http://localhost:5000";

function clearSession(onUnauthorized) {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  if (onUnauthorized) onUnauthorized();
}

async function request(path, { token, method = "GET", body, onUnauthorized } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch (_error) {
    payload = {};
  }

  if (!response.ok || payload.success === false) {
    if (response.status === 401) clearSession(onUnauthorized);
    throw new Error(payload.message || "Request failed");
  }

  return payload.data;
}

export const api = {
  login: (body) => request("/api/auth/login", { method: "POST", body }),
  register: (body) => request("/api/auth/register", { method: "POST", body }),
  getActivities: (token, onUnauthorized) =>
    request("/api/activities", { token, onUnauthorized }),
  createActivity: (token, body, onUnauthorized) =>
    request("/api/activities", { token, method: "POST", body, onUnauthorized }),
  deleteActivity: (token, id, onUnauthorized) =>
    request(`/api/activities/${id}`, { token, method: "DELETE", onUnauthorized }),
  getCommunityAverage: () => request("/api/stats/community-average"),
};
