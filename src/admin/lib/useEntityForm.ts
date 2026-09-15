import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "./api";
import { useToast } from "@/hooks/use-toast";

/**
 * Ek chhota form controller jo create + edit dono handle karta hai.
 * Validation server (zod) pe hoti hai; yahan sirf uske errors ko field ke
 * paas dikhate hain — do jagah rules likhne ki zaroorat nahi.
 */
export function useEntityForm<T extends Record<string, unknown>>(resource: string, editing: (T & { id: number }) | null, defaults: T, onSaved: () => void) {
  const [values, setValues] = useState<T>(defaults);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const qc = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    setValues(editing ? { ...defaults, ...editing } : defaults);
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const set = <K extends keyof T>(key: K, value: T[K]) => setValues((v) => ({ ...v, [key]: value }));

  const save = async () => {
    setSaving(true);
    setErrors({});
    try {
      if (editing) {
        await api.put(`/api/admin/${resource}/${editing.id}`, values);
        toast({ title: "Saved" });
      } else {
        await api.post(`/api/admin/${resource}`, values);
        toast({ title: "Created" });
      }
      qc.invalidateQueries({ queryKey: ["admin", resource] });
      onSaved();
      return true;
    } catch (e) {
      if (e instanceof ApiError && e.details) {
        setErrors(e.details);
        toast({ title: "Please fix the highlighted fields", variant: "destructive" });
      } else {
        toast({ title: "Couldn't save", description: (e as Error).message, variant: "destructive" });
      }
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { values, set, setValues, errors, saving, save };
}
