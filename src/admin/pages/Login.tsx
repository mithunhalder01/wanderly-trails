import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Field, Input, Button } from "../components/ui";
import { api, ApiError } from "../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/api/admin/auth/login", { email, password });
      await qc.invalidateQueries({ queryKey: ["admin", "me"] });
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wt-admin min-h-dvh flex items-center justify-center px-4" style={{ background: "var(--a-bg)" }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo-sm.webp" alt="" className="w-12 h-12 rounded-xl object-cover mb-3" />
          <h1 className="font-bold text-lg">Wanderly Trails</h1>
          <p className="text-xs" style={{ color: "var(--a-muted)" }}>
            Admin Panel Login
          </p>
        </div>

        <form
          className="a-card p-6 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <Field label="Email" required>
            <Input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </Field>
          <Field label="Password" required>
            <div className="relative">
              <Input type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-10" />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Toggle password visibility">
                {show ? <EyeOff className="w-4 h-4" style={{ color: "var(--a-muted)" }} /> : <Eye className="w-4 h-4" style={{ color: "var(--a-muted)" }} />}
              </button>
            </div>
          </Field>

          {error && <div className="a-error">{error}</div>}

          <Button variant="primary" type="submit" loading={loading} className="w-full mt-1">
            <Lock className="w-4 h-4" /> Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
