export interface ErrorObject {
  code: string;
  description: string;
}

export class ApiError extends Error {
  errors: ErrorObject[];

  constructor(errors: ErrorObject[]) {
    super("Validation errors from API");
    this.name = "ApiError";
    this.errors = errors;
  }
}


export async function fetchClientAPI<T>(url: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const defaultHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  const headers = new Headers({
    ...defaultHeaders,
    ...options.headers,
  });

  const response = await fetch(url, {
    headers,
    ...options,
    credentials: "include",
  });

  if (!response.ok) {
    let errorBody: unknown;
    try {
      errorBody = await response.json(); // parse etmeye çalış
    } catch {
      console.log("1")
      throw new ApiError([
        { code: "ParseError", description: "API response could not be parsed." },
      ]);
    }

    if (Array.isArray(errorBody)) {
      throw new ApiError(errorBody as ErrorObject[]);
    }

    throw new ApiError([
      { code: "Unknown", description: "An error occurred while processing your request." },
    ]);
  }

  return response.json();
}
