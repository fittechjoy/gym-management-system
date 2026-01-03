export function isExpired(expiryDate: string): boolean {
  const today = new Date();
  const expiry = new Date(expiryDate);
  return today > expiry;
}
export function daysUntilExpiry(expiryDate: string): number {
  const today = new Date();
  const expiry = new Date(expiryDate);

  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
