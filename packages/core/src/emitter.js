export class Emitter {
  constructor(){ this._m = new Map(); }
  on(evt, cb){ const arr = this._m.get(evt) || []; arr.push(cb); this._m.set(evt, arr); return () => this.off(evt, cb); }
  off(evt, cb){ const arr = this._m.get(evt) || []; const i = arr.indexOf(cb); if(i>-1) arr.splice(i,1); this._m.set(evt, arr); }
  emit(evt, ...args){ const arr = this._m.get(evt) || []; arr.slice().forEach(cb => cb(...args)); }
}
