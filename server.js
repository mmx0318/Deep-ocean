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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Kimi 代理服务已启动，端口: ${PORT}`);
});

