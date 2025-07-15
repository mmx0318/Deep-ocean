const express = require('express');

const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 你的 Kimi API Key
const API_KEY = 'sk-WeOtE2xqyuhIu5RvcxfGxHEKSCSvKbp1vSfsITgVYnr9Vy0s';

// Moonshot Kimi 代理
app.post('/api/kimi', async (req, res) => {
  try {
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: '代理服务器异常', detail: err.message });
  }
});

const ELEVENLABS_API_KEY = 'sk_f2320aa774f9a69dc77143a2a8937049f451dd5fb3ea3ffc';
const ELEVENLABS_VOICE_ID = 'mLrASsA8si1Kay81Fm4H';

app.post('/api/tts', async (req, res) => {
  const { text } = req.body;
  const ttsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}?output_format=mp3_44100_128`;
  const ttsBody = {
    text,
    model_id: "eleven_multilingual_v2"
  };
  try {
    const ttsRes = await fetch('http://localhost:3001/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: aiReply })
    });
    if (!ttsRes.ok) {
      const err = await ttsRes.text();
      return res.status(500).send(err);
    }
    res.set('Content-Type', 'audio/mpeg');
    ttsRes.body.pipe(res);
  } catch (err) {
    res.status(500).send('TTS Error: ' + err.message);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Kimi 代理服务已启动，端口: ${PORT}`);
});

