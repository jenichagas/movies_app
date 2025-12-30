export function formatDate(dateString: string | undefined) {
  if (!dateString) {
    return "Data não informada";
  }
  return new Date(dateString).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}
