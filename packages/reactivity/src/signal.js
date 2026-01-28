let currentEffect = null;
const depsMap = new WeakMap(); // target -> key -> Set(effects)

export function effect(fn){
  const wrapped = () => { try{ currentEffect = wrapped; return fn(); } finally { currentEffect = null; } };
  wrapped();
  return () => {/* noop disposer for basic impl */};
}

function track(target, key){
  if(!currentEffect) return;
  let depForTarget = depsMap.get(target); if(!depForTarget){ depForTarget = new Map(); depsMap.set(target, depForTarget); }
  let dep = depForTarget.get(key); if(!dep){ dep = new Set(); depForTarget.set(key, dep); }
  dep.add(currentEffect);
}
function trigger(target, key){
  const depForTarget = depsMap.get(target); if(!depForTarget) return;
  const dep = depForTarget.get(key); if(!dep) return;
  dep.forEach(eff => eff());
}

export function createSignal(initial){
  const box = { v: initial };
  const read = () => { track(box,'v'); return box.v; };
  const write = (nv) => { box.v = nv; trigger(box,'v'); };
  return [read, write];
}

export function computed(getter){
  const [val,set] = createSignal(undefined);
  effect(() => set(getter()));
  return val;
}
