export function getExpiryFromToken(token?: string) {
  try {
    if (token === undefined) throw new Error('Token is undefined');

    const decodedToken = atob(token);
    const parts = decodedToken.split('|');

    if (parts.length !== 3) throw new Error('Invalid token format');

    const expiryUnix = parseInt(parts[1], 10);

    if (isNaN(expiryUnix)) throw new Error('Failed to parse expiry time');

    return new Date(expiryUnix * 1000);
  } catch {
    return;
  }
}

export function isTokenExpired(token?: string) {
  if (!token) return true;

  const expiryDate = getExpiryFromToken(token);

  if (!expiryDate) return true;

  const now = new Date();

  return now > expiryDate;
}
