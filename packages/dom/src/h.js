export function h(type, props, children){
  return { type, props: props || null, children: normalize(children) };
}
function normalize(c){
  if (Array.isArray(c)) return c.flat().map(normalize).flat();
  if (c === null || c === undefined || c === false) return [];
  return [c];
}
