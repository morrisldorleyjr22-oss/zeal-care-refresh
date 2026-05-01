import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_SETTINGS, SettingsKey } from "@/lib/site-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, Globe2 } from "lucide-react";

type Row = { key: string; value: Record<string, string>; description: string | null };

const SECTIONS: {
  key: SettingsKey;
  title: string;
  desc: string;
  fields: { name: string; label: string; type?: "text" | "textarea" | "url" }[];
}[] = [
  {
    key: "hero_home",
    title: "Homepage Hero",
    desc: "Main banner copy and call-to-action buttons.",
    fields: [
      { name: "eyebrow", label: "Eyebrow / Tag" },
      { name: "title", label: "Headline" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "cta_primary_label", label: "Primary button label" },
      { name: "cta_primary_url", label: "Primary button URL", type: "url" },
      { name: "cta_secondary_label", label: "Secondary button label" },
      { name: "cta_secondary_url", label: "Secondary button URL", type: "url" },
    ],
  },
  {
    key: "contact_info",
    title: "Contact Info",
    desc: "Shown in the navbar utility bar and footer.",
    fields: [
      { name: "phone", label: "Phone" },
      { name: "email", label: "Email" },
      { name: "address_line", label: "Address" },
      { name: "whatsapp", label: "WhatsApp number (optional)" },
    ],
  },
  {
    key: "donate",
    title: "Donate Button",
    desc: "Button label + destination used everywhere.",
    fields: [
      { name: "label", label: "Button label" },
      { name: "url", label: "Destination URL", type: "url" },
    ],
  },
  {
    key: "footer",
    title: "Footer",
    desc: "Tagline and copyright text.",
    fields: [
      { name: "tagline", label: "Tagline", type: "textarea" },
      { name: "office_hours", label: "Office hours" },
      { name: "copyright", label: "Copyright" },
    ],
  },
  {
    key: "social_links",
    title: "Social Links",
    desc: "Leave blank to hide an icon.",
    fields: [
      { name: "facebook", label: "Facebook URL", type: "url" },
      { name: "instagram", label: "Instagram URL", type: "url" },
      { name: "twitter", label: "Twitter / X URL", type: "url" },
      { name: "linkedin", label: "LinkedIn URL", type: "url" },
      { name: "youtube", label: "YouTube URL", type: "url" },
    ],
  },
];

export default function AdminGlobalSettings() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin_site_settings"],
    queryFn: async (): Promise<Record<string, Record<string, string>>> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value, description");
      if (error) throw error;
      const map: Record<string, Record<string, string>> = {};
      for (const r of (data ?? []) as Row[]) {
        map[r.key] = { ...(r.value ?? {}) };
      }
      // ensure defaults present
      for (const s of SECTIONS) {
        map[s.key] = {
          ...(DEFAULT_SETTINGS[s.key] as Record<string, string>),
          ...(map[s.key] ?? {}),
        };
      }
      return map;
    },
  });

  const [form, setForm] = useState<Record<string, Record<string, string>>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  async function save(key: string) {
    setSavingKey(key);
    try {
      const value = form[key] ?? {};
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key, value }, { onConflict: "key" });
      if (error) throw error;
      toast({ title: "Saved", description: `${key} updated.` });
      qc.invalidateQueries({ queryKey: ["site_settings"] });
      qc.invalidateQueries({ queryKey: ["admin_site_settings"] });
    } catch (err) {
      toast({
        title: "Save failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSavingKey(null);
    }
  }

  if (isLoading) {
    return (
      <div className="grid place-items-center py-20 text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-accent/15 grid place-items-center text-accent">
          <Globe2 className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">Global Settings</h1>
          <p className="text-sm text-muted-foreground">
            Edit content that appears across the entire site.
          </p>
        </div>
      </div>

      {SECTIONS.map((section) => {
        const values = form[section.key] ?? {};
        const busy = savingKey === section.key;
        return (
          <section
            key={section.key}
            className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm"
          >
            <header className="mb-4">
              <h2 className="font-bold tracking-tight">{section.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{section.desc}</p>
            </header>

            <div className="grid md:grid-cols-2 gap-4">
              {section.fields.map((f) => {
                const id = `${section.key}-${f.name}`;
                const v = values[f.name] ?? "";
                const onChange = (val: string) =>
                  setForm((prev) => ({
                    ...prev,
                    [section.key]: { ...(prev[section.key] ?? {}), [f.name]: val },
                  }));
                return (
                  <div
                    key={f.name}
                    className={f.type === "textarea" ? "md:col-span-2 space-y-1.5" : "space-y-1.5"}
                  >
                    <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {f.label}
                    </Label>
                    {f.type === "textarea" ? (
                      <Textarea
                        id={id}
                        value={v}
                        onChange={(e) => onChange(e.target.value)}
                        rows={3}
                        maxLength={1000}
                      />
                    ) : (
                      <Input
                        id={id}
                        type={f.type === "url" ? "text" : "text"}
                        value={v}
                        onChange={(e) => onChange(e.target.value)}
                        maxLength={500}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end">
              <Button onClick={() => save(section.key)} disabled={busy} size="sm">
                {busy ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
                Save {section.title}
              </Button>
            </div>
          </section>
        );
      })}
    </div>
  );
}
