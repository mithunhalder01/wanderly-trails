import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Phone, Mail, MessageCircle, Trash2 } from "lucide-react";
import type { Lead, LeadStatus } from "@shared/types";
import { PageTitle, Card, Select, Badge, Button, Spinner, EmptyState, Tabs, ConfirmDialog } from "../components/ui";
import { api } from "../lib/api";
import { useToast } from "@/hooks/use-toast";

const STATUS_TONE: Record<LeadStatus, "info" | "warn" | "success" | "neutral"> = {
  new: "info",
  contacted: "warn",
  converted: "success",
  closed: "neutral",
};

const TYPE_LABEL = { booking: "Booking", contact: "Contact", newsletter: "Newsletter" } as const;

export default function EnquiriesPage() {
  const [type, setType] = useState<"" | "booking" | "contact" | "newsletter">("");
  const [status, setStatus] = useState<"" | LeadStatus>("");
  const [deleteRow, setDeleteRow] = useState<Lead | null>(null);
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "leads", type, status],
    queryFn: () => api.list<Lead>("leads", { type: type || undefined, status: status || undefined, limit: 100 }),
  });
  const items = data?.items ?? [];

  const updateStatus = async (lead: Lead, next: LeadStatus) => {
    try {
      await api.patch(`/api/admin/leads/${lead.id}`, { status: next });
      qc.invalidateQueries({ queryKey: ["admin", "leads"] });
      qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    } catch (e) {
      toast({ title: "Couldn't update", description: (e as Error).message, variant: "destructive" });
    }
  };

  const confirmDelete = async () => {
    if (!deleteRow) return;
    await api.del(`/api/admin/leads/${deleteRow.id}`);
    setDeleteRow(null);
    qc.invalidateQueries({ queryKey: ["admin", "leads"] });
    qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
  };

  return (
    <div>
      <PageTitle title="Enquiries" description="Booking requests, contact messages and newsletter sign-ups from your website." />

      <div className="flex flex-wrap gap-2 mb-4">
        <Tabs
          value={type}
          onChange={setType}
          tabs={[
            { value: "", label: "All" },
            { value: "booking", label: "Bookings" },
            { value: "contact", label: "Contact" },
            { value: "newsletter", label: "Newsletter" },
          ]}
        />
        <Select className="w-auto" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </Select>
      </div>

      {isLoading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <div className="a-card">
          <EmptyState title="No enquiries yet" description="Booking and contact form submissions from your website will show up here." />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((lead) => (
            <Card key={lead.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold">{lead.name || lead.email || "Anonymous"}</span>
                    <Badge tone="info">{TYPE_LABEL[lead.type]}</Badge>
                    <span className="text-xs" style={{ color: "var(--a-muted)" }}>
                      {new Date(lead.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px]" style={{ color: "var(--a-muted)" }}>
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:underline">
                        <Phone className="w-3.5 h-3.5" /> {lead.phone}
                      </a>
                    )}
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:underline">
                        <Mail className="w-3.5 h-3.5" /> {lead.email}
                      </a>
                    )}
                    {lead.destination && <span>📍 {lead.destination}</span>}
                    {lead.travelDate && <span>🗓 {lead.travelDate}</span>}
                    {lead.travelers > 0 && <span>👥 {lead.travelers} travelers</span>}
                  </div>
                  {lead.message && <p className="text-[13.5px] mt-2">{lead.message}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {lead.phone && (
                    <a href={`https://wa.me/91${lead.phone.replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noreferrer" className="a-btn a-btn-secondary a-btn-sm">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  )}
                  <Button size="icon" variant="ghost" onClick={() => setDeleteRow(lead)} aria-label="Delete">
                    <Trash2 className="w-4 h-4" style={{ color: "var(--a-danger)" }} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t" style={{ borderColor: "var(--a-border)" }}>
                <span className="text-xs font-semibold" style={{ color: "var(--a-muted)" }}>
                  Status:
                </span>
                {(["new", "contacted", "converted", "closed"] as LeadStatus[]).map((s) => (
                  <button key={s} type="button" onClick={() => updateStatus(lead, s)}>
                    <Badge tone={lead.status === s ? STATUS_TONE[s] : "neutral"}>{s}</Badge>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteRow}
        onClose={() => setDeleteRow(null)}
        onConfirm={confirmDelete}
        title="Delete enquiry?"
        message="This will permanently remove this enquiry."
      />
    </div>
  );
}
