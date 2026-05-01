import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_SETTINGS, SettingsKey, SettingsShape } from "@/lib/site-settings";

const QUERY_KEY = ["site_settings"] as const;

async function fetchSettings(): Promise<SettingsShape> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) {
    console.error("[site_settings] fetch error", error);
    return DEFAULT_SETTINGS as unknown as SettingsShape;
  }

  const merged: Record<string, unknown> = { ...DEFAULT_SETTINGS };
  for (const row of data ?? []) {
    const key = row.key as string;
    if (key in DEFAULT_SETTINGS) {
      merged[key] = {
        ...(DEFAULT_SETTINGS as Record<string, Record<string, unknown>>)[key],
        ...((row.value as Record<string, unknown>) ?? {}),
      };
    }
  }
  return merged as SettingsShape;
}

export function useSiteSettings() {
  const qc = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("site_settings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchSettings,
    staleTime: 60_000,
    placeholderData: DEFAULT_SETTINGS as unknown as SettingsShape,
  });
}

export function useSetting<K extends SettingsKey>(key: K): SettingsShape[K] {
  const { data } = useSiteSettings();
  return (data ?? (DEFAULT_SETTINGS as unknown as SettingsShape))[key];
}
