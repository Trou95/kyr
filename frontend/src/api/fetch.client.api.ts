export async function fetchClientAPI<T>(url: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const defaultHeaders = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  };

  const headers = new Headers({
    ...defaultHeaders,
    ...options.headers,
  });

  const response = await fetch(url, {
    headers,
    ...options,
    credentials: 'include',
  });

  if (!response.ok) {
    const body = (await response.json())[0];
    console.log(body);
    const message = body?.description || 'An error occurred while processing your request.';
    return onFetchError(message);
  }

  return response.json();
}

function onFetchError(response: Response): never {
  throw new Error(`Error: ${response}`);
}
