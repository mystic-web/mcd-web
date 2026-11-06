// Hari Documentation API for Netlify (replaces server.js).
// Data lives in Netlify Blobs (free, built-in storage), so no database is needed.
import { getStore } from '@netlify/blobs';
import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import defaultData from '../default-data.json';

export const config = { path: '/api/*' };

const PASS = process.env.ADMIN_PASSWORD || 'admin123';
const SECRET = process.env.TOKEN_SECRET || 'hari-documentation|' + PASS;
const TOKEN_TTL = 12 * 60 * 60; // seconds

const store = () => getStore({ name: 'hari-documentation', consistency: 'strong' });
const read = async (key, fallback) => {
  try { const v = await store().get(key, { type: 'json' }); return v ?? fallback; } catch { return fallback; }
};
const write = (key, value) => store().setJSON(key, value);

const send = (code, obj) => new Response(JSON.stringify(obj), {
  status: code,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});

const sign = (exp) => createHmac('sha256', SECRET).update(String(exp)).digest('hex');
const makeToken = () => { const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL; return exp + '.' + sign(exp); };
const same = (a, b) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); };
const authed = (req) => {
  const t = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  const [exp, sig] = t.split('.');
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now() / 1000) return false;
  return same(sig, sign(exp));
};

// per-IP rate limit (stored in Blobs because serverless instances don't share memory)
const hitsKey = (kind, ip) => `rl-${kind}-${String(ip).replace(/[^a-zA-Z0-9.:_-]/g, '_')}`;
const recent = async (kind, ip, windowMs) => {
  const now = Date.now();
  return (await read(hitsKey(kind, ip), [])).filter((t) => now - t < windowMs);
};
const addHit = async (kind, ip, windowMs) => {
  const list = await recent(kind, ip, windowMs);
  list.push(Date.now());
  await write(hitsKey(kind, ip), list);
};

const readBody = async (req) => {
  const text = await req.text();
  if (text.length > 200000) throw new Error('too big');
  return JSON.parse(text || '{}');
};

export default async (req, context) => {
  try {
    const path = new URL(req.url).pathname.replace(/\/+$/, '');
    const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || 'unknown';

    if (path === '/api/data' && req.method === 'GET') return send(200, await read('data', defaultData));

    if (path === '/api/enquiry' && req.method === 'POST') {
      if ((await recent('enq', ip, 600000)).length >= 5) return send(429, { error: 'Too many enquiries. Please call us.' });
      const b = await readBody(req);
      const name = String(b.name || '').trim().slice(0, 80);
      const mobile = String(b.mobile || '').replace(/\D/g, '').slice(-10);
      if (!name || !/^[6-9]\d{9}$/.test(mobile)) return send(400, { error: 'Invalid name or mobile' });
      await addHit('enq', ip, 600000);
      const list = await read('enquiries', []);
      list.unshift({
        id: randomUUID(), time: new Date().toISOString(), name, mobile,
        service: String(b.service || '').slice(0, 120), message: String(b.message || '').slice(0, 500),
      });
      await write('enquiries', list.slice(0, 1000));
      return send(200, { ok: true });
    }

    if (path === '/api/login' && req.method === 'POST') {
      if ((await recent('login', ip, 900000)).length >= 8) return send(429, { error: 'Too many attempts. Try later.' });
      const b = await readBody(req);
      if (same(String(b.password || ''), PASS)) return send(200, { token: makeToken() });
      await addHit('login', ip, 900000);
      return send(401, { error: 'Wrong password' });
    }

    if (path === '/api/data' && req.method === 'PUT') {
      if (!authed(req)) return send(401, { error: 'Login required' });
      const b = await readBody(req);
      if (!b.site || !Array.isArray(b.services)) return send(400, { error: 'Bad data' });
      await write('data', b);
      return send(200, { ok: true });
    }

    if (path === '/api/enquiries' && req.method === 'GET') {
      if (!authed(req)) return send(401, { error: 'Login required' });
      return send(200, await read('enquiries', []));
    }

    return send(404, { error: 'Not found' });
  } catch (e) {
    return send(400, { error: 'Bad request' });
  }
};
