"use server";

import { getSession } from "./session";
import { redirect } from "next/navigation";

const API_KEY = process.env.TMDB_API_KEY;

export async function login(): Promise<void> {
  let requestToken: string;
  try {
    const tokenResponse = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
    );
    const tokenData = await tokenResponse.json();

    if (!tokenData.success) {
      console.error("Erro ao criar request_token:", tokenData);
      throw new Error("Não foi possível iniciar o processo de login.");
    }
    console.log("Request Token criado:", tokenData.request_token);
    requestToken = tokenData.request_token;
    const session = await getSession();
    session.request_token = requestToken;
    await session.save();
  } catch (error) {
    console.error("Falha na ação de login:", error);
    throw new Error("Erro ao iniciar login. Tente novamente.");
  }

  const callbackUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  redirect(
    `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${callbackUrl}/auth/callback`
  );
}

export async function createSession(requestToken: string): Promise<void> {
  try {
    const sessionResponse = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_token: requestToken }),
      }
    );
    const sessionData = await sessionResponse.json();

    if (!sessionData.success) {
      console.error("Erro ao criar session_id:", sessionData);
      throw new Error("Não foi possível criar a sessão.");
    }

    const sessionId = sessionData.session_id;
    const accountResponse = await fetch(
      `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`
    );
    const accountData = await accountResponse.json();
    const accountId = accountData.id;

    const session = await getSession();
    session.session_id = sessionId;
    session.account_id = accountId;
    session.isLoggedIn = true;
    await session.save();
  } catch (error) {
    console.error("Falha ao criar sessão:", error);
    throw new Error("Erro ao criar sessão. Tente novamente.");
  }

  redirect("/");
}

export async function logout(): Promise<void> {
  try {
    const session = await getSession();
    session.destroy();
    redirect("/");
  } catch (error) {
    console.error("Falha ao fazer logout:", error);
    throw new Error("Erro ao fazer logout. Tente novamente");
  }
}
