import { createContext, createElement, useContext, useEffect, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getDefault, getList } from "@/lib/page-content";

type Row = { page: string; key: string; value: string };

const QK = ["page_content"] as const;

async function fetchAll(): Promise<Row[]> {
  const { data, error } = await supabase
    .from("page_content")
    .select("page, key, value");
  if (error) {
    console.error("[page_content] fetch error", error);
    return [];
  }
  return (data ?? []) as Row[];
}

// Draft overrides for live preview in the admin editor.
// Map of `${page}::${key}` -> value.
type OverrideMap = Map<string, string>;
const PageContentOverrideContext = createContext<OverrideMap | null>(null);

export function PageContentOverrideProvider({
  overrides,
  children,
}: {
  overrides: OverrideMap;
  children: ReactNode;
}) {
  return createElement(
    PageContentOverrideContext.Provider,
    { value: overrides },
    children,
  );
}

export function usePageContent(page: string) {
  const qc = useQueryClient();
  const overrides = useContext(PageContentOverrideContext);

  useEffect(() => {
    const channel = supabase
      .channel(`page_content_changes_${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "page_content" },
        () => qc.invalidateQueries({ queryKey: QK }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  const { data } = useQuery({
    queryKey: QK,
    queryFn: fetchAll,
    staleTime: 60_000,
    placeholderData: [],
  });

  const map = new Map<string, string>();
  for (const r of data ?? []) map.set(`${r.page}::${r.key}`, r.value);

  function rawValue(key: string): string {
    const draft = overrides?.get(`${page}::${key}`);
    if (draft !== undefined && draft.length > 0) return draft;
    const override = map.get(`${page}::${key}`);
    if (override && override.length > 0) return override;
    return getDefault(page, key);
  }

  function get(key: string): string {
    return rawValue(key);
  }

  function list<T = Record<string, string>>(key: string): T[] {
    return getList<T>(page, key, rawValue(key));
  }

  return { get, list };
}
