import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Key } from "lucide-react";
import { PageTitle, Modal, Field, Input, Select, Button, Badge, Spinner, EmptyState, ConfirmDialog } from "../components/ui";
import { api, ApiError } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AdminUserRow {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  role: "owner" | "editor";
  active: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

function rowId(u: AdminUserRow) {
  return (u.id ?? u._id) as string;
}

export default function UsersPage() {
  const { user: me } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [resetTarget, setResetTarget] = useState<AdminUserRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUserRow | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => api.get<{ items: AdminUserRow[] }>("/api/admin/users"),
  });
  const items = data?.items ?? [];

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "users"] });

  const toggleActive = async (u: AdminUserRow) => {
    try {
      await api.patch(`/api/admin/users/${rowId(u)}`, { active: !u.active });
      invalidate();
    } catch (e) {
      toast({ title: "Couldn't update", description: e instanceof ApiError ? e.message : String(e), variant: "destructive" });
    }
  };

  const toggleRole = async (u: AdminUserRow) => {
    try {
      await api.patch(`/api/admin/users/${rowId(u)}`, { role: u.role === "owner" ? "editor" : "owner" });
      invalidate();
      toast({ title: "Role updated" });
    } catch (e) {
      toast({ title: "Couldn't update", description: e instanceof ApiError ? e.message : String(e), variant: "destructive" });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.del(`/api/admin/users/${rowId(deleteTarget)}`);
      toast({ title: "User removed" });
      setDeleteTarget(null);
      invalidate();
    } catch (e) {
      toast({ title: "Couldn't remove", description: e instanceof ApiError ? e.message : String(e), variant: "destructive" });
    }
  };

  return (
    <div>
      <PageTitle
        title="Team Members"
        description="People who can log in to this admin panel. Owners can manage everything including other accounts; editors can manage content."
        actions={
          <Button variant="primary" onClick={() => setCreateOpen(true)}>
            <Plus className="w-4 h-4" /> Add Team Member
          </Button>
        }
      />

      {isLoading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <div className="a-card">
          <EmptyState title="No team members yet" />
        </div>
      ) : (
        <div className="a-card overflow-x-auto">
          <table className="a-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={rowId(u)}>
                  <td className="font-semibold">
                    {u.name || "—"} {u.email === me.email && <Badge tone="info">You</Badge>}
                  </td>
                  <td style={{ color: "var(--a-muted)" }}>{u.email}</td>
                  <td>
                    <button type="button" onClick={() => toggleRole(u)} disabled={u.email === me.email} title={u.email === me.email ? "You can't change your own role" : "Click to change"}>
                      <Badge tone={u.role === "owner" ? "success" : "neutral"}>{u.role}</Badge>
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => toggleActive(u)} disabled={u.email === me.email}>
                      <Badge tone={u.active ? "success" : "danger"}>{u.active ? "Active" : "Disabled"}</Badge>
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 justify-end">
                      <Button size="icon" variant="ghost" onClick={() => setResetTarget(u)} aria-label="Reset password" title="Reset password">
                        <Key className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(u)} aria-label="Delete" disabled={u.email === me.email}>
                        <Trash2 className="w-4 h-4" style={{ color: "var(--a-danger)" }} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateUserModal open={createOpen} onClose={() => setCreateOpen(false)} onCreated={invalidate} />
      <ResetPasswordModal user={resetTarget} onClose={() => setResetTarget(null)} />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Remove team member?"
        message={`${deleteTarget?.name || deleteTarget?.email} will no longer be able to log in.`}
      />
    </div>
  );
}

function CreateUserModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"owner" | "editor">("editor");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const reset = () => {
    setEmail("");
    setName("");
    setRole("editor");
    setPassword("");
    setErrors({});
  };

  const submit = async () => {
    setSaving(true);
    setErrors({});
    try {
      await api.post("/api/admin/users", { email, name, role, password });
      toast({ title: "Team member added", description: `${email} can now log in.` });
      reset();
      onCreated();
      onClose();
    } catch (e) {
      if (e instanceof ApiError && e.details) setErrors(e.details);
      else toast({ title: "Couldn't create user", description: (e as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Team Member" size="sm">
      <div className="flex flex-col gap-4">
        <Field label="Full Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Sharma" />
        </Field>
        <Field label="Email" required error={errors.email}>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="team@wanderlytrails.in" />
        </Field>
        <Field label="Role" hint="Owners can manage other team members and site settings; editors manage content only.">
          <Select value={role} onChange={(e) => setRole(e.target.value as "owner" | "editor")}>
            <option value="editor">Editor</option>
            <option value="owner">Owner</option>
          </Select>
        </Field>
        <Field label="Temporary Password" required error={errors.password} hint="Share this with them — they can change it after logging in.">
          <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 10 characters" />
        </Field>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="primary" loading={saving} onClick={submit}>
          Add Member
        </Button>
      </div>
    </Modal>
  );
}

function ResetPasswordModal({ user, onClose }: { user: AdminUserRow | null; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const submit = async () => {
    if (!user) return;
    setSaving(true);
    setError("");
    try {
      await api.patch(`/api/admin/users/${rowId(user)}`, { password });
      toast({ title: "Password reset", description: `Share the new password with ${user.email}.` });
      setPassword("");
      onClose();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Couldn't reset password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={!!user} onClose={onClose} title={`Reset password for ${user?.name || user?.email}`} size="sm">
      <Field label="New Password" required error={error} hint="At least 10 characters. Share it with them directly.">
        <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>
      <div className="flex justify-end gap-2 mt-6">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="primary" loading={saving} onClick={submit}>
          Reset Password
        </Button>
      </div>
    </Modal>
  );
}
