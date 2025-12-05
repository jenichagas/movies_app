import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = `https://api.themoviedb.org/3/person/popular`;
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json(
      { message: "API_KEY não encontrada" },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
  });

  try {
    const response = await fetch(`${baseUrl}?${params.toString()}`);
    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      console.error("API Error Response:", errorBody);
      throw new Error(
        `Erro ao buscar pessoas populares. Status: ${
          response.status
        }. Mensagem: ${errorBody?.status_message || response.statusText}`
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}