import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    console.error("A chave da API do TMDB não está configurada.");
    return NextResponse.json(
      { error: "Erro interno do servidor: chave de API não configurada." },
      { status: 500 }
    );
  }

  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch genres from TMDB:", errorData);
      return NextResponse.json(
        { error: "Não foi possível obter os gêneros." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.genres);
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
