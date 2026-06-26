import miasta from "./miasta.json";

export function getMiasta() {
  return miasta;
}

export function findMiasto(slug) {
  return miasta.find((m) => m.slug === slug);
}

export function getMiastaByWoj(wojSlug) {
  return miasta.filter((m) => m.wojewodztwo === wojSlug);
}
