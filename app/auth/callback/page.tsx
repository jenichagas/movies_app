import { createSession } from "@/lib/auth-actions";
import { Suspense } from "react";
import Loading from "./loading";

function CallbackContent({
  request_token,
  approved,
}: {
  request_token: string | null;
  approved: string | null;
}) {
  // O `createSession` é uma Server Action que nunca vai renderizar nada,
  // apenas executará a lógica no servidor e redirecionará.
  // Chamá-la aqui garante que a lógica do servidor execute assim que a página carregar.
  if (request_token && approved === "true") {
    createSession(request_token);
  } else {
    // Lidar com o caso em que o usuário negou a autorização
    // Poderíamos redirecionar para uma página de erro ou de volta ao login.
    console.error("Autorização negada pelo usuário.");
    // redirect("/login?error=denied");
  }

  return <Loading />;
}

export default function AuthCallbackPage({
  searchParams,
}: {
  searchParams: { request_token: string | null; approved: string | null };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <CallbackContent
        request_token={searchParams.request_token}
        approved={searchParams.approved}
      />
    </Suspense>
  );
}
