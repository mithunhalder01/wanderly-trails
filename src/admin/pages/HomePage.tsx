import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import type { HomeContent, SiteSettings, TripCard } from "@shared/types";
import { PageTitle, Card, Field, Input, Textarea, Button, Tabs, Spinner } from "../components/ui";
import { MediaPicker } from "../components/MediaPicker";
import { api, ApiError } from "../lib/api";
import { useToast } from "@/hooks/use-toast";

type Tab = "hero" | "about" | "trips" | "services" | "vibe" | "faqs" | "footer";

export default function HomePageEditor() {
  const [tab, setTab] = useState<Tab>("hero");
  const [home, setHome] = useState<HomeContent | null>(null);
  const [saving, setSaving] = useState(false);
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({ queryKey: ["admin", "settings"], queryFn: () => api.get<SiteSettings>("/api/admin/settings") });

  useEffect(() => {
    if (data && !home) setHome(data.home);
  }, [data, home]);

  if (isLoading || !home) return <Spinner />;

  const set = <K extends keyof HomeContent>(k: K, v: HomeContent[K]) => setHome((h) => (h ? { ...h, [k]: v } : h));

  const save = async () => {
    setSaving(true);
    try {
      await api.put("/api/admin/settings", { home });
      qc.invalidateQueries({ queryKey: ["admin", "settings"] });
      toast({ title: "Home page saved", description: "Live on your website now." });
    } catch (e) {
      toast({ title: "Couldn't save", description: e instanceof ApiError ? e.message : (e as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageTitle
        title="Home Page"
        description="Everything shown on your homepage, section by section."
        actions={
          <Button variant="primary" loading={saving} onClick={save}>
            Save Home Page
          </Button>
        }
      />

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "hero", label: "Hero & Stats" },
          { value: "about", label: "About" },
          { value: "trips", label: "Trip Carousels" },
          { value: "services", label: "Services & Why Us" },
          { value: "vibe", label: "Vibe Videos" },
          { value: "faqs", label: "FAQs" },
          { value: "footer", label: "Footer" },
        ]}
      />

      <div className="mt-5 flex flex-col gap-4">
        {tab === "hero" && (
          <>
            <Card title="Hero Section" description="The big banner at the top of the homepage.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Brand Line" hint='Small text above the title, e.g. "WANDERLY TRAILS"'>
                  <Input value={home.hero.brandLine} onChange={(e) => set("hero", { ...home.hero, brandLine: e.target.value })} />
                </Field>
                <Field label="Title">
                  <Input value={home.hero.title} onChange={(e) => set("hero", { ...home.hero, title: e.target.value })} />
                </Field>
                <Field label="Highlighted Word">
                  <Input value={home.hero.titleHighlight} onChange={(e) => set("hero", { ...home.hero, titleHighlight: e.target.value })} />
                </Field>
                <Field label="Primary Button">
                  <Input value={home.hero.ctaPrimary} onChange={(e) => set("hero", { ...home.hero, ctaPrimary: e.target.value })} />
                </Field>
                <Field label="Secondary Button">
                  <Input value={home.hero.ctaSecondary} onChange={(e) => set("hero", { ...home.hero, ctaSecondary: e.target.value })} />
                </Field>
                <Field label="Description" className="sm:col-span-2">
                  <Textarea rows={3} value={home.hero.description} onChange={(e) => set("hero", { ...home.hero, description: e.target.value })} />
                </Field>
                <Field label="Background Video" className="sm:col-span-2">
                  <MediaPicker value={home.hero.video} onChange={(url) => set("hero", { ...home.hero, video: url })} kind="video" />
                </Field>
                <Field label="Fallback Image" hint="Shown if video can't load" className="sm:col-span-2">
                  <MediaPicker value={home.hero.image} onChange={(url) => set("hero", { ...home.hero, image: url })} kind="image" />
                </Field>
              </div>
            </Card>

            <Card title="Stats Strip" description="Numbers shown under the hero (tours, rating, customers).">
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="Tours">
                  <Input type="number" value={home.stats.tours.value} onChange={(e) => set("stats", { ...home.stats, tours: { ...home.stats.tours, value: Number(e.target.value) } })} />
                  <Input className="mt-2" value={home.stats.tours.label} onChange={(e) => set("stats", { ...home.stats, tours: { ...home.stats.tours, label: e.target.value } })} placeholder="Label" />
                </Field>
                <Field label="Rating">
                  <Input type="number" step={0.1} value={home.stats.rating.value} onChange={(e) => set("stats", { ...home.stats, rating: { ...home.stats.rating, value: Number(e.target.value) } })} />
                  <Input className="mt-2" value={home.stats.rating.label} onChange={(e) => set("stats", { ...home.stats, rating: { ...home.stats.rating, label: e.target.value } })} placeholder="Label" />
                </Field>
                <Field label="Happy Customers">
                  <Input type="number" value={home.stats.customers.value} onChange={(e) => set("stats", { ...home.stats, customers: { ...home.stats.customers, value: Number(e.target.value) } })} />
                  <Input className="mt-2" value={home.stats.customers.label} onChange={(e) => set("stats", { ...home.stats, customers: { ...home.stats.customers, label: e.target.value } })} placeholder="Label" />
                </Field>
              </div>
            </Card>
          </>
        )}

        {tab === "about" && (
          <Card title="About Section">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Badge">
                <Input value={home.about.badge} onChange={(e) => set("about", { ...home.about, badge: e.target.value })} />
              </Field>
              <Field label="Title Highlight">
                <Input value={home.about.titleHighlight} onChange={(e) => set("about", { ...home.about, titleHighlight: e.target.value })} />
              </Field>
              <Field label="Title" className="sm:col-span-2">
                <Input value={home.about.title} onChange={(e) => set("about", { ...home.about, title: e.target.value })} />
              </Field>
              <Field label="Paragraph 1" className="sm:col-span-2">
                <Textarea rows={3} value={home.about.paragraph1} onChange={(e) => set("about", { ...home.about, paragraph1: e.target.value })} />
              </Field>
              <Field label="Paragraph 2" className="sm:col-span-2">
                <Textarea rows={3} value={home.about.paragraph2} onChange={(e) => set("about", { ...home.about, paragraph2: e.target.value })} />
              </Field>
              <Field label="Main Image">
                <MediaPicker value={home.about.imageMain} onChange={(url) => set("about", { ...home.about, imageMain: url })} kind="image" />
              </Field>
              <Field label="Side Image">
                <MediaPicker value={home.about.imageSide} onChange={(url) => set("about", { ...home.about, imageSide: url })} kind="image" />
              </Field>
            </div>
          </Card>
        )}

        {tab === "trips" && (
          <>
            <TripCarouselEditor title="India Trips Carousel" value={home.indiaTrips} onChange={(v) => set("indiaTrips", v)} />
            <TripCarouselEditor title="Weekend Getaways Carousel" value={home.weekendGetaways} onChange={(v) => set("weekendGetaways", v)} />
          </>
        )}

        {tab === "services" && (
          <>
            <Card title="Services" description="Three service highlights.">
              <ListEditor
                items={home.services}
                onChange={(v) => set("services", v)}
                empty={{ num: String(home.services.length + 1).padStart(2, "0"), title: "", description: "" }}
                render={(item, update) => (
                  <div className="grid sm:grid-cols-[70px_1fr] gap-2">
                    <Input value={item.num} onChange={(e) => update({ ...item, num: e.target.value })} placeholder="01" />
                    <Input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" />
                    <Textarea className="sm:col-span-2" rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" />
                  </div>
                )}
              />
            </Card>
            <Card title="Why Choose Us">
              <ListEditor
                items={home.whyChoose}
                onChange={(v) => set("whyChoose", v)}
                empty={{ title: "", description: "" }}
                render={(item, update) => (
                  <div className="flex flex-col gap-2">
                    <Input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" />
                    <Textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" />
                  </div>
                )}
              />
            </Card>
          </>
        )}

        {tab === "vibe" && (
          <Card title="Vibe Section" description="Short video cards ('Make Every Trip An Unforgettable Story').">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <Field label="Title">
                <Input value={home.vibe.title} onChange={(e) => set("vibe", { ...home.vibe, title: e.target.value })} />
              </Field>
              <Field label="Highlight Word">
                <Input value={home.vibe.titleHighlight} onChange={(e) => set("vibe", { ...home.vibe, titleHighlight: e.target.value })} />
              </Field>
              <Field label="Subtitle" className="sm:col-span-2">
                <Input value={home.vibe.subtitle} onChange={(e) => set("vibe", { ...home.vibe, subtitle: e.target.value })} />
              </Field>
            </div>
            <ListEditor
              items={home.vibe.cards}
              onChange={(v) => set("vibe", { ...home.vibe, cards: v })}
              empty={{ title: "", subtitle: "", video: "", poster: "" }}
              render={(item, update) => (
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" />
                  <Input value={item.subtitle} onChange={(e) => update({ ...item, subtitle: e.target.value })} placeholder="Subtitle" />
                  <MediaPicker value={item.video} onChange={(url) => update({ ...item, video: url })} kind="video" label="Video" />
                  <MediaPicker value={item.poster} onChange={(url) => update({ ...item, poster: url })} kind="image" label="Poster image" />
                </div>
              )}
            />
          </Card>
        )}

        {tab === "faqs" && (
          <Card title="Frequently Asked Questions">
            <ListEditor
              items={home.faqs}
              onChange={(v) => set("faqs", v)}
              empty={{ q: "", a: "" }}
              render={(item, update) => (
                <div className="flex flex-col gap-2">
                  <Input value={item.q} onChange={(e) => update({ ...item, q: e.target.value })} placeholder="Question" />
                  <Textarea rows={2} value={item.a} onChange={(e) => update({ ...item, a: e.target.value })} placeholder="Answer" />
                </div>
              )}
            />
          </Card>
        )}

        {tab === "footer" && (
          <Card title="Footer Destinations List" description="Quick links shown in the site footer.">
            <Textarea
              rows={8}
              value={home.footerDestinations.join("\n")}
              onChange={(e) => set("footerDestinations", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
            />
            <p className="a-hint">One destination name per line.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ---------- Reusable repeater ---------- */

function ListEditor<T>({ items, onChange, empty, render }: { items: T[]; onChange: (v: T[]) => void; empty: T; render: (item: T, update: (v: T) => void) => React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="a-card p-3" style={{ background: "var(--a-bg)" }}>
          <div className="flex items-start gap-2">
            <div className="flex-1">{render(item, (v) => onChange(items.map((x, xi) => (xi === i ? v : x))))}</div>
            <Button size="icon" variant="ghost" onClick={() => onChange(items.filter((_, xi) => xi !== i))} aria-label="Remove">
              <Trash2 className="w-4 h-4" style={{ color: "var(--a-danger)" }} />
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={() => onChange([...items, empty])}>
        <Plus className="w-4 h-4" /> Add
      </Button>
    </div>
  );
}

function TripCarouselEditor({ title, value, onChange }: { title: string; value: HomeContent["indiaTrips"]; onChange: (v: HomeContent["indiaTrips"]) => void }) {
  return (
    <Card title={title}>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <Field label="Section Title">
          <Input value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
        </Field>
        <Field label="Button Text">
          <Input value={value.cta} onChange={(e) => onChange({ ...value, cta: e.target.value })} />
        </Field>
        <Field label="Subtitle" className="sm:col-span-2">
          <Input value={value.subtitle} onChange={(e) => onChange({ ...value, subtitle: e.target.value })} />
        </Field>
        <Field label="Banner Image" className="sm:col-span-2">
          <MediaPicker value={value.bannerImage} onChange={(url) => onChange({ ...value, bannerImage: url })} kind="image" />
        </Field>
      </div>
      <ListEditor<TripCard>
        items={value.destinations}
        onChange={(v) => onChange({ ...value, destinations: v })}
        empty={{ name: "", price: 0, image: "" }}
        render={(item, update) => (
          <div className="grid sm:grid-cols-[1fr_120px] gap-2">
            <Input value={item.name} onChange={(e) => update({ ...item, name: e.target.value })} placeholder="Destination name" />
            <Input type="number" value={item.price} onChange={(e) => update({ ...item, price: Number(e.target.value) })} placeholder="Price" />
            <div className="sm:col-span-2">
              <MediaPicker value={item.image} onChange={(url) => update({ ...item, image: url })} kind="image" />
            </div>
          </div>
        )}
      />
    </Card>
  );
}
