import { h } from '../../dom/src/h.js';

export function routes(pairs){ return pairs; }

export function Router(routePairs){
  const match = () => {
    const hash = location.hash || '#/' ;
    for(const [path, comp] of routePairs){ if(path === hash) return comp; }
    return () => h('div', null, 'Not found');
  };
  const View = () => {
    let Comp = match();
    const rerender = () => { Comp = match(); root.replaceWith(render()); };
    window.addEventListener('hashchange', rerender);
    const render = () => h('div', { role:'region' }, [ (typeof Comp === 'function' ? Comp() : Comp) ]);
    const root = render();
    return root;
  };
  return View;
}

export function Link(props, label){
  return h('a', { href: props.to }, label || props.children || 'link');
}
