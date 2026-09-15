import { useState } from "react";
import type { Destination } from "@shared/types";
import { PageTitle, Modal, Field, Input, Textarea, Switch, Button, Badge } from "../components/ui";
import { DataTable } from "../components/DataTable";
import { MediaPicker } from "../components/MediaPicker";
import { useEntityForm } from "../lib/useEntityForm";

const empty: Omit<Destination, "id" | "slug" | "gallery"> & { gallery: string[] } = {
  name: "",
  country: "India",
  category: "",
  description: "",
  imageUrl: "",
  gallery: [],
  rating: 4.5,
  startingPrice: 0,
  bestSeason: "",
  weather: "",
  featured: false,
  published: true,
  itinerarySlug: "",
  pdfUrl: "",
  sortOrder: 0,
};

export default function DestinationsPage() {
  const [editing, setEditing] = useState<Destination | null>(null);
  const [open, setOpen] = useState(false);
  const form = useEntityForm("destinations", editing, empty, () => setOpen(false));

  const startCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const startEdit = (row: Destination) => {
    setEditing(row);
    setOpen(true);
  };

  return (
    <div>
      <PageTitle title="Destinations" description="Places shown on the Destinations page and homepage sliders." />

      <DataTable<Destination>
        resource="destinations"
        label="Destination"
        onCreate={startCreate}
        onEdit={startEdit}
        columns={[
          {
            header: "Destination",
            cell: (d) => (
              <div className="flex items-center gap-3">
                <img src={d.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{d.name}</div>
                  <div className="text-xs truncate" style={{ color: "var(--a-muted)" }}>
                    {d.category} · {d.country}
                  </div>
                </div>
              </div>
            ),
          },
          { header: "Starting price", cell: (d) => `₹${d.startingPrice.toLocaleString("en-IN")}` },
          { header: "Rating", cell: (d) => `★ ${d.rating}` },
        ]}
        renderCard={(d) => (
          <div className="flex items-center gap-3">
            <img src={d.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
            <div className="min-w-0">
              <div className="font-semibold truncate">{d.name}</div>
              <div className="text-xs" style={{ color: "var(--a-muted)" }}>
                {d.category} · ₹{d.startingPrice.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        )}
      />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? `Edit ${editing.name}` : "Add Destination"} size="lg">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name" required error={form.errors.name} className="sm:col-span-2">
            <Input value={form.values.name} onChange={(e) => form.set("name", e.target.value)} placeholder="e.g. Kashmir" aria-invalid={!!form.errors.name} />
          </Field>

          <Field label="Cover Image" className="sm:col-span-2">
            <MediaPicker value={form.values.imageUrl} onChange={(url) => form.set("imageUrl", url)} kind="image" />
          </Field>

          <Field label="Category">
            <Input value={form.values.category} onChange={(e) => form.set("category", e.target.value)} placeholder="Mountains, Beach, Adventure..." />
          </Field>
          <Field label="Country">
            <Input value={form.values.country} onChange={(e) => form.set("country", e.target.value)} />
          </Field>

          <Field label="Starting Price (₹)" required error={form.errors.startingPrice}>
            <Input type="number" min={0} value={form.values.startingPrice} onChange={(e) => form.set("startingPrice", Number(e.target.value))} />
          </Field>
          <Field label="Rating (0–5)">
            <Input type="number" min={0} max={5} step={0.1} value={form.values.rating} onChange={(e) => form.set("rating", Number(e.target.value))} />
          </Field>

          <Field label="Best Season">
            <Input value={form.values.bestSeason} onChange={(e) => form.set("bestSeason", e.target.value)} placeholder="March to June & Sep to Nov" />
          </Field>
          <Field label="Weather">
            <Input value={form.values.weather} onChange={(e) => form.set("weather", e.target.value)} placeholder="Cool mountain climate" />
          </Field>

          <Field label="Description" className="sm:col-span-2">
            <Textarea rows={4} value={form.values.description} onChange={(e) => form.set("description", e.target.value)} />
          </Field>

          <Field label="Linked Itinerary Slug" hint="If you've created a detailed day-by-day itinerary for this destination, paste its slug here so the 'View Itinerary' button links to it." className="sm:col-span-2">
            <Input value={form.values.itinerarySlug ?? ""} onChange={(e) => form.set("itinerarySlug", e.target.value)} placeholder="e.g. kashmir-tour" />
          </Field>

          <Field label="Brochure PDF" hint="Shown as a 'Download PDF Brochure' button on the destination page." className="sm:col-span-2">
            <MediaPicker value={form.values.pdfUrl ?? ""} onChange={(url) => form.set("pdfUrl", url)} kind="pdf" />
          </Field>

          <div className="sm:col-span-2 flex items-center gap-6 pt-1">
            <Switch checked={form.values.featured} onChange={(v) => form.set("featured", v)} label="Featured" description="Show in featured lists" />
            <Switch checked={form.values.published} onChange={(v) => form.set("published", v)} label="Published" description="Visible on live site" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t" style={{ borderColor: "var(--a-border)" }}>
          <div>{!form.values.published && <Badge tone="warn">Draft — hidden from visitors</Badge>}</div>
          <div className="flex gap-2">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={form.saving} onClick={() => form.save()}>
              {editing ? "Save Changes" : "Create Destination"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
