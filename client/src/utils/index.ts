interface FetchFromApiOpts {
  method: string;
  body: Record<string, unknown> | null;
}
export async function fetchFromAPI(
  endpointURL: string,
  opts: FetchFromApiOpts
) {
  const { method, body } = opts;

  const res = await fetch(`${import.meta.env.VITE_API_URL}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
