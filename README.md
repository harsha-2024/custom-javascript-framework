# NebulaJS

A **modular, batteries‑included JavaScript framework** designed for large‑scale apps. Ships as ESM modules (packages/*) and a prebuilt `dist/nebula.min.js` (IIFE) with:

- **Reactivity** (signals/effects/computed)
- **Virtual DOM renderer** (hyperscript + diff/patch)
- **Component model** (hooks & lifecycle)
- **Router** (hash/history)
- **Store** (Redux‑style with middleware + createSlice helper)
- **HTTP client** (interceptors + retry + simple cache)
- **Devtools logger**

Use the prebuilt bundle or import packages selectively.

## Quick start
```html
<script src="./dist/nebula.min.js"></script>
<script>
  const { createApp, h, createSignal, Router, routes, Link } = window.Nebula;
  const Counter = () => {
    const [count,set] = createSignal(0);
    return () => h('div', { class: 'stack' },[
      h('h1', null, 'Counter: ' + count()),
      h('button', { onclick: () => set(count()+1) }, 'Increment')
    ]);
  };
  const App = () => () => h('div', null,[
    h('nav', null,[Link({to:'#/'},'Home'),' | ',Link({to:'#/counter'},'Counter')]),
    Router(routes([
      ['#/', () => h('h2', null,'Home')],
      ['#/counter', Counter]
    ]))
  ]);
  createApp(App).mount('#app');
</script>
<div id="app"></div>
```

See `examples/spa/` for a bigger demo (router + store + http).
