import { cookies } from 'next/headers';

export async function fetchServerAPI<T>(url: string, options: RequestInit = {}): Promise<T | null> {
  const token = cookies().get(process.env.NEXT_PUBLIC_TOKEN_KEY!)?.value;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Cookie: cookies().toString(),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const headers = new Headers({
    ...defaultHeaders,
    ...options.headers,
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}
