const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 创建ssl目录
const sslDir = path.join(__dirname, 'ssl');
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir);
}

// 生成私钥
function generatePrivateKey() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });
}

// 生成自签名证书
function generateSelfSignedCert(privateKey) {
  const cert = crypto.createCertificate();
  
  // 设置证书信息
  cert.setPublicKey(privateKey.publicKey);
  cert.setPrivateKey(privateKey.privateKey);
  
  // 设置证书属性
  cert.setSerial('01');
  cert.setVersion(2);
  
  // 设置有效期
  const now = new Date();
  const expiry = new Date();
  expiry.setFullYear(now.getFullYear() + 1);
  
  cert.setStartDate(now.toISOString());
  cert.setEndDate(expiry.toISOString());
  
  // 设置主题和颁发者
  const subject = {
    C: 'CN',
    ST: 'Beijing',
    L: 'Beijing',
    O: 'DigitalCreatures',
    OU: 'Development',
    CN: 'localhost'
  };
  
  cert.setSubject(subject);
  cert.setIssuer(subject);
  
  // 添加扩展
  cert.addExtension({
    name: 'basicConstraints',
    cA: false
  });
  
  cert.addExtension({
    name: 'keyUsage',
    keyCertSign: false,
    digitalSignature: true,
    nonRepudiation: false,
    keyEncipherment: true,
    dataEncipherment: false
  });
  
  cert.addExtension({
    name: 'extKeyUsage',
    serverAuth: true,
    clientAuth: false
  });
  
  cert.addExtension({
    name: 'subjectAltName',
    altNames: [
      { type: 2, value: 'localhost' },
      { type: 7, ip: '127.0.0.1' }
    ]
  });
  
  return cert.sign(privateKey.privateKey, 'sha256');
}

try {
  console.log('正在生成SSL证书...');
  
  // 生成密钥对
  const keyPair = generatePrivateKey();
  
  // 生成证书
  const cert = generateSelfSignedCert(keyPair);
  
  // 保存私钥
  fs.writeFileSync(path.join(sslDir, 'privkey.pem'), keyPair.privateKey);
  
  // 保存证书
  fs.writeFileSync(path.join(sslDir, 'fullchain.pem'), cert);
  
  console.log('SSL证书生成成功！');
  console.log('证书文件位置:');
  console.log(`  私钥: ${path.join(sslDir, 'privkey.pem')}`);
  console.log(`  证书: ${path.join(sslDir, 'fullchain.pem')}`);
  console.log('\n现在可以运行 npm start 启动HTTPS服务器');
  
} catch (error) {
  console.error('生成证书时出错:', error.message);
  process.exit(1);
} 