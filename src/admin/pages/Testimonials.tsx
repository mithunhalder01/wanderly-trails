import { useState } from "react";
import type { Testimonial } from "@shared/types";
import { PageTitle, Modal, Field, Input, Textarea, Switch, Button, Badge } from "../components/ui";
import { DataTable } from "../components/DataTable";
import { MediaPicker } from "../components/MediaPicker";
import { useEntityForm } from "../lib/useEntityForm";

const empty: Omit<Testimonial, "id"> = {
  name: "",
  location: "",
  rating: 5,
  review: "",
  avatarUrl: "",
  destination: "",
  published: true,
  sortOrder: 0,
};

export default function TestimonialsPage() {
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [open, setOpen] = useState(false);
  const form = useEntityForm("testimonials", editing, empty, () => setOpen(false));

  const startCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const startEdit = (row: Testimonial) => {
    setEditing(row);
    setOpen(true);
  };

  return (
    <div>
      <PageTitle title="Reviews" description="Customer testimonials shown across the site." />

      <DataTable<Testimonial>
        resource="testimonials"
        label="Review"
        onCreate={startCreate}
        onEdit={startEdit}
        columns={[
          {
            header: "Customer",
            cell: (t) => (
              <div className="flex items-center gap-3">
                <img src={t.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{t.name}</div>
                  <div className="text-xs truncate" style={{ color: "var(--a-muted)" }}>
                    {t.destination}
                  </div>
                </div>
              </div>
            ),
          },
          { header: "Rating", cell: (t) => `★ ${t.rating}` },
          { header: "Review", cell: (t) => <span className="line-clamp-1 max-w-xs block">{t.review}</span> },
        ]}
        renderCard={(t) => (
          <div>
            <div className="flex items-center gap-3">
              <img src={t.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
              <div className="min-w-0">
                <div className="font-semibold truncate">{t.name}</div>
                <div className="text-xs" style={{ color: "var(--a-muted)" }}>
                  ★ {t.rating} · {t.destination}
                </div>
              </div>
            </div>
            <p className="text-xs mt-2 line-clamp-2" style={{ color: "var(--a-muted)" }}>{t.review}</p>
          </div>
        )}
      />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? `Edit ${editing.name}` : "Add Review"} size="md">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Photo" className="sm:col-span-2">
            <MediaPicker value={form.values.avatarUrl} onChange={(url) => form.set("avatarUrl", url)} kind="image" />
          </Field>
          <Field label="Name" required error={form.errors.name}>
            <Input value={form.values.name} onChange={(e) => form.set("name", e.target.value)} />
          </Field>
          <Field label="Location">
            <Input value={form.values.location} onChange={(e) => form.set("location", e.target.value)} placeholder="Delhi, India" />
          </Field>
          <Field label="Destination Visited">
            <Input value={form.values.destination} onChange={(e) => form.set("destination", e.target.value)} />
          </Field>
          <Field label="Rating (1–5)">
            <Input type="number" min={1} max={5} value={form.values.rating} onChange={(e) => form.set("rating", Number(e.target.value))} />
          </Field>
          <Field label="Review" required error={form.errors.review} className="sm:col-span-2">
            <Textarea rows={4} value={form.values.review} onChange={(e) => form.set("review", e.target.value)} />
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
              {editing ? "Save Changes" : "Add Review"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
