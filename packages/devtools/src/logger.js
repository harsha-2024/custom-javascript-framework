export function createLogger(prefix='Nebula'){
  return (store) => (next) => (action) => {
    console.groupCollapsed(`[${prefix}]`, action.type);
    console.log('prev', store.getState());
    const res = next(action);
    console.log('next', store.getState());
    console.groupEnd();
    return res;
  };
}
