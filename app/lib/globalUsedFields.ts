// Global list of CMS field keys that are consumed outside section components
// Add keys here to prevent them from being auto-rendered as leftovers in sections
export const GLOBAL_USED_FIELDS = [
  "promo",
  "Promo",
  "PROMO",
  "promoText",
  "promo_text",
  // navbar / layout keys
  "top_promo",
  "header_promo",
];

export function isGloballyUsed(key: string) {
  if (!key) return false;
  const k = String(key).toLowerCase();
  return GLOBAL_USED_FIELDS.some((g) => String(g).toLowerCase() === k);
}
