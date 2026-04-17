const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const WAVESPEED_KEY = process.env.WAVESPEED_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/generate', async (req, res) => {
  const { prompt, model, duration, ratio } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });
  if (!WAVESPEED_KEY) return res.status(500).json({ error: 'No API key configured' });
  try {
    const endpoint = `https://api.wavespeed.ai/api/v3/${model ||'kwaivgi/kling-v3.0-std/text-to-video'
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${WAVESPEED_KEY}` },
      body: JSON.stringify({ prompt, duration: duration || 5, ratio: ratio || '16:9', enable_safety_checker: true })
    });
    const d = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: d.message || 'API error' });
    res.json({ requestId: d.data?.id });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/status/:id', async (req, res) => {
  if (!WAVESPEED_KEY) return res.status(500).json({ error: 'No API key' });
  try {
    const r = await fetch(`https://api.wavespeed.ai/api/v3/predictions/${req.params.id}/result`, {
      headers: { 'Authorization': `Bearer ${WAVESPEED_KEY}` }
    });
    const d = await r.json();
    res.json({ status: d.data?.status, url: d.data?.outputs?.[0] });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`VisionGen running on port ${PORT}`));
