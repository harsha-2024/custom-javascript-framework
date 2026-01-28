export function createStore(reducer, preloaded, enhancer){
  if (enhancer) return enhancer(createStore)(reducer, preloaded);
  let state = preloaded, subs = [];
  const getState = () => state;
  const subscribe = (fn) => { subs.push(fn); return () => { const i=subs.indexOf(fn); if(i>-1) subs.splice(i,1); } };
  const dispatch = (action) => { state = reducer(state, action); subs.slice().forEach(s=>s()); return action; };
  dispatch({ type: '@@nebula/INIT' });
  return { getState, subscribe, dispatch };
}
export const combineReducers = (spec) => (state={}, action) => {
  const next = {}; for(const k in spec){ next[k] = spec[k](state[k], action); } return next;
};
export const applyMiddleware = (...mws) => (createStoreFn) => (reducer, preloaded) => {
  const store = createStoreFn(reducer, preloaded);
  let dispatch = store.dispatch;
  const api = { getState: store.getState, dispatch: (a)=>dispatch(a) };
  const chain = mws.map(mw => mw(api));
  dispatch = chain.reduceRight((a,b)=>b(a), dispatch);
  return { ...store, dispatch };
};
export function createSlice({ name, initialState, reducers }){
  const types = Object.fromEntries(Object.keys(reducers).map(k => [k, `${name}/${k}`]));
  const reducer = (state = initialState, action) => {
    for(const k in types){ if(action.type === types[k]) return reducers[k](state, action); }
    return state;
  };
  const actions = Object.fromEntries(Object.keys(reducers).map(k => [k, (payload)=>({ type: types[k], payload })]));
  return { reducer, actions, types };
}
