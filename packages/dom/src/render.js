import { isObj, isFn } from '../../core/src/utils.js';

export function mount(vnode, container){
  const node = createElm(vnode);
  container.innerHTML = '';
  container.appendChild(node);
  return node;
}

function setProps(el, props){
  if(!props) return;
  for(const k in props){
    const v = props[k];
    if(k === 'style' && isObj(v)) Object.assign(el.style, v);
    else if(k.startsWith('on') && isFn(v)) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if(k in el) el[k] = v; else el.setAttribute(k, v);
  }
}

function createElm(v){
  if (typeof v === 'string' || typeof v === 'number') return document.createTextNode(String(v));
  if (isFn(v)) return createElm(v()); // functional child
  const { type, props, children } = v;
  if (isFn(type)) return createElm(type(props));
  const el = document.createElement(type);
  setProps(el, props);
  (children||[]).forEach(c => el.appendChild(createElm(c)));
  return el;
}
