const express = require('express');
const fetch = require('node-fetch'); // node18+ 可用全局 fetch，可去掉此行
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 你的 DeepSeek API Key
const API_KEY = 'sk-eba670183004489583f9e6f9b25f9696';

// 代理 POST 请求
app.post('/api/deepseek', async (req, res) => {
  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
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
  console.log(`DeepSeek 代理服务已启动，端口: ${PORT}`);
});
app.post('/api/deepseek', async (req, res) => {
  console.log('收到前端请求');
  // ...其余代码
});
  console.log('收到前端请求');