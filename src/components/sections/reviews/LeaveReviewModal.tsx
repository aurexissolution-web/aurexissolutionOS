"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AvatarPicker } from "./AvatarPicker";
import { StarRating } from "./StarRating";
import type { ReviewAvatarKey } from "@/types/portal";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
  fontSize: 14,
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 10,
  padding: "12px 14px",
  color: "white",
  width: "100%",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 10,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.50)",
  display: "block",
  marginBottom: 8,
};

const MAX_CONTENT = 320;

interface LeaveReviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function LeaveReviewModal({ open, onClose }: LeaveReviewModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [avatar, setAvatar] = useState<ReviewAvatarKey>("cyan");
  const [email, setEmail] = useState("");
  // Honeypot — bots fill, humans don't see it
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function resetForm() {
    setName("");
    setRole("");
    setRating(0);
    setContent("");
    setAvatar("cyan");
    setEmail("");
    setWebsite("");
    setError(null);
    setSuccess(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Please tell us your name");
    if (rating < 1) return setError("Please choose a star rating");
    if (content.trim().length < 8) return setError("Review is a bit short — give us a sentence");
    if (content.length > MAX_CONTENT) return setError(`Keep it under ${MAX_CONTENT} characters`);

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          rating,
          content: content.trim(),
          avatar_key: avatar,
          email: email.trim() || null,
          website, // honeypot
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(2,4,10,0.78)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        style={{
          background: "linear-gradient(180deg, #0A0C14 0%, #050810 100%)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-x-8 top-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,240,255,0.45), transparent)" }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] text-white/60 hover:text-white"
        >
          ✕
        </button>

        {success ? (
          <div className="px-8 py-14 text-center">
            <p
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: 32,
                color: "white",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Thank you.
            </p>
            <p
              className="mt-4"
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              We&rsquo;ll review it within a day. Once approved, it&rsquo;ll appear on the homepage.
            </p>
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="mt-7 rounded-full bg-white px-6 py-2.5 text-[13px] font-semibold text-black hover:bg-white/90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 px-7 py-8">
            <div>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(0,240,255,0.85)",
                  margin: 0,
                }}
              >
                Share your experience
              </p>
              <h2
                id="review-modal-title"
                className="mt-2"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: 30,
                  color: "white",
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Leave a review.
              </h2>
            </div>

            <div>
              <label style={labelStyle}>Your name *</label>
              <input
                style={inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Aziz"
                required
                maxLength={80}
              />
            </div>

            <div>
              <label style={labelStyle}>Who you are</label>
              <input
                style={inputStyle}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Owner · Klinik Aziz Dental"
                maxLength={120}
              />
            </div>

            <div>
              <label style={labelStyle}>Rating *</label>
              <StarRating value={rating} onChange={setRating} size={26} />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label style={labelStyle}>Your review *</label>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: content.length > MAX_CONTENT ? "#F87171" : "rgba(255,255,255,0.40)",
                  }}
                >
                  {content.length} / {MAX_CONTENT}
                </span>
              </div>
              <textarea
                style={{ ...inputStyle, minHeight: 110, resize: "vertical", fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What was working with us like? What changed for your business?"
                maxLength={MAX_CONTENT}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Choose an avatar</label>
              <AvatarPicker value={avatar} onChange={setAvatar} />
            </div>

            <div>
              <label style={labelStyle}>Email · we won&rsquo;t show this publicly</label>
              <input
                type="email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aziz@clinic.com (optional)"
                maxLength={120}
              />
            </div>

            {/* Honeypot — visually hidden, bots fill it, real users don't see it */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                pointerEvents: "none",
                height: 0,
                width: 0,
              }}
            />

            {error && (
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "#F87171",
                  padding: "10px 14px",
                  border: "1px solid rgba(248,113,113,0.20)",
                  borderRadius: 8,
                  background: "rgba(248,113,113,0.06)",
                  letterSpacing: "0.04em",
                }}
              >
                {error}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 border-t border-white/[0.06] pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/[0.10] px-5 py-2.5 text-[13px] font-medium text-white/60 hover:bg-white/[0.04]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-[#00F0FF] px-6 py-2.5 text-[13px] font-semibold text-black hover:brightness-110 disabled:opacity-50"
                style={{ boxShadow: "0 0 18px rgba(0,240,255,0.30)" }}
              >
                {submitting ? "Sending…" : "Submit for review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
