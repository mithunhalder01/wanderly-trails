import { type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ButtonHTMLAttributes, useEffect } from "react";
import { X, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Buttons ---------- */

type Variant = "primary" | "secondary" | "ghost" | "danger";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "icon";
  loading?: boolean;
}
export function Button({ variant = "secondary", size = "md", loading, className, children, disabled, type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn("a-btn", `a-btn-${variant}`, size === "sm" && "a-btn-sm", size === "icon" && "a-btn-icon", className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <span className="a-spin" style={{ borderTopColor: variant === "primary" ? "#fff" : undefined }} /> : children}
    </button>
  );
}

/* ---------- Form fields ---------- */

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}
export function Field({ label, hint, error, required, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label className="a-label">
        {label}
        {required && <span style={{ color: "var(--a-danger)" }}> *</span>}
      </label>
      {children}
      {error ? <div className="a-error">{error}</div> : hint ? <div className="a-hint">{hint}</div> : null}
    </div>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("a-input", className)} {...rest} />;
}
export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("a-input", className)} {...rest} />;
}
export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn("a-input", className)} {...rest}>
      {children}
    </select>
  );
}

interface SwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
}
export function Switch({ checked, onChange, label, description }: SwitchProps) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer select-none py-1">
      {(label || description) && (
        <span>
          {label && <span className="font-semibold text-[13.5px] block">{label}</span>}
          {description && <span className="text-xs block" style={{ color: "var(--a-muted)" }}>{description}</span>}
        </span>
      )}
      <button type="button" role="switch" aria-checked={checked} className="a-switch" onClick={() => onChange(!checked)} />
    </label>
  );
}

/* ---------- Layout bits ---------- */

export function Card({ children, className, title, description, actions }: { children: ReactNode; className?: string; title?: string; description?: string; actions?: ReactNode }) {
  return (
    <section className={cn("a-card", className)}>
      {(title || actions) && (
        <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
          <div>
            {title && <h2 className="font-semibold text-[15px]">{title}</h2>}
            {description && <p className="text-xs mt-0.5" style={{ color: "var(--a-muted)" }}>{description}</p>}
          </div>
          {actions}
        </header>
      )}
      <div className={cn("px-5 pb-5", !title && !actions && "pt-5")}>{children}</div>
    </section>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warn" | "danger" | "info" }) {
  const tones = {
    neutral: { background: "#f5f5f4", color: "#57534e" },
    success: { background: "var(--a-accent-soft)", color: "var(--a-accent)" },
    warn: { background: "var(--a-warn-soft)", color: "var(--a-warn)" },
    danger: { background: "var(--a-danger-soft)", color: "var(--a-danger)" },
    info: { background: "#dbeafe", color: "#1d4ed8" },
  } as const;
  return (
    <span className="a-badge" style={tones[tone]}>
      {children}
    </span>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: "var(--a-bg)" }}>
        <Inbox className="w-5 h-5" style={{ color: "var(--a-muted)" }} />
      </div>
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-[13px] mt-1 max-w-sm" style={{ color: "var(--a-muted)" }}>{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-16", className)}>
      <span className="a-spin" />
    </div>
  );
}

export function PageTitle({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-[13px] mt-0.5" style={{ color: "var(--a-muted)" }}>{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

/* ---------- Modal ---------- */

export function Modal({ open, onClose, title, children, size = "md" }: { open: boolean; onClose: () => void; title: string; children: ReactNode; size?: "sm" | "md" | "lg" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  const width = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-5xl" }[size];
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/40 a-fade-in" />
      <div className={cn("relative w-full a-card rounded-b-none sm:rounded-b-[14px] max-h-[92dvh] flex flex-col a-fade-in", width)}>
        <header className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--a-border)" }}>
          <h2 className="font-semibold text-[15px]">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="w-4 h-4" />
          </Button>
        </header>
        <div className="overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = "Delete", loading }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirmLabel?: string; loading?: boolean }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-[14px]" style={{ color: "var(--a-muted)" }}>{message}</p>
      <div className="flex justify-end gap-2 mt-6">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

/* ---------- Tabs ---------- */

export function Tabs<T extends string>({ tabs, value, onChange }: { tabs: { value: T; label: string; count?: number }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex gap-1 p-1 rounded-[10px] overflow-x-auto max-w-full" style={{ background: "#ecebe7" }}>
      {tabs.map((t) => (
        <button key={t.value} type="button" className="a-tab" data-active={t.value === value} onClick={() => onChange(t.value)}>
          {t.label}
          {t.count !== undefined && <span className="ml-1.5 opacity-60">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}
