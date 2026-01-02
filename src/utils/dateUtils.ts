export function isExpired(expiryDate: string): boolean {
  const today = new Date();
  const expiry = new Date(expiryDate);
  return today > expiry;
}
