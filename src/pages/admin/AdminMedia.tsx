import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, Trash2, Copy, ImageIcon } from "lucide-react";

type Item = { name: string; url: string; size?: number };

export default function AdminMedia() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.storage.from("site-media").list("", {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) {
      toast({ title: "Could not load media", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    const mapped = (data ?? [])
      .filter((o) => o.name && !o.name.endsWith("/"))
      .map((o) => {
        const { data: pub } = supabase.storage.from("site-media").getPublicUrl(o.name);
        return { name: o.name, url: pub.publicUrl, size: o.metadata?.size as number | undefined };
      });
    setItems(mapped);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (file.size > 10 * 1024 * 1024) {
          toast({ title: "Too large", description: `${file.name} exceeds 10MB`, variant: "destructive" });
          continue;
        }
        const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${Date.now()}-${safe}`;
        const { error } = await supabase.storage.from("site-media").upload(path, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: file.type,
        });
        if (error) throw error;
      }
      toast({ title: "Uploaded" });
      await load();
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Unknown",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  async function remove(name: string) {
    if (!confirm(`Delete ${name}?`)) return;
    const { error } = await supabase.storage.from("site-media").remove([name]);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setItems((p) => p.filter((i) => i.name !== name));
    toast({ title: "Deleted" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-accent/15 grid place-items-center text-accent">
            <ImageIcon className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Media Library</h1>
            <p className="text-sm text-muted-foreground">
              Upload site images. Copy a URL to use it anywhere.
            </p>
          </div>
        </div>
        <label className="inline-flex">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => upload(e.target.files)}
          />
          <Button asChild size="sm">
            <span className="cursor-pointer">
              {uploading ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Upload className="size-4 mr-2" />
              )}
              Upload images
            </span>
          </Button>
        </label>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20 text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center text-muted-foreground">
          No media yet. Upload your first image.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.name} className="group bg-card border border-border rounded-xl overflow-hidden">
              <div className="aspect-square bg-muted">
                <img src={it.url} alt={it.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-2.5 space-y-1.5">
                <p className="text-[11px] truncate text-muted-foreground" title={it.name}>{it.name}</p>
                <div className="flex gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-7 text-[11px]"
                    onClick={() => {
                      navigator.clipboard.writeText(it.url);
                      toast({ title: "URL copied" });
                    }}
                  >
                    <Copy className="size-3 mr-1" /> Copy URL
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-destructive"
                    onClick={() => remove(it.name)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
