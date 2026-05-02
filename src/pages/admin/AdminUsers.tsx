import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, Loader2, Plus, Trash2, UsersRound, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

type AdminRole = {
  id: string;
  user_id: string;
  created_at: string;
  profiles: {
    email: string | null;
    full_name: string | null;
  } | null;
};

const ADMIN_USERS_QUERY = ["admin_users"];

export default function AdminUsers() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ADMIN_USERS_QUERY,
    queryFn: async (): Promise<AdminRole[]> => {
      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("id, user_id, created_at")
        .eq("role", "admin")
        .order("created_at", { ascending: false });

      if (error) throw error;
      const ids = (roles ?? []).map((role) => role.user_id);
      if (ids.length === 0) return [];

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .in("id", ids);

      if (profilesError) throw profilesError;
      const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));

      return (roles ?? []).map((role) => ({
        ...role,
        profiles: profileById.get(role.user_id) ?? null,
      }));
    },
  });

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  async function addAdmin(e: React.FormEvent) {
    e.preventDefault();
    if (!normalizedEmail) return;
    setAdding(true);
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, email")
        .ilike("email", normalizedEmail)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) {
        toast({
          title: "User not found",
          description: "Ask this person to create an account first, then add them here.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("user_roles")
        .upsert({ user_id: profile.id, role: "admin" }, { onConflict: "user_id,role" });

      if (error) throw error;
      toast({ title: "Admin added", description: `${profile.email ?? normalizedEmail} can now access admin.` });
      setEmail("");
      qc.invalidateQueries({ queryKey: ADMIN_USERS_QUERY });
    } catch (err) {
      toast({
        title: "Could not add admin",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  }

  async function removeAdmin(role: AdminRole) {
    if (role.user_id === user?.id) {
      toast({
        title: "You cannot remove yourself",
        description: "Keep at least one signed-in admin account active.",
        variant: "destructive",
      });
      return;
    }

    const label = role.profiles?.email ?? role.user_id;
    if (!confirm(`Remove admin access for ${label}?`)) return;

    setRemovingId(role.id);
    try {
      const { error } = await supabase.from("user_roles").delete().eq("id", role.id).eq("role", "admin");
      if (error) throw error;
      toast({ title: "Admin removed", description: `${label} no longer has admin access.` });
      qc.invalidateQueries({ queryKey: ADMIN_USERS_QUERY });
    } catch (err) {
      toast({
        title: "Could not remove admin",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-accent/15 grid place-items-center text-accent">
          <UsersRound className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">Admin Users</h1>
          <p className="text-sm text-muted-foreground">Manage which registered accounts can edit the website.</p>
        </div>
      </div>

      <section className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm">
        <form onSubmit={addAdmin} className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-1.5">
            <Label htmlFor="admin-email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Add admin by email
            </Label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.org"
              autoComplete="email"
              required
            />
          </div>
          <Button type="submit" disabled={adding || !normalizedEmail}>
            {adding ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add Admin
          </Button>
        </form>
        <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
          <AlertCircle className="size-4 shrink-0 text-accent" />
          <p>Only existing signed-up accounts can be promoted to admin from this screen.</p>
        </div>
      </section>

      <section className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="grid place-items-center py-20 text-muted-foreground">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">No admin accounts found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="w-[120px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((role) => {
                const isCurrentUser = role.user_id === user?.id;
                return (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="font-medium">{role.profiles?.email ?? "Unknown email"}</div>
                      <div className="text-xs text-muted-foreground">{role.profiles?.full_name ?? role.user_id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="gap-1.5">
                        <ShieldCheck className="size-3" />
                        Admin{isCurrentUser ? " · You" : ""}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(role.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-destructive hover:text-destructive"
                        disabled={isCurrentUser || removingId === role.id}
                        onClick={() => removeAdmin(role)}
                      >
                        {removingId === role.id ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="size-3.5" />
                        )}
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}