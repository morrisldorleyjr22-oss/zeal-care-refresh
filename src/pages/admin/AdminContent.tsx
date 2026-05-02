import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_REGISTRY, getPageDef, type FieldDef, type PageDef } from "@/lib/page-content";
import { PageContentOverrideProvider } from "@/hooks/usePageContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, RotateCcw, FileEdit, ImageIcon, ExternalLink, Eye } from "lucide-react";

import Index from "@/pages/Index";
import About from "@/pages/About";
import WhatWeDo from "@/pages/WhatWeDo";
import WhoWeAre from "@/pages/WhoWeAre";
import WhyEmpowerment from "@/pages/WhyEmpowerment";
import WaysToGive from "@/pages/WaysToGive";
import Media from "@/pages/Media";
import Contact from "@/pages/Contact";

const PAGE_COMPONENTS: Record<string, () => JSX.Element> = {
  home: Index,
  about: About,
  what_we_do: WhatWeDo,
  who_we_are: WhoWeAre,
  why: WhyEmpowerment,
  ways_to_give: WaysToGive,
  media: Media,
  contact: Contact,
};

type MediaItem = { name: string; url: string };

export default function AdminContent() {
  const params = useParams();
  const pageSlug = params.page ?? "who_we_are";
  const def = getPageDef(pageSlug);

  if (!def) {
    return (
      <div className="rounded-2xl border border-border p-8 text-center">
        <h1 className="text-xl font-bold">Unknown page</h1>
        <p className="text-sm text-muted-foreground mt-2">No editor registered for "{pageSlug}".</p>
      </div>
    );
  }

  return <Editor key={pageSlug} def={def} />;
}

