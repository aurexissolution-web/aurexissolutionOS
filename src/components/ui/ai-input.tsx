"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { ensureAnonymousSession, supabase } from "@/lib/supabase/client";

interface OrbProps {
  dimension?: string;
  className?: string;
  tones?: {
    base?: string;
    accent1?: string;
    accent2?: string;
    accent3?: string;
  };
  spinDuration?: number;
}

const ColorOrb: React.FC<OrbProps> = ({
  dimension = "192px",
  className,
  tones,
  spinDuration = 20,
}) => {
  const fallbackTones = {
    base: "var(--color-deep-void)",
    accent1: "var(--color-electric-cyan)",
    accent2: "var(--color-cyber-blue)",
    accent3: "var(--color-nebula-violet)",
  };

  const palette = { ...fallbackTones, ...tones };

  const dimValue = parseInt(dimension.replace("px", ""), 10);

  const blurStrength =
    dimValue < 50
      ? Math.max(dimValue * 0.008, 1)
      : Math.max(dimValue * 0.015, 4);

  const contrastStrength =
    dimValue < 50
      ? Math.max(dimValue * 0.004, 1.2)
      : Math.max(dimValue * 0.008, 1.5);

  const pixelDot =
    dimValue < 50
      ? Math.max(dimValue * 0.004, 0.05)
      : Math.max(dimValue * 0.008, 0.1);

  const shadowRange =
    dimValue < 50
      ? Math.max(dimValue * 0.004, 0.5)
      : Math.max(dimValue * 0.008, 2);

  const maskRadius =
    dimValue < 30
      ? "0%"
      : dimValue < 50
        ? "5%"
        : dimValue < 100
          ? "15%"
          : "25%";

  const adjustedContrast =
    dimValue < 30
      ? 1.1
      : dimValue < 50
        ? Math.max(contrastStrength * 1.2, 1.3)
        : contrastStrength;

  return (
    <div
      className={cn("color-orb", className)}
      style={{
        width: dimension,
        height: dimension,
        ["--base" as string]: palette.base,
        ["--accent1" as string]: palette.accent1,
        ["--accent2" as string]: palette.accent2,
        ["--accent3" as string]: palette.accent3,
        ["--spin-duration" as string]: `${spinDuration}s`,
        ["--blur" as string]: `${blurStrength}px`,
        ["--contrast" as string]: adjustedContrast,
        ["--dot" as string]: `${pixelDot}px`,
        ["--shadow" as string]: `${shadowRange}px`,
        ["--mask" as string]: maskRadius,
      }}
    >
      <style jsx>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .color-orb {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1);
        }

        .color-orb::before,
        .color-orb::after {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
        }

        .color-orb::before {
          background:
            conic-gradient(
              from calc(var(--angle) * 2) at 25% 70%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 45% 75%,
              var(--accent2),
              transparent 30% 60%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * -3) at 80% 20%,
              var(--accent1),
              transparent 40% 60%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 15% 5%,
              var(--accent2),
              transparent 10% 90%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * 1) at 20% 80%,
              var(--accent1),
              transparent 10% 90%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * -2) at 85% 10%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            );
          box-shadow: inset var(--base) 0 0 var(--shadow)
            calc(var(--shadow) * 0.2);
          filter: blur(var(--blur)) contrast(var(--contrast));
          animation: spin var(--spin-duration) linear infinite;
        }

        .color-orb::after {
          background-image: radial-gradient(
            circle at center,
            var(--base) var(--dot),
            transparent var(--dot)
          );
          background-size: calc(var(--dot) * 2) calc(var(--dot) * 2);
          backdrop-filter: blur(calc(var(--blur) * 2))
            contrast(calc(var(--contrast) * 2));
          mix-blend-mode: overlay;
        }

        .color-orb[style*="--mask: 0%"]::after {
          mask-image: none;
        }

        .color-orb:not([style*="--mask: 0%"])::after {
          mask-image: radial-gradient(black var(--mask), transparent 75%);
        }

        @keyframes spin {
          to {
            --angle: 360deg;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .color-orb::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

const SPEED_FACTOR = 1;

interface ContextShape {
  showForm: boolean;
  successFlag: boolean;
  triggerOpen: () => void;
  triggerClose: () => void;
}

const FormContext = React.createContext({} as ContextShape);
const useFormContext = () => React.useContext(FormContext);

const PANEL_WIDTH = 420;
const PANEL_HEIGHT = 560;
const DOCK_WIDTH = 240;
const DOCK_HEIGHT = 52;

type ChatMessageRow = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

const CONVERSATION_STORAGE_KEY = "aurexis_chat_conversation_id";

async function getOrCreateConversationId(userId: string) {
  const existing = globalThis.localStorage?.getItem(CONVERSATION_STORAGE_KEY);
  if (existing) return existing;

  const { data, error } = await supabase
    .from("conversations")
    .insert({ user_id: userId })
    .select("id")
    .single();

  if (error || !data?.id) {
    throw new Error(error?.message || "Failed to create conversation");
  }

  globalThis.localStorage?.setItem(CONVERSATION_STORAGE_KEY, data.id);
  return data.id as string;
}

export function MorphPanel({ initialOpen = false }: { initialOpen?: boolean } = {}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const [showForm, setShowForm] = React.useState(initialOpen);
  const [successFlag, setSuccessFlag] = React.useState(false);

  const triggerClose = React.useCallback(() => {
    setShowForm(false);
    textareaRef.current?.blur();
  }, []);

  const triggerOpen = React.useCallback(() => {
    setShowForm(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  }, []);

  const handleSuccess = React.useCallback(() => {
    setSuccessFlag(true);
    setTimeout(() => setSuccessFlag(false), 1500);
  }, []);

  React.useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        showForm
      ) {
        triggerClose();
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => document.removeEventListener("mousedown", clickOutsideHandler);
  }, [showForm, triggerClose]);

  const ctx = React.useMemo(
    () => ({ showForm, successFlag, triggerOpen, triggerClose }),
    [showForm, successFlag, triggerOpen, triggerClose]
  );

  return (
    <div className="relative">
      <motion.div
        ref={wrapperRef}
        data-panel
        layout
        className="relative flex flex-col overflow-hidden border border-white/10 bg-[#06070B]/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        initial={false}
        animate={{
          width: showForm ? PANEL_WIDTH : DOCK_WIDTH,
          height: showForm ? PANEL_HEIGHT : DOCK_HEIGHT,
          borderRadius: showForm ? 22 : 999,
        }}
        transition={{
          type: "spring",
          stiffness: 400 / SPEED_FACTOR,
          damping: 35,
          mass: 0.8,
          delay: showForm ? 0 : 0.05,
        }}
        style={{
          maxWidth: "92vw",
          maxHeight: "78vh",
        }}
      >
        <FormContext.Provider value={ctx}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.20)_0%,_rgba(0,71,255,0.10)_35%,_transparent_70%)] blur-2xl" />
            <div className="absolute -bottom-32 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.12)_0%,_transparent_70%)] blur-2xl" />
            <div className="absolute inset-0 border border-white/5 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {showForm ? (
              <ChatPanel key="panel" ref={textareaRef} onSuccess={handleSuccess} />
            ) : (
              <DockBar key="dock" />
            )}
          </AnimatePresence>
        </FormContext.Provider>
      </motion.div>
    </div>
  );
}

