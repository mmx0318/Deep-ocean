# 部署指南

## 本地开发（HTTPS）

### 1. 生成SSL证书
```bash
npm run generate-cert
```

### 2. 启动HTTPS服务器
```bash
npm run start:https
```

访问地址：`https://localhost:3001`

## 生产环境部署

### 方案一：直接使用Node.js（推荐）

1. **上传文件到服务器**
   ```bash
   # 上传项目文件到服务器
   scp -r . user@your-server:/path/to/project
   ```

2. **在服务器上安装依赖**
   ```bash
   cd /path/to/project
   npm install --production
   ```

3. **生成生产环境证书**
   ```bash
   npm run generate-cert
   ```

4. **启动服务**
   ```bash
   npm start
   ```

5. **配置防火墙**
   ```bash
   # 开放3001端口
   sudo ufw allow 3001
   ```

### 方案二：使用Nginx反向代理

1. **安装Nginx**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **配置Nginx**
   - 复制 `nginx.conf` 到 `/etc/nginx/sites-available/your-domain`
   - 修改配置文件中的域名和路径
   - 启用站点：
     ```bash
     sudo ln -s /etc/nginx/sites-available/your-domain /etc/nginx/sites-enabled/
     sudo nginx -t
     sudo systemctl reload nginx
     ```

3. **启动Node.js后端**
   ```bash
   npm start
   ```

4. **配置防火墙**
   ```bash
   sudo ufw allow 80
   sudo ufw allow 443
   ```

### 方案三：使用PM2管理进程

1. **安装PM2**
   ```bash
   npm install -g pm2
   ```

2. **创建PM2配置文件**
   ```bash
   # 创建 ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'digital-creatures',
       script: 'server.js',
       instances: 1,
       autorestart: true,
       watch: false,
       max_memory_restart: '1G',
       env: {
         NODE_ENV: 'production',
         PORT: 3001
       }
     }]
   };
   ```

3. **启动服务**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

## SSL证书配置

### 自签名证书（开发/测试）
- 已通过 `generate-cert.js` 自动生成
- 浏览器会显示安全警告，需要手动信任

### Let's Encrypt证书（生产环境）
1. **安装Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **获取证书**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **自动续期**
   ```bash
   sudo crontab -e
   # 添加：0 12 * * * /usr/bin/certbot renew --quiet
   ```

## 域名配置

1. **DNS设置**
   - 添加A记录：`your-domain.com` → 服务器IP
   - 添加A记录：`www.your-domain.com` → 服务器IP

2. **SSL证书路径**
   - Let's Encrypt: `/etc/letsencrypt/live/your-domain.com/`
   - 自签名: `./ssl/`

## 故障排除

### 1. 端口被占用
```bash
# 查看端口占用
sudo netstat -tlnp | grep :3001

# 杀死进程
sudo kill -9 <PID>
```

### 2. 权限问题
```bash
# 确保文件权限正确
sudo chown -R $USER:$USER /path/to/project
chmod 600 ssl/privkey.pem
chmod 644 ssl/fullchain.pem
```

### 3. 防火墙问题
```bash
# 检查防火墙状态
sudo ufw status

# 开放必要端口
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3001
```

### 4. 日志查看
```bash
# Node.js日志
pm2 logs digital-creatures

# Nginx日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 性能优化

1. **启用Gzip压缩**（已在nginx.conf中配置）
2. **静态文件缓存**（已在nginx.conf中配置）
3. **CDN加速**（可选）
4. **数据库优化**（如果使用数据库）

## 安全建议

1. **定期更新依赖**
   ```bash
   npm audit fix
   ```

2. **使用环境变量**
   ```bash
   # 创建 .env 文件
   API_KEY=your-api-key
   ELEVENLABS_API_KEY=your-elevenlabs-key
   ```

3. **限制API访问**
   - 在nginx.conf中添加IP白名单
   - 使用API密钥认证

4. **监控和告警**
   - 设置服务器监控
   - 配置错误告警 