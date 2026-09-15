import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload, FileText, Trash2, Copy } from "lucide-react";
import type { MediaItem } from "@shared/types";
import { PageTitle, Button, Tabs, Spinner, EmptyState, ConfirmDialog } from "../components/ui";
import { api } from "../lib/api";
import { useToast } from "@/hooks/use-toast";

export default function MediaPage() {
  const [kind, setKind] = useState<"" | "image" | "pdf" | "video">("");
  const [progress, setProgress] = useState<number | null>(null);
  const [deleteItem, setDeleteItem] = useState<MediaItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "media", kind || "all"],
    queryFn: () => api.list<MediaItem>("media", { kind: kind || undefined, limit: 120 }),
  });
  const items = data?.items ?? [];

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setProgress(0);
    try {
      await api.upload(file, setProgress);
      qc.invalidateQueries({ queryKey: ["admin", "media"] });
      toast({ title: "Uploaded", description: file.name });
    } catch (e) {
      toast({ title: "Upload failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setProgress(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard?.writeText(new URL(url, window.location.origin).toString());
    toast({ title: "Link copied" });
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    await api.del(`/api/admin/media/${deleteItem.id}`);
    setDeleteItem(null);
    qc.invalidateQueries({ queryKey: ["admin", "media"] });
    toast({ title: "Deleted" });
  };

  return (
    <div>
      <PageTitle
        title="Media Library"
        description="All uploaded photos, PDFs and videos in one place."
        actions={
          <Button variant="primary" onClick={() => fileRef.current?.click()} loading={progress !== null}>
            <Upload className="w-4 h-4" /> {progress !== null ? `Uploading ${progress}%` : "Upload File"}
          </Button>
        }
      />
      <input ref={fileRef} type="file" accept="image/*,application/pdf,video/mp4,video/webm" className="hidden" onChange={(e) => handleUpload(e.target.files?.[0])} />

      <div className="mb-4">
        <Tabs
          value={kind}
          onChange={setKind}
          tabs={[
            { value: "", label: "All" },
            { value: "image", label: "Images" },
            { value: "pdf", label: "PDFs" },
            { value: "video", label: "Videos" },
          ]}
        />
      </div>

      {isLoading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <div className="a-card">
          <EmptyState title="No files yet" description="Upload photos, PDFs or videos — they can then be reused anywhere in the admin panel." action={<Button variant="primary" onClick={() => fileRef.current?.click()}><Upload className="w-4 h-4" /> Upload File</Button>} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {items.map((m) => (
            <div key={m.id} className="a-card overflow-hidden">
              <div className="aspect-square relative" style={{ background: "var(--a-bg)" }}>
                {m.kind === "image" ? (
                  <img src={m.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                ) : m.kind === "video" ? (
                  <video src={m.url} className="w-full h-full object-cover" muted />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-1" style={{ color: "var(--a-muted)" }}>
                    <FileText className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="p-2">
                <div className="text-[11px] truncate font-medium" title={m.originalName}>
                  {m.originalName || m.filename}
                </div>
                <div className="text-[10.5px] mt-0.5" style={{ color: "var(--a-muted)" }}>
                  {(m.size / 1024).toFixed(0)} KB
                </div>
                <div className="flex gap-1 mt-2">
                  <Button size="sm" variant="ghost" className="flex-1" onClick={() => copyUrl(m.url)}>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setDeleteItem(m)} aria-label="Delete">
                    <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--a-danger)" }} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete file?"
        message="If this file is used anywhere on the site, that image/link will break. Make sure nothing depends on it first."
      />
    </div>
  );
}
