export function buildUrl(path: string, baseURL?: string): string {
   if (!baseURL) return path;
   return `${baseURL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export async function parseBody(response: Response): Promise<unknown> {
   const ct = response.headers.get("content-type") ?? "";
   if (ct.includes("application/json")) {
      try { return await response.json(); } catch { /* fall through */ }
   }
   if (ct.includes("text/")) {
      try { return await response.text(); } catch { /* fall through */ }
   }
   return null;
}

export function extractErrorMessage(data: unknown): string {
   if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      const msg = d.message ?? d.error ?? d.detail;
      if (typeof msg === "string") return msg;
   }
   return "Request failed";
}

export function anySignal(signals: AbortSignal[]): AbortSignal {
   const controller = new AbortController();
   for (const signal of signals) {
      if (signal.aborted) { controller.abort(); break; }
      signal.addEventListener("abort", () => controller.abort(), { once: true });
   }
   return controller.signal;
}