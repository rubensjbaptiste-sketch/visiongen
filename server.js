const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const KEY = process.env.WAVESPEED_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', function(req, res) {
  res.json({ status: 'ok', hasKey: !!KEY });
});

app.post('/api/generate', async function(req, res) {
  const prompt = req.body.prompt;
  const model = req.body.model ||'wavespeed-ai/wan-2.1-t2v-480p'
  const duration = req.body.duration || 5;
  const ratio = req.body.ratio || '16:9';

  if (!prompt) return res.status(400).json({ error: 'Prompt required' });
  if (!KEY) return res.status(500).json({ error: 'No API key configured' });

  const url = 'https://api.wavespeed.ai/api/v3/' + model;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + KEY
      },
      body: JSON.stringify({
        prompt: prompt,
        duration: duration,
        ratio: ratio,
        enable_safety_checker: true
      })
    });
    const d = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: d.message || 'API error' });
    res.json({ requestId: d.data ? d.data.id : null });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/status/:id', async function(req, res) {
  if (!KEY) return res.status(500).json({ error: 'No API key' });
  try {
    const r = await fetch('https://api.wavespeed.ai/api/v3/predictions/' + req.params.id + '/result', {
      headers: { 'Authorization': 'Bearer ' + KEY }
    });
    const d = await r.json();
    const outputs = d.data && d.data.outputs;
    res.json({
      status: d.data ? d.data.status : null,
      url: outputs && outputs.length > 0 ? outputs[0] : null
    });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, function() {
  console.log('VisionGen running on port ' + PORT);
});
