export function isBlogPath(pathname: string): boolean {
  return pathname === "/blog" || pathname.startsWith("/blog/");
}

export function goatCounterEndpoint(value: string | undefined): string | undefined {
  const endpoint = value?.trim();
  if (!endpoint) return undefined;

  try {
    const url = new URL(endpoint);
    if (url.protocol === "https:" && url.pathname === "/count" &&
        !url.username && !url.password && !url.search && !url.hash) {
      return url.href;
    }
  } catch {
    // Report a useful configuration error instead of shipping a broken tracker.
  }
  throw new Error("PUBLIC_GOATCOUNTER_URL must be an HTTPS counting endpoint, such as https://YOUR-CODE.goatcounter.com/count.");
}
