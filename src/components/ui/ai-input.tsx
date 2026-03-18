"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Plus, X, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const SPEED_FACTOR = 1;

interface ContextShape {
  showForm: boolean;
  triggerOpen: () => void;
  triggerClose: () => void;
}

const FormContext = React.createContext({} as ContextShape);
const useFormContext = () => React.useContext(FormContext);

const PANEL_WIDTH = 380;
const PANEL_HEIGHT = 520;
const DOCK_SIZE = 48;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

const MESSAGES_STORAGE_KEY = "aurexis_chat_messages";
const SESSION_ID_KEY = "aurexis_chat_session_id";

function getSessionId(): string {
  try {
    let id = globalThis.localStorage?.getItem(SESSION_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      globalThis.localStorage?.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function loadMessages(): ChatMessage[] {
  try {
    const raw = globalThis.localStorage?.getItem(MESSAGES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: ChatMessage[]) {
  try {
    globalThis.localStorage?.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(msgs.slice(-50)));
  } catch { /* noop */ }
}

export function MorphPanel({ initialOpen = false }: { initialOpen?: boolean } = {}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const [showForm, setShowForm] = React.useState(initialOpen);

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
    () => ({ showForm, triggerOpen, triggerClose }),
    [showForm, triggerOpen, triggerClose]
  );

  return (
    <div className="relative">
      <motion.div
        ref={wrapperRef}
        data-panel
        layout
        className={cn(
          "relative flex flex-col overflow-hidden backdrop-blur-xl",
          showForm
            ? "border border-white/[0.08] bg-[#0A0A0A]/95 shadow-[0_32px_80px_rgba(0,0,0,0.8),_0_0_0_1px_rgba(255,255,255,0.04)]"
            : "border border-white/[0.08] bg-[#0A0A0A]/90 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
        )}
        initial={false}
        animate={{
          width: showForm ? PANEL_WIDTH : DOCK_SIZE,
          height: showForm ? PANEL_HEIGHT : DOCK_SIZE,
          borderRadius: showForm ? 20 : 999,
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
          <AnimatePresence mode="wait" initial={false}>
            {showForm ? (
              <ChatPanel key="panel" ref={textareaRef} />
            ) : (
              <DockButton key="dock" />
            )}
          </AnimatePresence>
        </FormContext.Provider>
      </motion.div>
    </div>
  );
}

function DockButton() {
  const { triggerOpen } = useFormContext();
  return (
    <motion.button
      type="button"
      onClick={triggerOpen}
      className="group relative flex h-full w-full items-center justify-center outline-none bg-gradient-to-br from-[#00F0FF]/10 to-[#0047FF]/10 overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open Aurexis AI chat"
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F0FF]/30 to-[#0047FF]/30 blur-md"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 rounded-full bg-white/[0.02]" />
      <Sparkles className="size-5 text-[#00F0FF] transition-colors duration-300 group-hover:text-white relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
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
    <div className="flex items-center gap-1 py-1">
      <span className="sr-only">Assistant is typing</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block size-1.5 rounded-full bg-white/50"
          initial={{ opacity: 0.3, y: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </div>
  );
}

const ChatPanel = React.forwardRef<
  HTMLTextAreaElement,
  React.HTMLAttributes<HTMLDivElement>
>((_, ref) => {
  const { triggerClose, showForm } = useFormContext();
  const sendBtnRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const shouldStickToBottomRef = React.useRef(true);

  const [status, setStatus] = React.useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (showForm) {
      setMessages(loadMessages());
    }
  }, [showForm]);

  React.useEffect(() => {
    if (!showForm) return;
    if (!shouldStickToBottomRef.current) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, showForm]);

  const clearConversation = React.useCallback(() => {
    globalThis.localStorage?.removeItem(MESSAGES_STORAGE_KEY);
    globalThis.localStorage?.removeItem(SESSION_ID_KEY);
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
      const userMsg: ChatMessage = {
        id: `u-${crypto.randomUUID()}`,
        role: "user",
        content: text,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => {
        const next = [...prev, userMsg];
        saveMessages(next);
        return next;
      });
      scrollToBottom();

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: getSessionId() }),
      });

      const data = (await res.json().catch(() => null)) as
        | { answer?: string; error?: string }
        | null;

      if (!res.ok) {
        throw new Error(data?.error || "AI request failed");
      }

      const answer = String(data?.answer ?? "").trim();
      const assistantMsg: ChatMessage = {
        id: `a-${crypto.randomUUID()}`,
        role: "assistant",
        content: answer,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => {
        const next = [...prev, assistantMsg];
        saveMessages(next);
        return next;
      });
      scrollToBottom();
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
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative grid size-9 place-items-center rounded-full bg-white/[0.06] border border-white/[0.08]">
            <Sparkles className="size-4 text-white/70" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold tracking-tight text-white">
              Aurexis Architect
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-white/40">
              <span
                className={cn(
                  "inline-block size-1.5 rounded-full",
                  status === "sending"
                    ? "bg-white/60 animate-pulse"
                    : "bg-emerald-500"
                )}
              />
              {status === "sending" ? "Thinking..." : "Online"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={clearConversation}
            className="grid size-8 place-items-center rounded-full text-white/40 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white/70 outline-none"
            aria-label="New chat"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={triggerClose}
            className="grid size-8 place-items-center rounded-full text-white/40 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white/70 outline-none"
            aria-label="Close chat"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mx-4 h-px bg-white/[0.06]" />

      {/* Messages */}
      <div
        ref={listRef}
        onScroll={handleListScroll}
        onWheelCapture={handleWheelCapture}
        onTouchMoveCapture={handleTouchMoveCapture}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-4 py-4 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent] [-webkit-overflow-scrolling:touch]"
        aria-live="polite"
      >
        {error ? (
          <div className="rounded-xl border border-red-500/10 bg-red-500/5 px-3.5 py-2.5 text-[13px] text-red-300/80">
            {error}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="grid size-12 place-items-center rounded-full bg-white/[0.04] border border-white/[0.06] mb-4">
              <Sparkles className="size-5 text-white/30" />
            </div>
            <p className="text-[13px] text-white/30 max-w-[220px] leading-relaxed">
              Ask anything about Aurexis services, process, or pricing.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={cn("flex", isUser ? "justify-end" : "justify-start")}
                >
                  <div className={cn("max-w-[85%]")}>
                    <div
                      className={cn(
                        "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                        isUser
                          ? "bg-white text-black"
                          : "bg-white/[0.05] border border-white/[0.06] text-white/80"
                      )}
                    >
                      {m.content}
                    </div>
                    <div
                      className={cn(
                        "mt-1 text-[10px] text-white/25",
                        isUser ? "text-right pr-1" : "text-left pl-1"
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
                <div className="rounded-2xl bg-white/[0.05] border border-white/[0.06] px-3.5 py-2.5">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2">
        <form
          onSubmit={handleSubmit}
          className="group/form relative flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2 transition-all focus-within:border-white/[0.15] focus-within:bg-white/[0.05]"
        >
          <label className="sr-only" htmlFor="aurexis-ai-input">
            Message
          </label>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            id="aurexis-ai-input"
            ref={ref}
            placeholder="Ask me anything..."
            name="message"
            rows={1}
            className="min-h-[36px] max-h-[80px] flex-1 resize-none rounded-lg bg-transparent px-2.5 py-2 text-[13px] text-white placeholder:text-white/30 outline-none"
            required
            onKeyDown={handleKeys}
            spellCheck={false}
          />

          <button
            type="submit"
            ref={sendBtnRef}
            disabled={status === "sending"}
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-black transition-all hover:bg-white/90 active:scale-95 disabled:opacity-30 disabled:hover:bg-white disabled:active:scale-100"
            aria-label="Send message"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </motion.div>
  );
});
ChatPanel.displayName = "ChatPanel";

export default MorphPanel;
