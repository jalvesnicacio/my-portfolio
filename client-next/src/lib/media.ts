export function resolveMediaUrl(path: string) {
  const base =
    typeof window === "undefined"
      ? process.env.API_INTERNAL_URL
      : process.env.NEXT_PUBLIC_API_URL;

  return `${base}${path}`;
}
