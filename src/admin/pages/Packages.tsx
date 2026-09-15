import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Destination, Package } from "@shared/types";
import { PageTitle, Modal, Field, Input, Textarea, Select, Switch, Button, Badge } from "../components/ui";
import { DataTable } from "../components/DataTable";
import { MediaPicker } from "../components/MediaPicker";
import { api } from "../lib/api";
import { useEntityForm } from "../lib/useEntityForm";

const empty: Omit<Package, "id" | "slug" | "gallery"> & { gallery: string[] } = {
  destinationId: 0,
  destinationName: "",
  title: "",
  description: "",
  imageUrl: "",
  gallery: [],
  price: 0,
  duration: 1,
  nights: 0,
  category: "",
  rating: 4.5,
  hotelStars: 3,
  mealsIncluded: true,
  transportIncluded: true,
  includedItems: "",
  excludedItems: "",
  itinerary: "",
  itinerarySlug: "",
  pdfUrl: "",
  featured: false,
  published: true,
  sortOrder: 0,
};

export default function PackagesPage() {
  const [editing, setEditing] = useState<Package | null>(null);
  const [open, setOpen] = useState(false);
  const form = useEntityForm("packages", editing, empty, () => setOpen(false));
  const { data: destData } = useQuery({ queryKey: ["admin", "destinations", "picker"], queryFn: () => api.list<Destination>("destinations", { limit: 200 }) });
  const destinations = destData?.items ?? [];

  const startCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const startEdit = (row: Package) => {
    setEditing(row);
    setOpen(true);
  };

  return (
    <div>
      <PageTitle title="Packages" description="Tour packages with pricing, inclusions and itinerary." />

      <DataTable<Package>
        resource="packages"
        label="Package"
        onCreate={startCreate}
        onEdit={startEdit}
        columns={[
          {
            header: "Package",
            cell: (p) => (
              <div className="flex items-center gap-3">
                <img src={p.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{p.title}</div>
                  <div className="text-xs truncate" style={{ color: "var(--a-muted)" }}>
                    {p.destinationName} · {p.duration}D/{p.nights}N
                  </div>
                </div>
              </div>
            ),
          },
          { header: "Price", cell: (p) => `₹${p.price.toLocaleString("en-IN")}` },
          { header: "PDF", cell: (p) => (p.pdfUrl ? <Badge tone="success">Attached</Badge> : <Badge>None</Badge>) },
        ]}
        renderCard={(p) => (
          <div className="flex items-center gap-3">
            <img src={p.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
            <div className="min-w-0">
              <div className="font-semibold truncate">{p.title}</div>
              <div className="text-xs" style={{ color: "var(--a-muted)" }}>
                {p.destinationName} · ₹{p.price.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        )}
      />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? `Edit ${editing.title}` : "Add Package"} size="lg">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title" required error={form.errors.title} className="sm:col-span-2">
            <Input value={form.values.title} onChange={(e) => form.set("title", e.target.value)} placeholder="e.g. Kashmir Paradise — 6D/5N" aria-invalid={!!form.errors.title} />
          </Field>

          <Field label="Cover Image" className="sm:col-span-2">
            <MediaPicker value={form.values.imageUrl} onChange={(url) => form.set("imageUrl", url)} kind="image" />
          </Field>

          <Field label="Destination">
            <Select
              value={form.values.destinationId}
              onChange={(e) => {
                const id = Number(e.target.value);
                const d = destinations.find((x) => x.id === id);
                form.set("destinationId", id);
                if (d) form.set("destinationName", d.name);
              }}
            >
              <option value={0}>— Select destination —</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Category">
            <Input value={form.values.category} onChange={(e) => form.set("category", e.target.value)} placeholder="Honeymoon, Family, Adventure..." />
          </Field>

          <Field label="Price (₹)" required error={form.errors.price}>
            <Input type="number" min={0} value={form.values.price} onChange={(e) => form.set("price", Number(e.target.value))} />
          </Field>
          <Field label="Hotel Stars">
            <Input type="number" min={0} max={7} value={form.values.hotelStars} onChange={(e) => form.set("hotelStars", Number(e.target.value))} />
          </Field>

          <Field label="Duration (days)">
            <Input type="number" min={1} value={form.values.duration} onChange={(e) => form.set("duration", Number(e.target.value))} />
          </Field>
          <Field label="Nights">
            <Input type="number" min={0} value={form.values.nights} onChange={(e) => form.set("nights", Number(e.target.value))} />
          </Field>

          <Field label="Description" className="sm:col-span-2">
            <Textarea rows={3} value={form.values.description} onChange={(e) => form.set("description", e.target.value)} />
          </Field>

          <Field label="What's Included" hint="One item per line" className="sm:col-span-2">
            <Textarea rows={3} value={form.values.includedItems} onChange={(e) => form.set("includedItems", e.target.value)} />
          </Field>
          <Field label="What's Excluded" hint="One item per line" className="sm:col-span-2">
            <Textarea rows={3} value={form.values.excludedItems} onChange={(e) => form.set("excludedItems", e.target.value)} />
          </Field>

          <Field label="Day-wise Itinerary (text)" hint="Plain summary shown on the package page. For a full formatted itinerary with its own page, use the Itineraries section instead." className="sm:col-span-2">
            <Textarea rows={5} value={form.values.itinerary} onChange={(e) => form.set("itinerary", e.target.value)} />
          </Field>

          <Field label="Linked Itinerary Slug" hint="Slug of a detailed itinerary from the Itineraries section (optional)." className="sm:col-span-2">
            <Input value={form.values.itinerarySlug ?? ""} onChange={(e) => form.set("itinerarySlug", e.target.value)} placeholder="e.g. kashmir-tour" />
          </Field>

          <Field label="Itinerary PDF" hint="Visitors can download this from the package page's 'Download Itinerary' button." className="sm:col-span-2">
            <MediaPicker value={form.values.pdfUrl ?? ""} onChange={(url) => form.set("pdfUrl", url)} kind="pdf" />
          </Field>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-6 pt-1">
            <Switch checked={form.values.mealsIncluded} onChange={(v) => form.set("mealsIncluded", v)} label="Meals Included" />
            <Switch checked={form.values.transportIncluded} onChange={(v) => form.set("transportIncluded", v)} label="Transport Included" />
            <Switch checked={form.values.featured} onChange={(v) => form.set("featured", v)} label="Featured" />
            <Switch checked={form.values.published} onChange={(v) => form.set("published", v)} label="Published" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t" style={{ borderColor: "var(--a-border)" }}>
          <div>{!form.values.published && <Badge tone="warn">Draft — hidden from visitors</Badge>}</div>
          <div className="flex gap-2">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={form.saving} onClick={() => form.save()}>
              {editing ? "Save Changes" : "Create Package"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
