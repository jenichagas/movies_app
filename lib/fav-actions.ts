"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "./session";
import {
  ActionResponse,
  successResponse,
  errorResponse,
} from "./action-response";

interface FavoritePayload {
  media_type: "movie" | "tv";
  media_id: number;
  favorite: boolean;
}

const API_KEY = process.env.TMDB_API_KEY;

export async function toggleFavoriteAction(
  formData: FormData
): Promise<ActionResponse<string>> {
  try {
    const mediaId = Number(formData.get("mediaId"));
    const mediaType = formData.get("mediaType") as "movie" | "tv";
    const isCurrentlyFavorite = formData.get("isCurrentlyFavorite") === "true";
    const pathname = formData.get("pathname") as string;

    const session = await getSession();
    const accountId = session.account_id;
    const sessionId = session.session_id;

    if (!accountId || !sessionId) {
      return errorResponse("Você precisa estar logado para favoritar.");
    }

    const payload: FavoritePayload = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: !isCurrentlyFavorite,
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}&api_key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao atualizar favoritos no TMDB:", errorData);
      return errorResponse("Não foi possível atualizar os favoritos.");
    }

    if (pathname) {
      revalidatePath(pathname);
    }

    const message = !isCurrentlyFavorite
      ? "Adicionado aos favoritos!"
      : "Removido dos favoritos!";

    return successResponse(message);
  } catch (error) {
    console.error("Erro na action toggleFavorite:", error);
    return errorResponse("Erro ao processar sua solicitação.");
  }
}
