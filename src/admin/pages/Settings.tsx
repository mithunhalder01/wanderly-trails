import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { SiteSettings } from "@shared/types";
import { PageTitle, Card, Field, Input, Switch, Button, Tabs, Spinner } from "../components/ui";
import { MediaPicker } from "../components/MediaPicker";
import { api, ApiError } from "../lib/api";
import { useToast } from "@/hooks/use-toast";

type Tab = "contact" | "seo" | "general";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("contact");
  const [values, setValues] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({ queryKey: ["admin", "settings"], queryFn: () => api.get<SiteSettings>("/api/admin/settings") });

  useEffect(() => {
    if (data && !values) setValues(data);
  }, [data, values]);

  if (isLoading || !values) return <Spinner />;

  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) => setValues((s) => (s ? { ...s, [k]: v } : s));
  const setContact = <K extends keyof SiteSettings["contact"]>(k: K, v: SiteSettings["contact"][K]) =>
    setValues((s) => (s ? { ...s, contact: { ...s.contact, [k]: v } } : s));
  const setSeo = <K extends keyof SiteSettings["seo"]>(k: K, v: SiteSettings["seo"][K]) => setValues((s) => (s ? { ...s, seo: { ...s.seo, [k]: v } } : s));

  const save = async () => {
    setSaving(true);
    try {
      const saved = await api.put<SiteSettings>("/api/admin/settings", values);
      setValues(saved);
      qc.invalidateQueries({ queryKey: ["admin", "settings"] });
      toast({ title: "Settings saved" });
    } catch (e) {
      toast({ title: "Couldn't save", description: e instanceof ApiError ? e.message : (e as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageTitle
        title="Settings"
        description="Contact details, SEO and site-wide options."
        actions={
          <Button variant="primary" loading={saving} onClick={save}>
            Save Settings
          </Button>
        }
      />

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "contact", label: "Contact & Social" },
          { value: "seo", label: "SEO" },
          { value: "general", label: "General" },
        ]}
      />

      <div className="mt-5">
        {tab === "contact" && (
          <Card title="Contact Details" description="Used across the site — footer, contact page, WhatsApp buttons.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Phone (digits only)" hint="Used for WhatsApp links, e.g. 7521824197">
                <Input value={values.contact.phoneDigits} onChange={(e) => setContact("phoneDigits", e.target.value)} />
              </Field>
              <Field label="Phone (display)" hint="Shown to visitors, can list multiple numbers">
                <Input value={values.contact.phoneDisplay} onChange={(e) => setContact("phoneDisplay", e.target.value)} />
              </Field>
              <Field label="Email">
                <Input type="email" value={values.contact.email} onChange={(e) => setContact("email", e.target.value)} />
              </Field>
              <Field label="Office Address">
                <Input value={values.contact.officeAddress} onChange={(e) => setContact("officeAddress", e.target.value)} />
              </Field>
              <Field label="Google Maps Link" className="sm:col-span-2">
                <Input value={values.contact.mapsUrl} onChange={(e) => setContact("mapsUrl", e.target.value)} />
              </Field>
              <Field label="Google Maps Embed URL" className="sm:col-span-2" hint="From Google Maps → Share → Embed a map">
                <Input value={values.contact.mapsEmbedUrl} onChange={(e) => setContact("mapsEmbedUrl", e.target.value)} />
              </Field>
              <Field label="Instagram">
                <Input value={values.contact.instagram} onChange={(e) => setContact("instagram", e.target.value)} />
              </Field>
              <Field label="Facebook">
                <Input value={values.contact.facebook} onChange={(e) => setContact("facebook", e.target.value)} />
              </Field>
              <Field label="X (Twitter)">
                <Input value={values.contact.x} onChange={(e) => setContact("x", e.target.value)} />
              </Field>
              <Field label="YouTube">
                <Input value={values.contact.youtube} onChange={(e) => setContact("youtube", e.target.value)} />
              </Field>
            </div>
          </Card>
        )}

        {tab === "seo" && (
          <Card title="Search Engine (SEO)" description="How your site appears on Google and when shared.">
            <div className="grid gap-4">
              <Field label="Site Name">
                <Input value={values.seo.siteName} onChange={(e) => setSeo("siteName", e.target.value)} />
              </Field>
              <Field label="Default Page Title">
                <Input value={values.seo.defaultTitle} onChange={(e) => setSeo("defaultTitle", e.target.value)} />
              </Field>
              <Field label="Default Description">
                <Input value={values.seo.defaultDescription} onChange={(e) => setSeo("defaultDescription", e.target.value)} />
              </Field>
              <Field label="Social Share Image" hint="Shown when the site is shared on WhatsApp, Facebook, etc.">
                <MediaPicker value={values.seo.ogImage} onChange={(url) => setSeo("ogImage", url)} kind="image" />
              </Field>
            </div>
          </Card>
        )}

        {tab === "general" && (
          <Card title="General" description="Homepage hero text and featured counts. For full homepage editing, use the Home Page section.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Hero Tag" hint='Small label above the title, e.g. "Explore India"'>
                <Input value={values.heroTag} onChange={(e) => set("heroTag", e.target.value)} />
              </Field>
              <Field label="Hero Title">
                <Input value={values.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} />
              </Field>
              <Field label="Hero Highlight Word">
                <Input value={values.heroHighlight} onChange={(e) => set("heroHighlight", e.target.value)} />
              </Field>
              <Field label="Hero Subtitle" className="sm:col-span-2">
                <Input value={values.heroSubtitle} onChange={(e) => set("heroSubtitle", e.target.value)} />
              </Field>
              <Field label="Primary Button Text">
                <Input value={values.heroPrimaryCta} onChange={(e) => set("heroPrimaryCta", e.target.value)} />
              </Field>
              <Field label="Secondary Button Text">
                <Input value={values.heroSecondaryCta} onChange={(e) => set("heroSecondaryCta", e.target.value)} />
              </Field>
              <Field label="Featured Destinations Count">
                <Input type="number" min={0} value={values.featuredDestinationCount} onChange={(e) => set("featuredDestinationCount", Number(e.target.value))} />
              </Field>
              <Field label="Featured Packages Count">
                <Input type="number" min={0} value={values.featuredPackageCount} onChange={(e) => set("featuredPackageCount", Number(e.target.value))} />
              </Field>
              <div className="sm:col-span-2">
                <Switch checked={values.showTrustBar} onChange={(v) => set("showTrustBar", v)} label="Show Trust Bar" description="Small stats strip under the hero" />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
