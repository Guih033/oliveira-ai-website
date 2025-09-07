export function parseAndPersistUTMs(days = 90) {
  const url = new URL(window.location.href);
  const utm = {
    source: url.searchParams.get("utm_source") || "",
    medium: url.searchParams.get("utm_medium") || "",
    campaign: url.searchParams.get("utm_campaign") || "",
    content: url.searchParams.get("utm_content") || "",
    gclid: url.searchParams.get("gclid") || ""
  };
  const hasAny = Object.values(utm).some(Boolean);
  const record = { utm, ts: Date.now(), exp: Date.now() + days * 24 * 60 * 60 * 1000 };
  if (hasAny) localStorage.setItem("oliveira_utms", JSON.stringify(record));
  const saved = localStorage.getItem("oliveira_utms");
  if (!saved) return utm;
  try {
    const parsed = JSON.parse(saved);
    if (parsed.exp && parsed.exp > Date.now()) return parsed.utm || utm;
    localStorage.removeItem("oliveira_utms");
    return utm;
  } catch {
    return utm;
  }
}

export function getContextMeta() {
  return {
    referrer: document.referrer || "",
    pagePath: window.location.pathname + window.location.search,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  };
}

export function pushGTMEvent(event, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
