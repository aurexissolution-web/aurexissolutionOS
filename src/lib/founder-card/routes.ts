export function isFounderCardRoute(pathname: string | null): boolean {
  return pathname === "/sanjay" || pathname?.startsWith("/sanjay/") === true;
}
