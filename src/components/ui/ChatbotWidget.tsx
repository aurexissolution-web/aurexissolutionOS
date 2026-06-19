"use client";

import { MorphPanel } from "@/components/ui/ai-input";
import { LeaveReviewDockButton } from "@/components/sections/reviews/LeaveReviewDockButton";
import { usePathname } from "next/navigation";

export function ChatbotWidget() {
  const pathname = usePathname();

  // Hide the dock cluster on the login page and any portal/dashboard routes
  if (pathname === "/login" || pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-1.5">
      <LeaveReviewDockButton />
      <MorphPanel />
    </div>
  );
}
