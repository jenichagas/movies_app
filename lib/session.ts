import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData } from "@/app/types";

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "cinebox-session",
  cookieOptions: {
    httpOnly: true,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}
