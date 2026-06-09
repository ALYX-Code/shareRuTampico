import { shareConfig } from './config';

export type ShareKind = 'home' | 'route' | 'trip' | 'invalid';

export type ShareTarget = {
  kind: ShareKind;
  path: string;
  label: string;
  routeId?: string;
  search: URLSearchParams;
  isValid: boolean;
};

const tripRequiredParams = ['originLat', 'originLng', 'destinationLat', 'destinationLng'];

export function getShareTarget(location: Location): ShareTarget {
  const path = normalizePath(location.pathname);
  const search = new URLSearchParams(location.search);
  const routeMatch = path.match(/^\/route\/([^/]+)$/);

  if (path === '/') {
    return {
      kind: 'home',
      path,
      label: 'RuTampico Share',
      search,
      isValid: true,
    };
  }

  if (routeMatch) {
    const routeId = decodeURIComponent(routeMatch[1]);

    return {
      kind: routeId.trim() ? 'route' : 'invalid',
      path,
      label: routeId.trim() ? `Ruta ${routeId}` : 'Ruta no valida',
      routeId,
      search,
      isValid: Boolean(routeId.trim()),
    };
  }

  if (path === '/share') {
    const isValidTrip = tripRequiredParams.every((param) => isFiniteCoordinate(search.get(param)));

    return {
      kind: isValidTrip ? 'trip' : 'invalid',
      path,
      label: isValidTrip ? 'Ruta compartida' : 'Enlace incompleto',
      search,
      isValid: isValidTrip,
    };
  }

  return {
    kind: 'invalid',
    path,
    label: 'Enlace no disponible',
    search,
    isValid: false,
  };
}

export function buildAppDeepLink(target: ShareTarget) {
  const query = target.search.toString();

  if (target.kind === 'home') {
    return `${shareConfig.appScheme}://`;
  }

  if (target.kind === 'route' && target.routeId) {
    return withQuery(`${shareConfig.appScheme}://route/${encodeURIComponent(target.routeId)}`, query);
  }

  if (target.kind === 'trip') {
    return withQuery(`${shareConfig.appScheme}://share`, query);
  }

  return `${shareConfig.appScheme}://`;
}

export function buildWebFallbackUrl(target: ShareTarget) {
  const query = target.search.toString();

  if (target.kind === 'home') {
    return shareConfig.webBaseUrl;
  }

  if (target.kind === 'route' && target.routeId) {
    return withQuery(`${shareConfig.webBaseUrl}/route/${encodeURIComponent(target.routeId)}`, query);
  }

  if (target.kind === 'trip') {
    return withQuery(`${shareConfig.webBaseUrl}/share`, query);
  }

  return shareConfig.webBaseUrl;
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function withQuery(url: string, query: string) {
  return query ? `${url}?${query}` : url;
}

function isFiniteCoordinate(value: string | null) {
  return value !== null && Number.isFinite(Number(value));
}
