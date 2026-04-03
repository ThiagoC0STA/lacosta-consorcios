"use client";

export function trackEvent(
  eventName: string,
  eventData?: Record<string, unknown>
) {
  const sessionId =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("lacosta_sid") || ""
      : "";

  const payload = {
    type: "event",
    session_id: sessionId,
    event_name: eventName,
    event_data: eventData ?? {},
    page: typeof window !== "undefined" ? window.location.pathname : "/",
  };

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/track",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
  } else {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}
