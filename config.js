// API配置文件
// 请将你的Google AI API密钥替换下面的值
const CONFIG = {
    GEMINI_API_KEY: 'sk-464f9ce100e947b09286018f2af10fce', // 请替换为你的实际API密钥
    
    // API配置
    GEMINI_BASE_URL: 'http://localhost:3001/api/deepseek',
    DEEPSEEK_MODEL: 'deepseek-chat',
    
    // 生成配置
    GENERATION_CONFIG: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 300,
    },
    
    // 安全设置
    SAFETY_SETTINGS: [
        {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
    ]
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 