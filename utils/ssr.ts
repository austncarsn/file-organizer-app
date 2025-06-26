export const isServer = typeof window === 'undefined';

export function getServerSafeId(fallback: string = 'default'): string {
  if (isServer) {
    return fallback;
  }
  return Math.random().toString(36).substring(2, 9);
}

export function withSSRSafety<T>(
  serverValue: T,
  clientValue: T,
  isHydrated: boolean = true
): T {
  return isServer || !isHydrated ? serverValue : clientValue;
}
