export function isValidPhoneNumber(phone: string): boolean {
  // Fjern mellomrom og bindestreker
  const cleaned = phone.replace(/[\s-]/g, '');

  // Regex som støtter:
  // - Norske numre: 8 siffer (eks. 12345678)
  // - Internasjonalt format: +47 eller 0047 etterfulgt av 8 siffer
  const norwegianPhoneRegex = /^(?:\+47|0047)?\d{8}$/;

  return norwegianPhoneRegex.test(cleaned);
}
