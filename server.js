const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

// 更详细的 CORS 配置
app.use(cors({
  origin: ['https://localhost:3001', 'http://localhost:3001', 'http://localhost:8000','https://mmx0318.github.io'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 添加请求日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 你的 Kimi API Key
const API_KEY = 'sk-WeOtE2xqyuhIu5RvcxfGxHEKSCSvKbp1vSfsITgVYnr9Vy0s';

// Moonshot Kimi 代理
app.post('/api/kimi', async (req, res) => {
  console.log('收到 /api/kimi 请求');
  try {
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Moonshot API 错误:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Moonshot API 错误', 
        status: response.status,
        detail: errorText 
      });
    }
    
    const data = await response.json();
    console.log('Moonshot API 响应成功');
    res.status(response.status).json(data);
  } catch (err) {
    console.error('代理服务器异常:', err.message);
    res.status(500).json({ 
      error: '代理服务器异常', 
      detail: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
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
    const ttsRes = await fetch(ttsUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify(ttsBody)
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

// 静态文件服务
app.use(express.static('.'));

const PORT = 3001;

// 检查是否存在SSL证书
const sslDir = path.join(__dirname, 'ssl');
const certPath = path.join(sslDir, 'fullchain.pem');
const keyPath = path.join(sslDir, 'privkey.pem');

if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  // 使用HTTPS
  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };
  
  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS 服务器已启动，端口: ${PORT}`);
    console.log(`访问地址: https://localhost:${PORT}`);
  });
} else {
  // 使用HTTP（开发模式）
  app.listen(PORT, () => {
    console.log(`HTTP 服务器已启动，端口: ${PORT}`);
    console.log(`访问地址: http://localhost:${PORT}`);
    console.log('提示: 要启用HTTPS，请运行 npm run generate-cert');
  });
}

