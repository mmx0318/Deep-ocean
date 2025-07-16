const CONFIG = {
    // 自动检测环境：本地开发用 localhost，部署后使用当前域名
    KIMI_BASE_URL: window.location.hostname === 'localhost' 
        ? 'https://localhost:3001/api/kimi'
        : window.location.origin + '/api/kimi',
    KIMI_MODEL: 'moonshot-v1-32k',
    GENERATION_CONFIG: {
        temperature: 0.8,
        max_tokens: 300,
    }
}; 