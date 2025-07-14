# 深海数字生物模拟器

一个沉浸式的深海数字生物模拟器，包含AI对话功能。

## 🚀 快速开始

### 1. 启动服务器
```bash
# 使用Python
python -m http.server 8000

# 或使用npm
npm run dev
```

### 2. 访问应用
打开浏览器访问：http://localhost:8000

## 🤖 AI功能设置

### 获取Google AI API密钥

1. **访问Google AI Studio**
   - 前往 https://makersuite.google.com/app/apikey
   - 登录你的Google账户

2. **创建API密钥**
   - 点击"Create API Key"
   - 复制生成的API密钥

3. **配置API密钥**
   - 打开 `config.js` 文件
   - 将 `YOUR_GEMINI_API_KEY_HERE` 替换为你的实际API密钥

```javascript
const CONFIG = {
    GEMINI_API_KEY: '你的实际API密钥', // 替换这里
    // ... 其他配置
};
```

### API使用限制

- **免费额度**：每月15次免费调用
- **付费计划**：$0.50 per 1M characters
- **速率限制**：每分钟60次请求

## 🎮 功能特性

### 沉浸式体验
- 全屏深海模拟
- 动态数字生物
- 背景音乐播放
- 录制视频和截图

### AI对话功能
- 深海哲学对话
- 诗意回应
- 实时AI反馈
- 优雅的UI设计

### 使用方法
1. 点击录制按钮进入沉浸模式
2. 在底部文本框中输入问题
3. 点击"发送"或按回车键
4. 查看AI的深海哲学回应

## 🔧 技术栈

- **前端**：HTML5, CSS3, JavaScript
- **图形库**：p5.js
- **AI服务**：Google Gemini 2.5 Flash
- **视频处理**：ffmpeg.wasm
- **音频**：Web Audio API

## 📁 项目结构

```
├── index.html                 # 主应用文件
├── config.js                  # API配置文件
├── bgm/                       # 背景音乐文件夹
│   └── 深海音频.MP3
├── package.json              # npm配置
└── README.md                # 项目说明
```

## 🛠️ 故障排除

### 常见问题

1. **API密钥错误**
   - 确保在 `config.js` 中正确设置了API密钥
   - 检查API密钥是否有效

2. **CORS错误**
   - 确保通过HTTP服务器访问，而不是直接打开HTML文件

3. **音频无法播放**
   - 确保浏览器允许自动播放
   - 检查音频文件路径是否正确

4. **录制功能不工作**
   - 确保使用HTTPS或localhost
   - 检查浏览器权限设置

## 📝 开发说明

### 自定义AI提示词
在 `index.html` 中找到 `callAIAPI` 函数，可以修改提示词来改变AI的回应风格。

### 添加新的AI模型
在 `config.js` 中可以轻松切换不同的AI模型：

```javascript
const CONFIG = {
    GEMINI_MODEL: 'gemini-1.5-flash', // 或其他模型
    // ...
};
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

享受你的深海之旅！🌊 

---

## 1. 代理服务未启动或端口不对
- 请确认你的 `server.js` 代理服务**已经在本地 3001 端口启动**，终端有“DeepSeek 代理服务已启动，端口: 3001”字样。

## 2. 前端和代理端口不在同一主机
- 你的前端页面必须在**同一台电脑**上通过 `localhost` 访问，不能用手机或其他设备访问 `localhost:3001`。

## 3. 端口被防火墙或安全软件拦截
- 检查 Windows 防火墙或安全软件是否拦截了 3001 端口。

## 4. 前端 fetch 地址拼写错误
- 你的 fetch 地址应为：
  ```
  http://localhost:3001/api/deepseek
  ```
  请确保没有多余的 `/` 或拼写错误。

## 5. 代理服务代码有误
- 你贴出的 index.html 片段里，`callAIAPI` 里的 `url` 还是 `https://api.deepseek.com`，**应为** `http://localhost:3001/api/deepseek`。

---

## 检查方法

1. **在浏览器新标签页直接访问**  
   ```
   http://localhost:3001/api/deepseek
   ```
   - 如果显示“Cannot GET /api/deepseek”或类似提示，说明代理服务已启动。
   - 如果显示无法连接，说明代理没启动或端口被占用。

2. **确认前端 fetch 地址**
   - 必须是 `http://localhost:3001/api/deepseek`。

3. **确认代理服务终端无报错**
   - 如果有报错，请贴出来。

---

## 解决方案

- **确保 server.js 代理服务已启动且无报错。**
- **确保前端 fetch 地址为 `http://localhost:3001/api/deepseek`。**
- **确保前端页面和代理服务在同一台电脑上运行。**
- **如仍有问题，请贴出前端 fetch 相关代码和浏览器控制台的详细报错信息。**

---

如需进一步排查，请：
- 贴出你前端 fetch 代码片段
- 贴出 server.js 终端输出
- 说明你网页访问的端口和方式

我会帮你精准定位问题！ 

---

## 你的访问流程应该是：

1. **浏览器访问你的网页**  
   ```
   http://localhost:8000
   ```
   （或终端输出的实际端口）

2. **网页中的 JS 代码通过 fetch 请求代理 API**  
   ```js
   fetch('http://localhost:3001/api/deepseek', { ... })
   ```
   由本地 Node.js 代理服务转发到 DeepSeek 官方 API。

---

## 只要满足以下条件就能正常用：

- 你的 server.js 代理服务已启动（终端有“DeepSeek 代理服务已启动，端口: 3001”）。
- 你的前端页面在本机 8000 端口（或其它端口）访问。
- 前端 fetch 地址为 `http://localhost:3001/api/deepseek`。
- 前端和代理服务都在同一台电脑上。

---

如还有问题，请贴出你的 fetch 代码和控制台报错，我帮你继续排查！ 