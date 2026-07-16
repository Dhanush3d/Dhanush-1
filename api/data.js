import { kv } from '@vercel/kv';

const KEY = 'move-tracker-data';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await kv.get(KEY);
      return res.status(200).json({ data: data || null });
    }

    if (req.method === 'POST') {
      // Vercel parses the JSON body for you automatically
      const body = req.body;
      await kv.set(KEY, body);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error('KV error:', err);
    return res.status(500).json({ error: 'Storage error', message: err.message });
  }
}
