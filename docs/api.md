# NebulaJS API (Summary)

- Reactivity: `createSignal(initial)`, `computed(getter)`, `effect(fn)`
- VDOM: `h(type, props, children)`
- Component: `createApp(Root).mount(selector)`
- Router: `Router(routes([[path, Component], ...]))`, `Link({to:'#/path'}, 'label')`
- Store: `createStore(reducer, preloaded, enhancer)`, `combineReducers`, `applyMiddleware`, `createSlice({ name, initialState, reducers })`
- HTTP: `createClient({ baseURL, headers, retry })` with `get/post/put/del`, `useRequest`, `useResponse`
- Devtools: `createLogger(prefix)` middleware for store
