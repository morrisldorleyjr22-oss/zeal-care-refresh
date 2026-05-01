import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, ShieldAlert } from "lucide-react";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace state={{ from: location }} />;
  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4">
        <div className="max-w-md text-center space-y-3">
          <ShieldAlert className="size-10 mx-auto text-accent" />
          <h1 className="text-2xl font-black">Admin access required</h1>
          <p className="text-sm text-muted-foreground">
            Your account is signed in but doesn't have admin privileges yet.
            Ask the project owner to grant you the <code>admin</code> role in
            the backend, then refresh.
          </p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
