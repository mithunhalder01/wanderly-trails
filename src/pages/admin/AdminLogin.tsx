import { useState } from "react";
import { Link } from "wouter";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, ShieldCheck } from "lucide-react";

const ADMIN_PASSWORD = "admin";
const SESSION_KEY = "wanderly_admin";

export default function AdminLogin() {
  const navigateToAdmin = () => {
    // wouter navigation (minimal): push location
    window.location.href = "/admin";
  };


  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // minimal demo auth
    const ok = password === ADMIN_PASSWORD;
    if (!ok) {
      setError("Invalid password");
      setLoading(false);
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // ignore
    }

    navigateToAdmin();

  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-md mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-accent/15 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h1 className="text-xl font-serif font-bold">Admin Login</h1>
                  <p className="text-sm text-muted-foreground">Demo access (password: <span className="font-semibold text-foreground">admin</span>)</p>
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="text-center text-xs text-muted-foreground pt-2">
                  <Link href="/" className="text-primary hover:underline">Back to site</Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

