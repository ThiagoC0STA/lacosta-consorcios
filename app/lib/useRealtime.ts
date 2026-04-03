"use client";

import { useEffect, useRef, useCallback } from "react";
import { createSupabaseBrowser } from "./supabase/client";

type ChangePayload = {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: Record<string, unknown>;
  old: Record<string, unknown>;
};

export function useRealtimeTable(
  table: string,
  onAny: () => void,
  onInsert?: (row: Record<string, unknown>) => void
) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedRefresh = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onAny();
    }, 500);
  }, [onAny]);

  useEffect(() => {
    const supabase = createSupabaseBrowser();

    const channel = supabase
      .channel(`rt-${table}-${Date.now()}`)
      .on(
        "postgres_changes" as never,
        { event: "*", schema: "public", table } as never,
        (payload: ChangePayload) => {
          debouncedRefresh();
          if (payload.eventType === "INSERT" && onInsert) {
            onInsert(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      supabase.removeChannel(channel);
    };
  }, [table, debouncedRefresh, onInsert]);
}

export function useMultiTableRealtime(
  tables: string[],
  onAny: () => void
) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedRefresh = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onAny();
    }, 800);
  }, [onAny]);

  useEffect(() => {
    const supabase = createSupabaseBrowser();
    const channelName = `rt-multi-${tables.join("-")}-${Date.now()}`;

    let channel = supabase.channel(channelName);

    tables.forEach((table) => {
      channel = channel.on(
        "postgres_changes" as never,
        { event: "*", schema: "public", table } as never,
        () => debouncedRefresh()
      );
    });

    channel.subscribe();

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      supabase.removeChannel(channel);
    };
  }, [tables, debouncedRefresh]);
}
