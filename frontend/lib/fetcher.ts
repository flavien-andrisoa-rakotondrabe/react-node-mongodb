type FetchJsonOptions = Omit<RequestInit, 'headers'> & {
  headers?: HeadersInit;
};

export async function fetchJson<T>(
  input: RequestInfo | URL,
  init: FetchJsonOptions = {},
): Promise<T> {
  const { method = 'GET', headers, body, ...rest } = init;

  const defaultHeaders: Record<string, string> = {};

  if (body && !(body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const res = await fetch(input, {
    credentials: 'include',
    method,
    body,
    ...rest,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });

  if (res.status === 204) {
    return null as T;
  }

  let data: any = null;
  try {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    }
  } catch (err) {
    console.error('Erreur lors du parsing JSON :', err);
  }

  if (!res.ok) {
    const error = new Error(
      data?.error ?? data?.message ?? `HTTP ${res.status}`,
    ) as Error & {
      status?: number;
      details?: unknown;
    };

    error.status = res.status;
    error.details = data?.details;

    throw error;
  }

  return data as T;
}
