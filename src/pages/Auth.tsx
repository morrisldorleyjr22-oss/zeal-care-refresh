import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import logo from "@/assets/zealcare-logo.png";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(128),
});

export default function Auth() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) nav("/admin", { replace: true });
  }, [user, loading, nav]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast({
        title: "Check your details",
        description: parsed.error.errors[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast({
          title: "Account created",
          description:
            "You're signed in. Ask the project owner to grant you admin access if you can't edit content.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Auth error", description: message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to site
        </Link>
        <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-hero-gradient p-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white rounded-2xl p-3 shadow-soft">
                <img src={logo} alt="Zeal Care" className="h-16 w-auto object-contain" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1">
              <ShieldCheck className="size-3.5 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                Admin Access
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
          </div>
          <form onSubmit={onSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  minLength={6}
                />
              </div>
            </div>
            <Button type="submit" disabled={busy} className="w-full h-11 text-sm font-semibold">
              {busy && <Loader2 className="size-4 mr-2 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </Button>
            <button
              type="button"
              className="w-full text-xs text-muted-foreground hover:text-foreground transition"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin"
                ? "Need an account? Sign up"
                : "Have an account? Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
