export type SiteContent = unknown;

type FetchOk = { ok: true; data: SiteContent };
type FetchFail = { ok: false; error: string };

export async function fetchSiteContent(): Promise<FetchOk | FetchFail> {
  try {
    const res = await fetch("/api/content", { cache: "no-store" });
    const json: unknown = await res.json();

    if (
      typeof json === "object" &&
      json !== null &&
      "ok" in json &&
      (json as { ok?: unknown }).ok === true &&
      "data" in json
    ) {
      return { ok: true, data: (json as { data: SiteContent }).data };
    }

    if (typeof json === "object" && json !== null && "error" in json) {
      return { ok: false, error: String((json as { error?: unknown }).error) };
    }

    return { ok: false, error: "Failed" };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Fetch failed";
    return { ok: false, error: message };
  }
}


