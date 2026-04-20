// ═══════════════════════════════════════════════════
//  VisionGen Backend Server
//  Node.js + Express
//  Handles WaveSpeed AI video generation securely
// ═══════════════════════════════════════════════════

const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── MIDDLEWARE ──────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve your VisionGen HTML file as the frontend
app.use(express.static(path.join(__dirname, 'public')));

// ─── MODEL MAP ───────────────────────────────────────
// Maps your app's model IDs to WaveSpeed's actual API model strings
const MODEL_MAP = {
  'kling-std':  'kwaivgi/kling-v3.0-std/text-to-video',
  'kling-pro':  'kwaivgi/kling-v3.0-pro/text-to-video',
  'wan21':      'kwaivgi/kling-v3.0-std/text-to-video',
  'hailuo':     'kwaivgi/kling-v3.0-std/text-to-video',
  'seedance':   'kwaivgi/kling-v3.0-pro/text-to-video'
};

// ─── ROUTE: GENERATE VIDEO ───────────────────────────
// Frontend calls POST /api/generate with { prompt, model, duration, ratio }
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, model, duration, ratio } = req.body;

    // Validate prompt
    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Get API key from server environment (never from the browser)
    const apiKey = process.env.WAVESPEED_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'WaveSpeed API key not configured on server' });
    }

    // Pick the model — default to kling-std
    const modelId = MODEL_MAP[model] || MODEL_MAP['kling-std'];

    // Build the request to WaveSpeed
    const payload = {
      prompt:   prompt.trim(),
      duration: parseInt(duration) || 5,
      ratio:    ratio || '16:9',
      size:     ratio === '9:16' ? '720x1280' : ratio === '1:1' ? '720x720' : '1280x720'
    };

    console.log(`[VisionGen] Generating video — model: ${modelId}, prompt: "${prompt.substring(0, 60)}..."`);

    // Send to WaveSpeed API
  const response = await fetch(`https://api.wavespeed.ai/api/v2/${modelId}`
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[VisionGen] WaveSpeed error:', data);
      return res.status(response.status).json({
        error: data.message || data.error || 'WaveSpeed API error'
      });
    }

    // Return the request ID so frontend can poll for status
    const requestId = data.data?.id || data.id || data.request_id;
    if (!requestId) {
      return res.status(500).json({ error: 'No request ID returned from WaveSpeed' });
    }

    console.log(`[VisionGen] Job started — ID: ${requestId}`);
    res.json({ requestId });

  } catch (err) {
    console.error('[VisionGen] Server error:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ─── ROUTE: POLL STATUS ──────────────────────────────
// Frontend calls GET /api/status/:id to check if video is ready
app.get('/api/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apiKey = process.env.WAVESPEED_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Check status with WaveSpeed
    const response = await fetch(`https://api.wavespeed.ai/api/v3/predictions/${id}/result`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ status: 'failed', error: data.message });
    }

    const status = data.data?.status || data.status;
    const output = data.data?.outputs?.[0] || data.output || data.url;

    console.log(`[VisionGen] Poll — ID: ${id}, status: ${status}`);

    if (status === 'completed' && output) {
      return res.json({ status: 'completed', url: output });
    } else if (status === 'failed') {
      return res.json({ status: 'failed' });
    } else {
      // Still processing (queued, running, processing)
      return res.json({ status: 'processing' });
    }

  } catch (err) {
    console.error('[VisionGen] Poll error:', err.message);
    res.status(500).json({ status: 'failed', error: err.message });
  }
});

// ─── ROUTE: HEALTH CHECK ─────────────────────────────
// Render uses this to confirm the server is alive
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app:    'VisionGen',
    time:   new Date().toISOString(),
    key:    process.env.WAVESPEED_API_KEY ? 'configured' : 'missing'
  });
});

// ─── FALLBACK ────────────────────────────────────────
// Any other route serves the frontend HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── START ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════╗
  ║   VisionGen Server Running       ║
  ║   Port: ${PORT}                     ║
  ║   Key:  ${process.env.WAVESPEED_API_KEY ? '✓ Configured' : '✗ Missing'}          ║
  ╚══════════════════════════════════╝
  `);
});
