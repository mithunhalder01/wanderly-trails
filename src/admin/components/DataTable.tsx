import { type ReactNode, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, Star, Pencil, Trash2 } from "lucide-react";
import { api, type ListResponse } from "../lib/api";
import { Button, Input, EmptyState, Spinner, Badge, ConfirmDialog } from "./ui";
import { useToast } from "@/hooks/use-toast";

export interface Column<T> {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface DataTableProps<T extends { id: number; published?: boolean; featured?: boolean }> {
  resource: string;
  label: string;
  columns: Column<T>[];
  searchable?: boolean;
  onCreate?: () => void;
  onEdit?: (row: T) => void;
  renderCard?: (row: T) => ReactNode;
  extraToolbar?: ReactNode;
  filters?: { key: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void };
}

/**
 * Ek generic list view: search, publish/feature toggle, edit, delete.
 * Har content type (destinations, packages, blog, ...) isi ko reuse karta hai
 * taaki behaviour hamesha ek jaisa rahe — non-tech user ko naya pattern seekhna na pade.
 */
export function DataTable<T extends { id: number; published?: boolean; featured?: boolean }>({
  resource,
  label,
  columns,
  searchable = true,
  onCreate,
  onEdit,
  renderCard,
  extraToolbar,
  filters,
}: DataTableProps<T>) {
  const [q, setQ] = useState("");
  const [deleteRow, setDeleteRow] = useState<T | null>(null);
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin", resource, q, filters?.value],
    queryFn: () => api.list<T>(resource, { q, published: filters?.value }),
    placeholderData: (prev) => prev,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", resource] });

  const togglePublished = async (row: T) => {
    try {
      await api.patch(`/api/admin/${resource}/${row.id}/toggle`, { field: "published" });
      invalidate();
    } catch (e) {
      toast({ title: "Couldn't update", description: (e as Error).message, variant: "destructive" });
    }
  };
  const toggleFeatured = async (row: T) => {
    try {
      await api.patch(`/api/admin/${resource}/${row.id}/toggle`, { field: "featured" });
      invalidate();
    } catch (e) {
      toast({ title: "Couldn't update", description: (e as Error).message, variant: "destructive" });
    }
  };
  const confirmDelete = async () => {
    if (!deleteRow) return;
    try {
      await api.del(`/api/admin/${resource}/${deleteRow.id}`);
      toast({ title: `${label} deleted` });
      setDeleteRow(null);
      invalidate();
    } catch (e) {
      toast({ title: "Couldn't delete", description: (e as Error).message, variant: "destructive" });
    }
  };

  const items = data?.items ?? [];
  const hasFeatured = items.some((i) => "featured" in i);
  const hasPublished = items.some((i) => "published" in i);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {searchable && (
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--a-muted)" }} />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${label.toLowerCase()}s...`} className="pl-9" />
          </div>
        )}
        {filters && (
          <select className="a-input w-auto" value={filters.value} onChange={(e) => filters.onChange(e.target.value)}>
            {filters.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )}
        {extraToolbar}
        <div className="flex-1" />
        {isFetching && !isLoading && <span className="a-spin" />}
        {onCreate && (
          <Button variant="primary" onClick={onCreate}>
            <Plus className="w-4 h-4" /> Add {label}
          </Button>
        )}
      </div>

      {isLoading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <div className="a-card">
          <EmptyState
            title={q ? "No results" : `No ${label.toLowerCase()}s yet`}
            description={q ? "Try a different search term." : `Click "Add ${label}" to create your first one.`}
            action={!q && onCreate ? <Button variant="primary" onClick={onCreate}><Plus className="w-4 h-4" /> Add {label}</Button> : undefined}
          />
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block a-card overflow-x-auto">
            <table className="a-table">
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c.header} className={c.className}>
                      {c.header}
                    </th>
                  ))}
                  {hasFeatured && <th>Featured</th>}
                  {hasPublished && <th>Status</th>}
                  <th style={{ width: 90 }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <tr key={row.id}>
                    {columns.map((c) => (
                      <td key={c.header} className={c.className}>
                        {c.cell(row)}
                      </td>
                    ))}
                    {hasFeatured && (
                      <td>
                        <button type="button" onClick={() => toggleFeatured(row)} aria-label="Toggle featured" className="p-1">
                          <Star className="w-4 h-4" fill={row.featured ? "#f59e0b" : "none"} stroke={row.featured ? "#f59e0b" : "#a8a29e"} />
                        </button>
                      </td>
                    )}
                    {hasPublished && (
                      <td>
                        <button type="button" onClick={() => togglePublished(row)}>
                          <Badge tone={row.published ? "success" : "neutral"}>{row.published ? "Published" : "Draft"}</Badge>
                        </button>
                      </td>
                    )}
                    <td>
                      <div className="flex items-center gap-1 justify-end">
                        {onEdit && (
                          <Button size="icon" variant="ghost" onClick={() => onEdit(row)} aria-label="Edit">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={() => setDeleteRow(row)} aria-label="Delete">
                          <Trash2 className="w-4 h-4" style={{ color: "var(--a-danger)" }} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-3">
            {items.map((row) =>
              renderCard ? (
                <div key={row.id} className="a-card p-4" onClick={() => onEdit?.(row)}>
                  {renderCard(row)}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t" style={{ borderColor: "var(--a-border)" }} onClick={(e) => e.stopPropagation()}>
                    {hasFeatured && (
                      <button type="button" onClick={() => toggleFeatured(row)} className="p-1">
                        <Star className="w-4 h-4" fill={row.featured ? "#f59e0b" : "none"} stroke={row.featured ? "#f59e0b" : "#a8a29e"} />
                      </button>
                    )}
                    {hasPublished && (
                      <button type="button" onClick={() => togglePublished(row)}>
                        <Badge tone={row.published ? "success" : "neutral"}>{row.published ? "Published" : "Draft"}</Badge>
                      </button>
                    )}
                    <div className="flex-1" />
                    {onEdit && (
                      <Button size="sm" variant="secondary" onClick={() => onEdit(row)}>
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" onClick={() => setDeleteRow(row)} aria-label="Delete">
                      <Trash2 className="w-4 h-4" style={{ color: "var(--a-danger)" }} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div key={row.id} className="a-card p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">{columns[0]?.cell(row)}</div>
                  <div className="flex items-center gap-1 shrink-0">
                    {onEdit && (
                      <Button size="icon" variant="ghost" onClick={() => onEdit(row)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" onClick={() => setDeleteRow(row)}>
                      <Trash2 className="w-4 h-4" style={{ color: "var(--a-danger)" }} />
                    </Button>
                  </div>
                </div>
              ),
            )}
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!deleteRow}
        onClose={() => setDeleteRow(null)}
        onConfirm={confirmDelete}
        title={`Delete ${label.toLowerCase()}?`}
        message="This can't be undone. It will disappear from the live website immediately."
      />
    </div>
  );
}

export type { ListResponse };
