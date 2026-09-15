import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Trash2, GripVertical } from "lucide-react";
import type { Destination, Itinerary, ItineraryDay, ItineraryPricing } from "@shared/types";
import { PageTitle, Modal, Field, Input, Textarea, Select, Switch, Button, Badge, Tabs } from "../components/ui";
import { DataTable } from "../components/DataTable";
import { MediaPicker } from "../components/MediaPicker";
import { api } from "../lib/api";
import { useEntityForm } from "../lib/useEntityForm";

const empty: Omit<Itinerary, "id" | "slug"> = {
  title: "",
  subtitle: "",
  route: "",
  durationPrice: "",
  contact: "",
  about: "",
  heroImage: "",
  destinationId: 0,
  days: [],
  pricing: [],
  inclusions: [],
  exclusions: [],
  notes: [],
  precautionsSafety: [],
  termsAndConditions: [],
  paymentPolicy: [],
  cancellationPolicy: [],
  pdfUrl: "",
  published: true,
};

const listToText = (arr: string[]) => arr.join("\n");
const textToList = (t: string) => t.split("\n").map((s) => s.trim()).filter(Boolean);

type TabKey = "basics" | "days" | "pricing" | "policies" | "pdf";

export default function ItinerariesPage() {
  const [editing, setEditing] = useState<Itinerary | null>(null);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>("basics");
  const form = useEntityForm("itineraries", editing, empty, () => setOpen(false));
  const { data: destData } = useQuery({ queryKey: ["admin", "destinations", "picker"], queryFn: () => api.list<Destination>("destinations", { limit: 200 }) });
  const destinations = destData?.items ?? [];

  const startCreate = () => {
    setEditing(null);
    setTab("basics");
    setOpen(true);
  };
  const startEdit = (row: Itinerary) => {
    setEditing(row);
    setTab("basics");
    setOpen(true);
  };

  const days = form.values.days;
  const setDays = (d: ItineraryDay[]) => form.set("days", d);
  const pricing = form.values.pricing;
  const setPricing = (p: ItineraryPricing[]) => form.set("pricing", p);

  return (
    <div>
      <PageTitle
        title="Itineraries"
        description="Full day-by-day trip plans (Kashmir Tour, Ladakh Tour, etc). Attach a PDF here to power the 'Download PDF' button."
      />

      <DataTable<Itinerary>
        resource="itineraries"
        label="Itinerary"
        onCreate={startCreate}
        onEdit={startEdit}
        columns={[
          {
            header: "Itinerary",
            cell: (it) => (
              <div className="flex items-center gap-3">
                <img src={it.heroImage} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{it.title}</div>
                  <div className="text-xs truncate" style={{ color: "var(--a-muted)" }}>
                    {it.durationPrice}
                  </div>
                </div>
              </div>
            ),
          },
          { header: "Days", cell: (it) => it.days.length },
          { header: "PDF", cell: (it) => (it.pdfUrl ? <Badge tone="success">Uploaded</Badge> : <Badge tone="warn">Missing</Badge>) },
        ]}
        renderCard={(it) => (
          <div className="flex items-center gap-3">
            <img src={it.heroImage} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" style={{ background: "var(--a-bg)" }} />
            <div className="min-w-0">
              <div className="font-semibold truncate">{it.title}</div>
              <div className="text-xs" style={{ color: "var(--a-muted)" }}>
                {it.days.length} days · {it.pdfUrl ? "PDF attached" : "No PDF"}
              </div>
            </div>
          </div>
        )}
      />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? `Edit ${editing.title}` : "Add Itinerary"} size="lg">
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { value: "basics", label: "Basics" },
            { value: "days", label: "Day Plan", count: days.length },
            { value: "pricing", label: "Pricing", count: pricing.length },
            { value: "policies", label: "Policies" },
            { value: "pdf", label: "PDF" },
          ]}
        />

        <div className="mt-5">
          {tab === "basics" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title" required error={form.errors.title} className="sm:col-span-2">
                <Input value={form.values.title} onChange={(e) => form.set("title", e.target.value)} placeholder="e.g. Kashmir Tour" />
              </Field>
              <Field label="Hero Image" className="sm:col-span-2">
                <MediaPicker value={form.values.heroImage} onChange={(url) => form.set("heroImage", url)} kind="image" />
              </Field>
              <Field label="Linked Destination">
                <Select value={form.values.destinationId ?? 0} onChange={(e) => form.set("destinationId", Number(e.target.value))}>
                  <option value={0}>— None —</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Duration & Price line" hint='e.g. "6D/5N at Rs.16500/- ONWARDS"'>
                <Input value={form.values.durationPrice} onChange={(e) => form.set("durationPrice", e.target.value)} />
              </Field>
              <Field label="Route">
                <Input value={form.values.route} onChange={(e) => form.set("route", e.target.value)} placeholder="Srinagar - Pahalgam - Gulmarg - Srinagar" />
              </Field>
              <Field label="Contact line">
                <Input value={form.values.contact} onChange={(e) => form.set("contact", e.target.value)} />
              </Field>
              <Field label="Subtitle / Tagline" className="sm:col-span-2">
                <Input value={form.values.subtitle} onChange={(e) => form.set("subtitle", e.target.value)} />
              </Field>
              <Field label="About this trip" className="sm:col-span-2">
                <Textarea rows={4} value={form.values.about} onChange={(e) => form.set("about", e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <Switch checked={form.values.published} onChange={(v) => form.set("published", v)} label="Published" description="Visible on the live site" />
              </div>
            </div>
          )}

          {tab === "days" && (
            <div className="flex flex-col gap-3">
              {days.map((d, i) => (
                <div key={i} className="a-card p-3 flex gap-2 items-start">
                  <GripVertical className="w-4 h-4 mt-3 shrink-0" style={{ color: "var(--a-muted)" }} />
                  <div className="flex-1 grid sm:grid-cols-[100px_1fr] gap-2">
                    <Input placeholder="Day 1" value={d.day} onChange={(e) => setDays(days.map((x, xi) => (xi === i ? { ...x, day: e.target.value } : x)))} />
                    <Input placeholder="Heading (e.g. ARRIVE — SRINAGAR)" value={d.heading} onChange={(e) => setDays(days.map((x, xi) => (xi === i ? { ...x, heading: e.target.value } : x)))} />
                    <Textarea
                      className="sm:col-span-2"
                      rows={2}
                      placeholder="What happens on this day..."
                      value={d.description}
                      onChange={(e) => setDays(days.map((x, xi) => (xi === i ? { ...x, description: e.target.value } : x)))}
                    />
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => setDays(days.filter((_, xi) => xi !== i))} aria-label="Remove day">
                    <Trash2 className="w-4 h-4" style={{ color: "var(--a-danger)" }} />
                  </Button>
                </div>
              ))}
              <Button onClick={() => setDays([...days, { day: `Day ${days.length + 1}`, heading: "", description: "" }])}>
                <Plus className="w-4 h-4" /> Add Day
              </Button>
            </div>
          )}

          {tab === "pricing" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {pricing.map((p, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input placeholder="Room type (e.g. Double Sharing)" value={p.type} onChange={(e) => setPricing(pricing.map((x, xi) => (xi === i ? { ...x, type: e.target.value } : x)))} />
                    <Input placeholder="Price (e.g. 14,999)" value={p.price} onChange={(e) => setPricing(pricing.map((x, xi) => (xi === i ? { ...x, price: e.target.value } : x)))} className="max-w-[160px]" />
                    <Button size="icon" variant="ghost" onClick={() => setPricing(pricing.filter((_, xi) => xi !== i))} aria-label="Remove">
                      <Trash2 className="w-4 h-4" style={{ color: "var(--a-danger)" }} />
                    </Button>
                  </div>
                ))}
                <Button onClick={() => setPricing([...pricing, { type: "", price: "" }])}>
                  <Plus className="w-4 h-4" /> Add price option
                </Button>
              </div>
              <Field label="Inclusions" hint="One item per line">
                <Textarea rows={5} value={listToText(form.values.inclusions)} onChange={(e) => form.set("inclusions", textToList(e.target.value))} />
              </Field>
              <Field label="Exclusions" hint="One item per line">
                <Textarea rows={5} value={listToText(form.values.exclusions)} onChange={(e) => form.set("exclusions", textToList(e.target.value))} />
              </Field>
            </div>
          )}

          {tab === "policies" && (
            <div className="flex flex-col gap-4">
              <Field label="Notes" hint="One point per line">
                <Textarea rows={3} value={listToText(form.values.notes)} onChange={(e) => form.set("notes", textToList(e.target.value))} />
              </Field>
              <Field label="Safety & Precautions" hint="One point per line">
                <Textarea rows={3} value={listToText(form.values.precautionsSafety)} onChange={(e) => form.set("precautionsSafety", textToList(e.target.value))} />
              </Field>
              <Field label="Terms & Conditions" hint="One point per line">
                <Textarea rows={4} value={listToText(form.values.termsAndConditions)} onChange={(e) => form.set("termsAndConditions", textToList(e.target.value))} />
              </Field>
              <Field label="Payment Policy" hint="One point per line">
                <Textarea rows={3} value={listToText(form.values.paymentPolicy)} onChange={(e) => form.set("paymentPolicy", textToList(e.target.value))} />
              </Field>
              <Field label="Cancellation Policy" hint="One point per line">
                <Textarea rows={3} value={listToText(form.values.cancellationPolicy)} onChange={(e) => form.set("cancellationPolicy", textToList(e.target.value))} />
              </Field>
            </div>
          )}

          {tab === "pdf" && (
            <div>
              <Field label="Itinerary PDF" hint="Upload the ready-made PDF brochure for this trip. Visitors will download exactly this file when they click 'Download PDF' — nothing is auto-generated.">
                <MediaPicker value={form.values.pdfUrl ?? ""} onChange={(url) => form.set("pdfUrl", url)} kind="pdf" />
              </Field>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t" style={{ borderColor: "var(--a-border)" }}>
          <div>{!form.values.published && <Badge tone="warn">Draft — hidden from visitors</Badge>}</div>
          <div className="flex gap-2">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={form.saving} onClick={() => form.save()}>
              {editing ? "Save Changes" : "Create Itinerary"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
