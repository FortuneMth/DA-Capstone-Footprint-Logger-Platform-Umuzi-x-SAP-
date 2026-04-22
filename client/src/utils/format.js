export const DEFAULT_COMMUNITY_AVERAGE = 18.5;

export function fmt(value) {
  return Number(value || 0).toFixed(2);
}

export function today() {
  return new Date().toISOString().split("T")[0];
}

export function weekStart() {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay());
  return date.toISOString().split("T")[0];
}
