import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload, Link2, FolderOpen, X, FileText, Check } from "lucide-react";
import type { MediaItem } from "@shared/types";
import { api } from "../lib/api";
import { Button, Input, Modal, Spinner, EmptyState } from "./ui";
import { useToast } from "@/hooks/use-toast";

type Kind = "image" | "pdf" | "video";

const ACCEPT: Record<Kind, string> = {
  image: "image/jpeg,image/png,image/webp,image/gif,image/avif",
  pdf: "application/pdf",
  video: "video/mp4,video/webm",
};

/**
 * Ek field jisme admin: (1) computer se upload kare, (2) library se chune,
 * ya (3) link paste kare. Non-tech user ke liye teeno options saaf dikhte hain.
 */
export function MediaPicker({ value, onChange, kind = "image", label }: { value: string; onChange: (url: string) => void; kind?: Kind; label?: string }) {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [linkMode, setLinkMode] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const qc = useQueryClient();

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setProgress(0);
    try {
      const res = await api.upload(file, setProgress);
      onChange(res.url);
      qc.invalidateQueries({ queryKey: ["admin", "media"] });
      toast({ title: "Uploaded", description: file.name });
    } catch (e) {
      toast({ title: "Upload failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setProgress(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const preview = value ? (
    kind === "image" ? (
      <img src={value} alt="" className="w-full h-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.3")} />
    ) : kind === "video" ? (
      <video src={value} className="w-full h-full object-cover" muted />
    ) : (
      <div className="flex flex-col items-center justify-center h-full gap-1 text-xs" style={{ color: "var(--a-muted)" }}>
        <FileText className="w-7 h-7" />
        <span className="px-2 truncate max-w-full">{value.split("/").pop()}</span>
      </div>
    )
  ) : (
    <div className="flex flex-col items-center justify-center h-full gap-1 text-xs" style={{ color: "var(--a-muted)" }}>
      {kind === "pdf" ? <FileText className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
      <span>No {kind === "pdf" ? "PDF" : kind} yet</span>
    </div>
  );

  return (
    <div>
      {label && <label className="a-label">{label}</label>}
      <div className="flex gap-3 items-start">
        <div
          className="relative shrink-0 rounded-[10px] overflow-hidden border"
          style={{ width: kind === "image" || kind === "video" ? 132 : 110, height: kind === "pdf" ? 88 : 88, borderColor: "var(--a-border)", background: "var(--a-bg)" }}
        >
          {preview}
          {progress !== null && (
            <div className="absolute inset-0 bg-white/85 flex flex-col items-center justify-center text-xs font-semibold">
              <span className="a-spin mb-1" />
              {progress}%
            </div>
          )}
          {value && progress === null && (
            <button type="button" onClick={() => onChange("")} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center" aria-label="Remove">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="primary" onClick={() => fileRef.current?.click()} disabled={progress !== null}>
              <Upload className="w-3.5 h-3.5" /> Upload
            </Button>
            <Button size="sm" onClick={() => setLibraryOpen(true)}>
              <FolderOpen className="w-3.5 h-3.5" /> Library
            </Button>
            <Button size="sm" variant={linkMode ? "secondary" : "ghost"} onClick={() => setLinkMode((v) => !v)}>
              <Link2 className="w-3.5 h-3.5" /> Link
            </Button>
          </div>
          {linkMode && <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={kind === "pdf" ? "https://.../file.pdf" : "https://... or /image.webp"} />}
          {!linkMode && value && (
            <div className="text-[11.5px] truncate" style={{ color: "var(--a-muted)" }} title={value}>
              {value}
            </div>
          )}
          <input ref={fileRef} type="file" accept={ACCEPT[kind]} className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </div>
      </div>

      <MediaLibraryModal open={libraryOpen} onClose={() => setLibraryOpen(false)} kind={kind} onSelect={(url) => { onChange(url); setLibraryOpen(false); }} selected={value} />
    </div>
  );
}

export function MediaLibraryModal({ open, onClose, kind, onSelect, selected }: { open: boolean; onClose: () => void; kind?: Kind; onSelect: (url: string) => void; selected?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "media", kind ?? "all"],
    queryFn: () => api.list<MediaItem>("media", { kind, limit: 100 }),
    enabled: open,
  });
  const items = data?.items ?? [];
  return (
    <Modal open={open} onClose={onClose} title="Media Library" size="lg">
      {isLoading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState title="Library is empty" description="Upload a file using the Upload button — it will show up here for reuse." />
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {items.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelect(m.url)}
              className="relative aspect-square rounded-[10px] overflow-hidden border text-left"
              style={{ borderColor: selected === m.url ? "var(--a-accent)" : "var(--a-border)", background: "var(--a-bg)" }}
              title={m.originalName}
            >
              {m.kind === "image" ? (
                <img src={m.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-1 text-[10.5px] px-1" style={{ color: "var(--a-muted)" }}>
                  <FileText className="w-6 h-6" />
                  <span className="truncate max-w-full">{m.originalName}</span>
                </div>
              )}
              {selected === m.url && (
                <span className="absolute top-1 right-1 w-5 h-5 rounded-full text-white flex items-center justify-center" style={{ background: "var(--a-accent)" }}>
                  <Check className="w-3 h-3" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}
