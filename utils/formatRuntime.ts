export function formatRuntime(minutes: number | undefined) {
  if (minutes === undefined) return "_";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
