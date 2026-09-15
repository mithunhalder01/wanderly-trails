import { useState } from "react";
import type { BlogPost } from "@shared/types";
import { PageTitle, Modal, Field, Input, Textarea, Switch, Button, Badge } from "../components/ui";
import { DataTable } from "../components/DataTable";
import { MediaPicker } from "../components/MediaPicker";
import { useEntityForm } from "../lib/useEntityForm";

const empty: Omit<BlogPost, "id" | "slug"> = {
  title: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  category: "Travel",
  author: "Wanderly Trails",
  readTime: 5,
  publishedAt: new Date().toISOString().slice(0, 10),
  published: true,
};

export default function BlogPage() {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [open, setOpen] = useState(false);
  const form = useEntityForm("blog", editing, empty, () => setOpen(false));

  const startCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const startEdit = (row: BlogPost) => {
    setEditing(row);
    setOpen(true);
  };

  return (
    <div>
      <PageTitle title="Blog" description="Articles shown on the Blog page." />

      <DataTable<BlogPost>
        resource="blog"
        label="Post"
        onCreate={startCreate}
        onEdit={startEdit}
        columns={[
          {
            header: "Post",
            cell: (b) => (
              <div className="flex items-center gap-3">
                <img src={b.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{b.title}</div>
                  <div className="text-xs truncate" style={{ color: "var(--a-muted)" }}>
                    {b.category} · {b.author}
                  </div>
                </div>
              </div>
            ),
          },
          { header: "Published", cell: (b) => b.publishedAt },
        ]}
        renderCard={(b) => (
          <div className="flex items-center gap-3">
            <img src={b.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
            <div className="min-w-0">
              <div className="font-semibold truncate">{b.title}</div>
              <div className="text-xs" style={{ color: "var(--a-muted)" }}>
                {b.category} · {b.publishedAt}
              </div>
            </div>
          </div>
        )}
      />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? `Edit ${editing.title}` : "Add Post"} size="lg">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title" required error={form.errors.title} className="sm:col-span-2">
            <Input value={form.values.title} onChange={(e) => form.set("title", e.target.value)} />
          </Field>
          <Field label="Cover Image" className="sm:col-span-2">
            <MediaPicker value={form.values.imageUrl} onChange={(url) => form.set("imageUrl", url)} kind="image" />
          </Field>
          <Field label="Category">
            <Input value={form.values.category} onChange={(e) => form.set("category", e.target.value)} />
          </Field>
          <Field label="Author">
            <Input value={form.values.author} onChange={(e) => form.set("author", e.target.value)} />
          </Field>
          <Field label="Published Date">
            <Input type="date" value={form.values.publishedAt} onChange={(e) => form.set("publishedAt", e.target.value)} />
          </Field>
          <Field label="Read Time (minutes)">
            <Input type="number" min={1} value={form.values.readTime} onChange={(e) => form.set("readTime", Number(e.target.value))} />
          </Field>
          <Field label="Excerpt" hint="Short summary shown on the blog list" className="sm:col-span-2">
            <Textarea rows={2} value={form.values.excerpt} onChange={(e) => form.set("excerpt", e.target.value)} />
          </Field>
          <Field label="Content" hint="Separate paragraphs with a blank line" className="sm:col-span-2">
            <Textarea rows={10} value={form.values.content} onChange={(e) => form.set("content", e.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Switch checked={form.values.published} onChange={(v) => form.set("published", v)} label="Published" description="Visible on live site" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t" style={{ borderColor: "var(--a-border)" }}>
          <div>{!form.values.published && <Badge tone="warn">Draft</Badge>}</div>
          <div className="flex gap-2">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={form.saving} onClick={() => form.save()}>
              {editing ? "Save Changes" : "Create Post"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
