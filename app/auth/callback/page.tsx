"use client";

import { createSession } from "@/lib/auth-actions";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import Loading from "./loading";

function CallbackContent() {
  const searchParams = useSearchParams();
  const requestToken = searchParams.get("request_token");
  const approved = searchParams.get("approved");

  useEffect(() => {
    if (requestToken && approved === "true") {
      createSession(requestToken);
    } else {
      toast.error("Falha na autenticação. Por favor, tente novamente.");
    }
  }, [requestToken, approved]);

  return <Loading />;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CallbackContent />
    </Suspense>
  );
}
