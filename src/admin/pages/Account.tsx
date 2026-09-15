import { useState } from "react";
import { LogOut } from "lucide-react";
import { PageTitle, Card, Field, Input, Button } from "../components/ui";
import { api, ApiError } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
  const { user, authDisabled, logout } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const submit = async () => {
    setSaving(true);
    setError("");
    try {
      await api.post("/api/admin/self/change-password", { currentPassword: current, newPassword: next });
      toast({ title: "Password changed" });
      setCurrent("");
      setNext("");
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Couldn't change password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageTitle title="My Account" />

      <div className="grid gap-4 max-w-md">
        <Card title="Profile">
          <div className="text-sm">
            <div className="font-semibold">{user.name || "—"}</div>
            <div style={{ color: "var(--a-muted)" }}>{user.email}</div>
            <div className="mt-1 text-xs uppercase font-semibold" style={{ color: "var(--a-accent)" }}>
              {user.role}
            </div>
          </div>
        </Card>

        {!authDisabled && (
          <Card title="Change Password">
            <div className="flex flex-col gap-4">
              <Field label="Current Password">
                <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password" />
              </Field>
              <Field label="New Password" error={error} hint="At least 10 characters.">
                <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" />
              </Field>
              <Button variant="primary" loading={saving} onClick={submit} disabled={!current || next.length < 10}>
                Update Password
              </Button>
            </div>
          </Card>
        )}

        {!authDisabled && (
          <Button variant="secondary" onClick={logout} className="w-fit">
            <LogOut className="w-4 h-4" /> Log Out
          </Button>
        )}
      </div>
    </div>
  );
}
