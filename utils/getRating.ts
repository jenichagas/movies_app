export function getRating(
  genres: { id: number; name: string }[] | undefined
): string | null {
  if (!genres || genres.length === 0) {
    return null;
  }

  const genreNames = genres.map((g) => g.name.toLowerCase());

  if (genreNames.includes("terror") || genreNames.includes("crime")) {
    return "18";
  }
  if (genreNames.includes("suspense") || genreNames.includes("guerra")) {
    return "16";
  }
  if (
    genreNames.includes("ação") ||
    genreNames.includes("ficção científica") ||
    genreNames.includes("drama")
  ) {
    return "14";
  }
  if (genreNames.includes("comédia") || genreNames.includes("romance")) {
    return "12";
  }
  if (genreNames.includes("aventura")) {
    return "10";
  }
  if (
    genreNames.includes("família") ||
    genreNames.includes("animação") ||
    genreNames.includes("infantil")
  ) {
    return "L";
  }

  return "12";
}
