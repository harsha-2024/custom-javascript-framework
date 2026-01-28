export const isFn = (v) => typeof v === 'function';
export const isObj = (v) => v !== null && typeof v === 'object';
export const shallowEq = (a,b) => {
  if (a === b) return true;
  if (!isObj(a) || !isObj(b)) return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (let k of ka) if (a[k] !== b[k]) return false; return true;
};
export const assign = Object.assign;
export const nextTick = (fn) => Promise.resolve().then(fn);
export const warn = (...args) => console.warn('[Nebula]', ...args);
export const assert = (cond, msg) => { if(!cond) throw new Error('[Nebula] ' + (msg||'assert failed')); };