function Editor({ def }: { def: PageDef }) {
  const qc = useQueryClient();
  const [saved, setSaved] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [pickerForKey, setPickerForKey] = useState<string | null>(null);

  // Load existing rows for this page
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("page_content")
        .select("key, value")
        .eq("page", def.page);
      if (!alive) return;
      if (error) {
        toast({ title: "Could not load content", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }
      const map: Record<string, string> = {};
      for (const r of data ?? []) map[r.key] = r.value;
      setSaved(map);
      setDraft(map);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [def.page]);

  // Load media library (for image picker)
  useEffect(() => {
    (async () => {
      const { data } = await supabase.storage.from("site-media").list("", {
        limit: 200,
        sortBy: { column: "created_at", order: "desc" },
      });
      const items = (data ?? [])
        .filter((o) => o.name && !o.name.endsWith("/"))
        .map((o) => {
          const { data: pub } = supabase.storage.from("site-media").getPublicUrl(o.name);
          return { name: o.name, url: pub.publicUrl };
        });
      setMedia(items);
    })();
  }, []);

  // Build override map keyed by `${page}::${key}` for the live preview provider.
  const overrides = useMemo(() => {
    const m = new Map<string, string>();
    for (const f of def.fields) {
      const v = draft[f.key];
      if (v !== undefined && v !== "") m.set(`${def.page}::${f.key}`, v);
    }
    return m;
  }, [draft, def]);

  const dirtyKeys = useMemo(
    () => def.fields.map((f) => f.key).filter((k) => (draft[k] ?? "") !== (saved[k] ?? "")),
    [draft, saved, def.fields],
  );
  const isDirty = dirtyKeys.length > 0;

  function setField(key: string, value: string) {
    setDraft((p) => ({ ...p, [key]: value }));
  }

  function resetField(key: string) {
    setDraft((p) => ({ ...p, [key]: saved[key] ?? "" }));
  }

  function resetAll() {
    setDraft(saved);
  }

  async function uploadInline(key: string, file: File, kind: "image" | "video" = "image") {
    const maxMB = kind === "video" ? 200 : 10;
    if (file.size > maxMB * 1024 * 1024) {
      toast({ title: "Too large", description: `${file.name} exceeds ${maxMB}MB`, variant: "destructive" });
      return;
    }
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type,
    });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return;
    }
    const { data: pub } = supabase.storage.from("site-media").getPublicUrl(path);
    setField(key, pub.publicUrl);
    setMedia((p) => [{ name: path, url: pub.publicUrl }, ...p]);
    toast({ title: "Uploaded" });
  }

  async function save() {
    if (!isDirty) return;
    setSaving(true);
    try {
      const rows = dirtyKeys.map((k) => {
        const f = def.fields.find((x) => x.key === k)!;
        return {
          page: def.page,
          key: k,
          type: f.type === "image" ? "image" : f.type === "video" ? "video" : "text",
          value: draft[k] ?? "",
        };
      });
      const { error } = await supabase
        .from("page_content")
        .upsert(rows, { onConflict: "page,key" });
      if (error) throw error;
      setSaved((p) => ({ ...p, ...Object.fromEntries(dirtyKeys.map((k) => [k, draft[k] ?? ""])) }));
      qc.invalidateQueries({ queryKey: ["page_content"] });
      toast({ title: "Saved", description: `Updated ${rows.length} field${rows.length === 1 ? "" : "s"}.` });
    } catch (err) {
      toast({
        title: "Save failed",
        description: err instanceof Error ? err.message : "Unknown",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  const PreviewComponent = PAGE_COMPONENTS[def.page];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-accent/15 grid place-items-center text-accent">
            <FileEdit className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Edit · {def.title}</h1>
            <p className="text-sm text-muted-foreground">
              Changes appear live in the preview. Click Save to publish.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={def.route}
            target="_blank"
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            View live <ExternalLink className="size-3" />
          </Link>
          <Button size="sm" variant="outline" onClick={resetAll} disabled={!isDirty || saving}>
            <RotateCcw className="size-4 mr-1.5" /> Reset
          </Button>
          <Button size="sm" onClick={save} disabled={!isDirty || saving}>
            {saving ? <Loader2 className="size-4 mr-1.5 animate-spin" /> : <Save className="size-4 mr-1.5" />}
            Save{isDirty ? ` (${dirtyKeys.length})` : ""}
          </Button>
        </div>
      </div>

      {/* Page picker */}
      <div className="flex flex-wrap gap-1.5">
        {PAGE_REGISTRY.map((p) => (
          <Link
            key={p.page}
            to={`/admin/content/${p.page}`}
            className={`text-xs px-2.5 py-1 rounded-full border transition ${
              p.page === def.page
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.title}
          </Link>
        ))}
      </div>

      <div className="grid xl:grid-cols-[minmax(0,420px)_1fr] gap-6">
        {/* Form */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Loading…
            </div>
          ) : (
            def.fields.map((f) => (
              <FieldEditor
                key={f.key}
                field={f}
                value={draft[f.key] ?? ""}
                dirty={(draft[f.key] ?? "") !== (saved[f.key] ?? "")}
                onChange={(v) => setField(f.key, v)}
                onReset={() => resetField(f.key)}
                onUpload={(file) => uploadInline(f.key, file)}
                onPickFromLibrary={() => setPickerForKey(f.key)}
              />
            ))
          )}
        </div>

        {/* Live preview */}
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Eye className="size-3.5" />
            Live preview {isDirty && <span className="text-amber-600 font-semibold">· unsaved changes</span>}
          </div>
          <div className="rounded-2xl border border-border overflow-hidden bg-background">
            <div className="max-h-[80vh] overflow-y-auto">
              <PageContentOverrideProvider overrides={overrides}>
                {PreviewComponent ? (
                  <PreviewComponent />
                ) : (
                  <div className="p-10 text-center text-sm text-muted-foreground">
                    No preview available for this page.
                  </div>
                )}
              </PageContentOverrideProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Image picker dialog */}
      {pickerForKey && (
        <div
          className="fixed inset-0 bg-black/60 z-50 grid place-items-center p-4"
          onClick={() => setPickerForKey(null)}
        >
          <div
            className="bg-background rounded-2xl border border-border w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-bold">Select an image</h2>
              <Button size="sm" variant="ghost" onClick={() => setPickerForKey(null)}>Close</Button>
            </div>
            <div className="p-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {media.length === 0 && (
                <div className="col-span-full text-sm text-muted-foreground text-center py-10">
                  No media uploaded yet.
                </div>
              )}
              {media.map((m) => (
                <button
                  key={m.name}
                  type="button"
                  className="rounded-xl border border-border overflow-hidden hover:ring-2 hover:ring-primary transition"
                  onClick={() => {
                    setField(pickerForKey, m.url);
                    setPickerForKey(null);
                  }}
                >
                  <img src={m.url} alt={m.name} className="aspect-square object-cover w-full" />
                  <div className="text-[10px] truncate p-1.5 text-muted-foreground">{m.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldEditor({
  field,
  value,
  dirty,
  onChange,
  onReset,
  onUpload,
  onPickFromLibrary,
}: {
  field: FieldDef;
  value: string;
  dirty: boolean;
  onChange: (v: string) => void;
  onReset: () => void;
  onUpload: (file: File) => void;
  onPickFromLibrary: () => void;
}) {
  return (
    <div className={`rounded-xl border p-4 space-y-2 ${dirty ? "border-amber-400 bg-amber-50/40" : "border-border bg-background"}`}>
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold tracking-wide uppercase text-muted-foreground">
          {field.label}
        </label>
        {dirty && (
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <RotateCcw className="size-3" /> revert
          </button>
        )}
      </div>

      {field.type === "text" && (
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={field.default} />
      )}

      {field.type === "textarea" && (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.default}
          rows={4}
        />
      )}

      {field.type === "image" && (
        <div className="space-y-2">
          <div className="rounded-lg border border-border bg-muted/40 aspect-video overflow-hidden grid place-items-center">
            {value ? (
              <img src={value} alt={field.label} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="size-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onUpload(f);
                  e.target.value = "";
                }}
              />
              <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90">
                Upload
              </span>
            </label>
            <Button size="sm" variant="outline" type="button" onClick={onPickFromLibrary}>
              From library
            </Button>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="or paste URL"
              className="flex-1 min-w-[160px] text-xs"
            />
          </div>
        </div>
      )}

      {field.help && <p className="text-[11px] text-muted-foreground">{field.help}</p>}
    </div>
  );
}
