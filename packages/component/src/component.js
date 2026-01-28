import { isFn } from '../../core/src/utils.js';
import { h } from '../../dom/src/h.js';
import { mount as _mount } from '../../dom/src/render.js';

export function createApp(Root){
  let _rootEl = null;
  return {
    mount(sel){
      const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
      if(!el) throw new Error('mount target not found');
      const tree = isFn(Root) ? Root() : Root;
      _rootEl = _mount(tree, el);
      return this;
    }
  };
}

export { h };
