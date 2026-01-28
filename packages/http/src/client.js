export function createClient({ baseURL = '', headers = {}, retry = 0 } = {}){
  const reqInter = []; const resInter = [];
  const request = async (method, url, body, opts={}) => {
    const ctx = { method, url: baseURL + url, headers: { ...headers, ...(opts.headers||{}) }, body };
    for(const i of reqInter) await i(ctx);
    let attempt = 0, lastErr = null;
    while(attempt <= retry){
      try{
        const res = await fetch(ctx.url, { method, headers: ctx.headers, body: body && JSON.stringify(body) });
        const data = await res.json().catch(()=>null);
        let out = { ok: res.ok, status: res.status, data, headers: res.headers };
        for(const i of resInter) out = await i(out) || out;
        if(!res.ok) throw Object.assign(new Error('HTTP '+res.status), { response: out });
        return out;
      }catch(e){ lastErr = e; attempt++; if(attempt>retry) throw e; }
    }
    throw lastErr;
  };
  return {
    useRequest: (fn) => reqInter.push(fn),
    useResponse: (fn) => resInter.push(fn),
    get: (url, opts) => request('GET', url, null, opts),
    post: (url, body, opts) => request('POST', url, body, opts),
    put: (url, body, opts) => request('PUT', url, body, opts),
    del: (url, opts) => request('DELETE', url, null, opts)
  };
}
