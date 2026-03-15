import { 
   buildUrl, 
   parseBody, 
   extractErrorMessage, 
   anySignal
} from "../helpers/apiHelpers";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions extends Omit<RequestInit, "body" | "method"> {
   body?: unknown;
   baseURL?: string;
   method?: HttpMethod;
   timeout?: number;
}

export class ApiError extends Error {
   constructor(
      message: string,
      public readonly status: number,
      public readonly data: unknown = null,
      public readonly url: string = ""
   ) {
      super(message);
      this.name = "ApiError";
   }

   get isUnauthorized() { return this.status === 401; }
   get isForbidden() { return this.status === 403; }
   get isNotFound() { return this.status === 404; }
   get isServerError() { return this.status >= 500; }
}

export async function apiRequest<T = unknown>(
   path: string,
   options: ApiRequestOptions = {}
): Promise<T> {
   const { baseURL, body, headers, timeout = 30_000, method = "GET", ...rest } = options;

   const url = buildUrl(path, baseURL);
   const hasBody = body !== undefined;

   const controller = new AbortController();
   const timer = setTimeout(() => controller.abort(), timeout);

   // Merge signals if the caller already passed one
   const signal = rest.signal
      ? anySignal([rest.signal, controller.signal])
      : controller.signal;

   const finalHeaders: Record<string, string> = {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(headers as Record<string, string> | undefined),
   };

   let response: Response;

   try {
      response = await fetch(url, {
         ...rest,
         method,
         signal,
         headers: finalHeaders,
         body: hasBody ? JSON.stringify(body) : undefined,
      });
   } catch (err) {
      if ((err as Error).name === "AbortError") {
         throw new ApiError("Request timed out", 408, null, url);
      }
      throw err;
   } finally {
      clearTimeout(timer);
   }

   const data = await parseBody(response);

   if (!response.ok) {
      throw new ApiError(extractErrorMessage(data), response.status, data, url);
   }

   if (response.status === 204 || data === null) {
      return undefined as T;
   }

   return data as T;
}

type WithoutMethodAndBody = Omit<ApiRequestOptions, "method" | "body">;
type WithoutMethod = Omit<ApiRequestOptions, "method">;

export const api = {
   get<T = unknown>(path: string, options: WithoutMethod = {}) {
      return apiRequest<T>(path, { ...options, method: "GET" });
   },
   post<T = unknown>(path: string, body?: unknown, options: WithoutMethodAndBody = {}) {
      return apiRequest<T>(path, { ...options, method: "POST", body });
   },
   put<T = unknown>(path: string, body?: unknown, options: WithoutMethodAndBody = {}) {
      return apiRequest<T>(path, { ...options, method: "PUT", body });
   },
   patch<T = unknown>(path: string, body?: unknown, options: WithoutMethodAndBody = {}) {
      return apiRequest<T>(path, { ...options, method: "PATCH", body });
   },
   delete<T = unknown>(path: string, options: WithoutMethodAndBody = {}) {
      return apiRequest<T>(path, { ...options, method: "DELETE" });
   },
} as const;