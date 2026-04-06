"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SiteTracker() {
  const pathname = usePathname();
  const sessionId = useRef("");
  const pageViewId = useRef("");
  const enteredAt = useRef(Date.now());

  useEffect(() => {
    let sid = sessionStorage.getItem("lacosta_sid");
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem("lacosta_sid", sid);
    }
    sessionId.current = sid;
  }, []);

  useEffect(() => {
    if (!sessionId.current) return;
    if (pathname.startsWith("/admin")) return;

    enteredAt.current = Date.now();

    const params = new URLSearchParams(window.location.search);

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        session_id: sessionId.current,
        page: pathname,
        referrer: document.referrer || null,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_content: params.get("utm_content"),
        utm_term: params.get("utm_term"),
        gclid: params.get("gclid"),
        fbclid: params.get("fbclid"),
        user_agent: navigator.userAgent,
      }),
      keepalive: true,
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.id) pageViewId.current = d.id;
      })
      .catch(() => {});

    const sendDuration = () => {
      if (!pageViewId.current) return;
      const seconds = Math.round((Date.now() - enteredAt.current) / 1000);
      if (seconds < 1) return;
      navigator.sendBeacon(
        "/api/track",
        new Blob(
          [
            JSON.stringify({
              type: "duration",
              id: pageViewId.current,
              duration_seconds: seconds,
            }),
          ],
          { type: "application/json" }
        )
      );
    };

    const onVisChange = () => {
      if (document.visibilityState === "hidden") sendDuration();
    };

    document.addEventListener("visibilitychange", onVisChange);
    window.addEventListener("beforeunload", sendDuration);

    return () => {
      sendDuration();
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("beforeunload", sendDuration);
    };
  }, [pathname]);

  return null;
}