function DockBar() {
  const { triggerOpen } = useFormContext();
  return (
    <motion.button
      type="button"
      onClick={triggerOpen}
      className="group relative h-[56px] w-[220px] select-none outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50 sm:w-[240px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Open Aurexis AI chat"
    >
      <div className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,rgba(0,240,255,0.4)_30%,rgba(139,92,246,0.4)_70%,rgba(255,255,255,0.15)_100%)] opacity-40 blur-[2px] transition-opacity duration-500 group-hover:opacity-80" />
      <div className="absolute inset-[1px] rounded-full bg-[#05060A]/90 backdrop-blur-2xl" />
      
      {/* Animated spinning border effect */}
      <div className="absolute inset-0 overflow-hidden rounded-full opacity-50 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute left-[50%] top-[50%] aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,240,255,0.8)_360deg)]" />
        <div className="absolute inset-[1px] rounded-full bg-[#030408]/90" />
      </div>

      <div className="absolute inset-[1px] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />

      <div className="relative flex h-full items-center gap-3.5 px-4 pr-5">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#00F0FF]/30 blur-[10px] transition-all duration-300 group-hover:bg-[#00F0FF]/50 group-hover:blur-[14px]" />
          <div className="relative grid size-[36px] place-items-center rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-white/0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-transform duration-300 group-hover:scale-110">
            <ColorOrb dimension="20px" className="opacity-80 transition-opacity group-hover:opacity-100" tones={{ base: "transparent" }} spinDuration={8} />
          </div>
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center gap-2.5">
            <span className="truncate bg-gradient-to-r from-white to-white/70 bg-clip-text text-[14px] font-bold tracking-tight text-transparent transition-all group-hover:to-white">
              Ask AI
            </span>
          </div>
          <div className="truncate text-[12px] text-white/50 transition-colors group-hover:text-white/70">
            Chat with Aurexis Architect
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">Assistant is typing</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block size-1.5 rounded-full bg-white/60"
          initial={{ opacity: 0.3, y: 0 }}
          animate={{ opacity: [0.3, 0.9, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </div>
  );
}

const ChatPanel = React.forwardRef<
  HTMLTextAreaElement,
  { onSuccess: () => void }
>(({ onSuccess }, ref) => {
  const { triggerClose, showForm } = useFormContext();
  const sendBtnRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const shouldStickToBottomRef = React.useRef(true);

  const [status, setStatus] = React.useState<
    "idle" | "loading" | "sending" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [conversationId, setConversationId] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<ChatMessageRow[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (!showForm) return;

    let cancelled = false;

    async function boot() {
      setStatus("loading");
      setError(null);
      try {
        const session = await ensureAnonymousSession();
        const convId = await getOrCreateConversationId(session.user.id);
        if (cancelled) return;
        setConversationId(convId);

        const { data, error } = await supabase
          .from("messages")
          .select("id, role, content, created_at")
          .eq("conversation_id", convId)
          .order("created_at", { ascending: true })
          .limit(35);

        if (cancelled) return;
        if (error) throw error;
        setMessages((data ?? []) as ChatMessageRow[]);
        setStatus("idle");
      } catch (err) {
        if (cancelled) return;
        setStatus("error");
        setError(err instanceof Error ? err.message : "Failed to load chat");
      }
    }

    boot();

    return () => {
      cancelled = true;
    };
  }, [showForm]);

  React.useEffect(() => {
    if (!showForm) return;
    if (!shouldStickToBottomRef.current) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, showForm]);

  const clearConversation = React.useCallback(() => {
    globalThis.localStorage?.removeItem(CONVERSATION_STORAGE_KEY);
    setConversationId(null);
    setMessages([]);
    setError(null);
    setStatus("idle");
  }, []);

  const scrollToBottom = React.useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, []);

  const handleListScroll = React.useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const threshold = 48;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    shouldStickToBottomRef.current = distanceFromBottom <= threshold;
  }, []);

  const handleWheelCapture = React.useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const el = listRef.current;
      if (!el) return;
      const canScroll = el.scrollHeight > el.clientHeight + 1;
      if (!canScroll) return;
      e.stopPropagation();
    },
    []
  );

  const handleTouchMoveCapture = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const el = listRef.current;
      if (!el) return;
      const canScroll = el.scrollHeight > el.clientHeight + 1;
      if (!canScroll) return;
      e.stopPropagation();
    },
    []
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const text = inputValue.trim();
    if (!text) return;

    setInputValue("");
    shouldStickToBottomRef.current = true;

    setStatus("sending");
    setError(null);

    try {
      const session = await ensureAnonymousSession();
      const userId = session.user.id;
      const convId = conversationId ?? (await getOrCreateConversationId(userId));
      setConversationId(convId);

      const optimisticUser: ChatMessageRow = {
        id: `local-user-${crypto.randomUUID()}`,
        role: "user",
        content: text,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimisticUser]);
      scrollToBottom();

      const { error: userInsertError } = await supabase.from("messages").insert({
        conversation_id: convId,
        user_id: userId,
        role: "user",
        content: text,
      });
      if (userInsertError) throw userInsertError;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = (await res.json().catch(() => null)) as
        | { answer?: string; error?: string }
        | null;

      if (!res.ok) {
        throw new Error(data?.error || "AI request failed");
      }

      const answer = String(data?.answer ?? "").trim();
      const optimisticAssistant: ChatMessageRow = {
        id: `local-assistant-${crypto.randomUUID()}`,
        role: "assistant",
        content: answer,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimisticAssistant]);
      scrollToBottom();

      const { error: assistantInsertError } = await supabase
        .from("messages")
        .insert({
          conversation_id: convId,
          user_id: userId,
          role: "assistant",
          content: answer,
        });
      if (assistantInsertError) throw assistantInsertError;

      onSuccess();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") triggerClose();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtnRef.current?.click();
    }
  }

  return (
    <motion.div
      className="relative z-10 flex h-full min-h-0 flex-col"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-1">
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00F0FF]/40 to-[#8B5CF6]/40 blur-xl animate-pulse" />
            <div className="relative grid size-11 place-items-center rounded-[14px] border border-white/20 bg-gradient-to-br from-white/10 to-white/0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-md">
              <ColorOrb dimension="24px" tones={{ base: "transparent" }} spinDuration={4} />
            </div>
          </div>
          <div className="min-w-0">
            <div className="truncate text-[15px] font-bold tracking-tight text-white drop-shadow-sm">
              Aurexis Architect
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={cn(
                    "inline-block size-2 rounded-full",
                    status === "sending" 
                      ? "bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-[pulse_1.5s_ease-in-out_infinite]" 
                      : "bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  )}
                  aria-hidden="true"
                />
                {status === "sending" ? "Processing..." : "Online"}
              </span>
              <span aria-hidden="true" className="text-white/20">•</span>
              <span className="truncate text-[11px] text-white/40">
                {conversationId ? "Session linked" : "Session initializing"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clearConversation}
            className="grid size-9 place-items-center rounded-full bg-white/5 text-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/40"
            aria-label="Start a new chat"
          >
            <Plus className="size-[18px]" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={triggerClose}
            className="grid size-9 place-items-center rounded-full bg-white/5 text-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/40"
            aria-label="Close chat"
          >
            <X className="size-[18px]" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="px-5 pt-3">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div
        ref={listRef}
        onScroll={handleListScroll}
        onWheelCapture={handleWheelCapture}
        onTouchMoveCapture={handleTouchMoveCapture}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-4 py-4 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.18)_transparent] [-webkit-overflow-scrolling:touch]"
        aria-live="polite"
      >
        {error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : status === "loading" && messages.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            Loading your chat…
          </div>
        ) : messages.length === 0 ? null : (
          <div className="flex flex-col gap-3">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
                  className={cn("flex", isUser ? "justify-end" : "justify-start")}
                >
                  <div className={cn("max-w-[88%] md:max-w-[78%]")}>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                        isUser
                          ? "bg-[linear-gradient(135deg,rgba(0,240,255,0.95)_0%,rgba(0,71,255,0.75)_100%)] text-[#02040A]"
                          : "border border-white/10 bg-[#0A0B10]/90 text-white"
                      )}
                    >
                      {m.content}
                    </div>
                    <div
                      className={cn(
                        "mt-1 text-[10px] tracking-wide text-white/45",
                        isUser ? "text-right" : "text-left"
                      )}
                    >
                      {formatTime(m.created_at)}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {status === "sending" && (
              <div className="flex justify-start">
                <div className="max-w-[88%] md:max-w-[78%]">
                  <div className="rounded-2xl border border-white/10 bg-[#0A0B10]/90 px-4 py-3 text-sm text-white">
                    <TypingDots />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-5 pb-5 pt-2">
        <form
          onSubmit={handleSubmit}
          className="group/form relative flex items-end gap-3 rounded-[20px] border border-white/15 bg-black/40 p-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all focus-within:border-white/30 focus-within:bg-black/60 focus-within:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_0_20px_rgba(0,240,255,0.15)] hover:border-white/20"
        >
          <label className="sr-only" htmlFor="aurexis-ai-input">
            Message
          </label>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            id="aurexis-ai-input"
            ref={ref}
            placeholder="Ask me anything…"
            name="message"
            rows={2}
            className="min-h-[44px] flex-1 resize-none rounded-xl bg-transparent px-3 py-2 text-[14px] text-white placeholder:text-white/40 outline-none"
            required
            onKeyDown={handleKeys}
            spellCheck={false}
          />

          <div className="flex items-center gap-2">
            <button
              type="submit"
              ref={sendBtnRef}
              disabled={status === "sending" || status === "loading"}
              className="group/btn grid size-[42px] place-items-center rounded-[14px] bg-[linear-gradient(180deg,#00F0FF_0%,#00A8FF_100%)] text-[#02040A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_0_20px_rgba(0,240,255,0.3)] outline-none transition-all hover:brightness-110 active:scale-[0.96] disabled:opacity-50 disabled:shadow-none disabled:hover:brightness-100 disabled:active:scale-100 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_0_30px_rgba(0,240,255,0.5)]"
              aria-label="Send message"
            >
              <ArrowUp className="size-5 transition-transform group-hover/btn:-translate-y-0.5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
});
ChatPanel.displayName = "ChatPanel";

export default MorphPanel;
