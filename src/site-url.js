const base = import.meta.env.BASE_URL;

export function siteUrl(path = '') {
  return base + path.replace(/^\//, '');
}

export function readSiteRoute(pathname = window.location.pathname) {
  const route = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return route.replace(/^\/+|\/+$/g, '').toLowerCase();
}
