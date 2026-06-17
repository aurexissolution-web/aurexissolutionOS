"use client";

import { useCallback, useState } from "react";

export type NewsletterStatus = "idle" | "loading" | "success" | "error";

export function useNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    if (status === "loading") return;
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setError("Network error — try again");
      setStatus("error");
    }
  }, [email, status]);

  return {
    email,
    setEmail,
    status,
    error,
    submit,
    reset: () => {
      setStatus("idle");
      setError(null);
    },
  };
}
