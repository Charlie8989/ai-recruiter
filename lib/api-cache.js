export const PRIVATE_CACHE_HEADERS = {
  "Cache-Control": "private, max-age=60, stale-while-revalidate=300",
};

export function privateJson(data, init = {}) {
  return Response.json(data, {
    ...init,
    headers: {
      ...PRIVATE_CACHE_HEADERS,
      ...init.headers,
    },
  });
}
