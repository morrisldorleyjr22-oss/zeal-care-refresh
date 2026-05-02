import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Globe2, LogOut, LayoutDashboard, Settings2, ImagePlus, UsersRound, FileEdit } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/content/who_we_are", label: "Page Content", icon: FileEdit },
  { to: "/admin/global", label: "Global Settings", icon: Globe2 },
  { to: "/admin/media", label: "Media Library", icon: ImagePlus },
  { to: "/admin/users", label: "Admin Users", icon: UsersRound },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container-zc flex items-center justify-between h-14">
          <Link to="/admin" className="flex items-center gap-2 font-black tracking-tight">
            <Settings2 className="size-5 text-accent" />
            <span>Site Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
              View site →
            </Link>
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await signOut();
                nav("/auth", { replace: true });
              }}
            >
              <LogOut className="size-4 mr-1.5" />
              <span className="text-xs">{user?.email}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container-zc grid lg:grid-cols-[220px_1fr] gap-6 py-8">
        <aside className="space-y-1">
          {items.map(({ to, label, icon: Icon, end }) => {
            const forceActive = to.startsWith("/admin/content") && loc.pathname.startsWith("/admin/content");
            return (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive || forceActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            );
          })}
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
