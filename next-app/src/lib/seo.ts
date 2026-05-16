export const SITE_NAME = "Wanderly Trails";
export const SITE_URL = "https://www.wanderlytrails.com";

export const DEFAULT_IMAGE = `${SITE_URL}/opengraph.jpg`;
export const DEFAULT_DESCRIPTION =
  "Wanderly Trails is a trusted India tour and travel agency for domestic and international holiday packages, honeymoon tours, family trips, and custom itineraries.";
export const DEFAULT_KEYWORDS =
  "tour and travel agency in India, India tour packages, honeymoon packages, family trip packages, holiday packages, Wanderly Trails";

export function toAbsoluteUrl(path: string) {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

export function normalizePath(pathname: string) {
  const cleanPath = (pathname || "/").split(/[?#]/)[0] || "/";
  if (cleanPath === "/") return "/";
  return cleanPath.replace(/\/+$/, "") || "/";
}

