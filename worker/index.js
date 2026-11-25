const EVENTS = [
  'visit', 'lang_en', 'lang_es',
  'view_fit', 'view_cologuard', 'view_colonoscopy',
  'click_phone', 'download_brochure', 'download_instructions',
];
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const day = (offset = 0) => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    if (url.pathname === '/event' && request.method === 'POST') {
      const event = (await request.text()).trim();
      if (!EVENTS.includes(event)) return new Response('bad event', { status: 400, headers: CORS });
      for (const key of [`total:${event}`, `day:${day()}:${event}`]) {
        const n = parseInt((await env.STATS.get(key)) ?? '0', 10);
        await env.STATS.put(key, String(n + 1));
      }
      return new Response('ok', { headers: CORS });
    }

    if (url.pathname === '/stats' && request.method === 'GET') {
      const totals = {};
      for (const e of EVENTS) totals[e] = parseInt((await env.STATS.get(`total:${e}`)) ?? '0', 10);
      const days = [];
      for (let i = 13; i >= 0; i--) {
        const d = day(i);
        days.push({ date: d, visits: parseInt((await env.STATS.get(`day:${d}:visit`)) ?? '0', 10) });
      }
      return Response.json({ totals, days }, { headers: CORS });
    }

    return new Response('not found', { status: 404, headers: CORS });
  },
};
