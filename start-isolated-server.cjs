#!/usr/bin/env node

const { exec, spawn } = require('child_process');
const net = require('net');
const path = require('path');

// Cấu hình server
const SERVER_CONFIG = {
  host: '127.0.0.1',
  port: 8080,
  distPath: path.join(__dirname, 'dist')
};

// Màu sắc cho console
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Kiểm tra port có đang được sử dụng không
function checkPortInUse(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, host, () => {
      server.once('close', () => {
        resolve(false); // Port available
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(true); // Port in use
    });
  });
}

// Tìm port khả dụng
async function findAvailablePort(startPort, host = '127.0.0.1') {
  let port = startPort;
  while (await checkPortInUse(port, host)) {
    port++;
    if (port > startPort + 100) {
      throw new Error(`Không thể tìm thấy port khả dụng từ ${startPort} đến ${startPort + 100}`);
    }
  }
  return port;
}

// Kiểm tra các process đang chạy trên port
function checkProcessOnPort(port) {
  return new Promise((resolve) => {
    exec(`lsof -i :${port}`, (error, stdout) => {
      if (error) {
        resolve(null);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

// Kiểm tra xung đột và báo cáo
async function detectConflicts() {
  log(`${colors.bold}🔍 KIỂM TRA XUNG đột PORT${colors.reset}`);
  log(`Đang kiểm tra port ${SERVER_CONFIG.port} trên ${SERVER_CONFIG.host}...`);
  
  const isPortInUse = await checkPortInUse(SERVER_CONFIG.port, SERVER_CONFIG.host);
  
  if (isPortInUse) {
    log(`${colors.red}❌ Port ${SERVER_CONFIG.port} đang được sử dụng!${colors.reset}`);
    
    const processInfo = await checkProcessOnPort(SERVER_CONFIG.port);
    if (processInfo) {
      log(`${colors.yellow}📋 Process đang sử dụng port:${colors.reset}`);
      console.log(processInfo);
    }
    
    // Tìm port khả dụng
    const availablePort = await findAvailablePort(SERVER_CONFIG.port + 1, SERVER_CONFIG.host);
    log(`${colors.blue}💡 Port khả dụng gần nhất: ${availablePort}${colors.reset}`);
    
    return { conflict: true, suggestedPort: availablePort };
  } else {
    log(`${colors.green}✅ Port ${SERVER_CONFIG.port} khả dụng!${colors.reset}`);
    return { conflict: false };
  }
}

// Kiểm tra thư mục dist
function checkDistDirectory() {
  const fs = require('fs');
  if (!fs.existsSync(SERVER_CONFIG.distPath)) {
    throw new Error(`Thư mục dist không tồn tại: ${SERVER_CONFIG.distPath}`);
  }
  
  const indexPath = path.join(SERVER_CONFIG.distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error(`File index.html không tồn tại trong thư mục dist`);
  }
  
  log(`${colors.green}✅ Thư mục dist hợp lệ: ${SERVER_CONFIG.distPath}${colors.reset}`);
}

// Khởi chạy server với Express và proxy
function startServer(host, port) {
  return new Promise((resolve, reject) => {
    log(`${colors.bold}🚀 KHỞI CHẠY SERVER${colors.reset}`);
    log(`Địa chỉ: http://${host}:${port}`);
    log(`Thư mục: ${SERVER_CONFIG.distPath}`);
    
    try {
      const express = require('express');
      const { createProxyMiddleware } = require('http-proxy-middleware');
      const path = require('path');
      
      const app = express();
      
      // Debug middleware to log all requests
      app.use((req, res, next) => {
        log(`${colors.yellow}📥 Request: ${req.method} ${req.url}${colors.reset}`);
        next();
      });
      
      // Cấu hình proxy cho API requests
      const apiProxy = createProxyMiddleware({
        target: 'http://localhost:3001',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/': '/api/', // Thêm lại prefix /api vì Express đã strip nó
        },
        onError: (err, req, res) => {
          console.error('Proxy Error:', err.message);
          res.status(500).json({ error: 'API proxy error', message: err.message });
        },
        onProxyReq: (proxyReq, req, res) => {
          log(`${colors.blue}🔄 Proxy API: ${req.method} ${req.url} -> http://localhost:3001/api${req.url}${colors.reset}`);
        },
        onProxyRes: (proxyRes, req, res) => {
          log(`${colors.green}✅ Proxy Response: ${proxyRes.statusCode} for ${req.url}${colors.reset}`);
        }
      });
      
      // Sử dụng proxy cho tất cả requests bắt đầu với /api
      app.use('/api', (req, res, next) => {
        log(`${colors.blue}🔄 API Middleware: ${req.method} ${req.url}${colors.reset}`);
        next();
      }, apiProxy);
      
      // Serve static files từ thư mục dist (AFTER API proxy) - exclude API paths
      app.use((req, res, next) => {
        if (req.path.startsWith('/api')) {
          return next(); // Skip static serving for API paths
        }
        express.static(SERVER_CONFIG.distPath)(req, res, next);
      });
      
      // Fallback cho SPA routing - serve index.html cho tất cả routes không phải API
      app.use((req, res, next) => {
        if (!req.path.startsWith('/api') && req.method === 'GET') {
          res.sendFile(path.join(SERVER_CONFIG.distPath, 'index.html'));
        } else {
          next();
        }
      });
      
      const server = app.listen(port, host, () => {
        log(`${colors.green}✅ Express server đang chạy với API proxy${colors.reset}`);
        resolve(server);
      });
      
      server.on('error', (error) => {
        reject(new Error(`Lỗi khởi chạy server: ${error.message}`));
      });
      
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        log(`${colors.red}❌ Thiếu dependencies. Đang cài đặt...${colors.reset}`);
        
        // Fallback to npx serve if express is not available
        const serverProcess = spawn('npx', [
          'serve', 
          SERVER_CONFIG.distPath,
          '-l', `tcp://${host}:${port}`,
          '--single'  // SPA mode
        ], {
          stdio: 'inherit',
          cwd: __dirname
        });
        
        serverProcess.on('error', (error) => {
          reject(new Error(`Lỗi khởi chạy server: ${error.message}`));
        });
        
        setTimeout(() => {
          resolve(serverProcess);
        }, 2000);
      } else {
        reject(error);
      }
    }
  });
}

// Kiểm tra server sau khi khởi động
async function verifyServer(host, port) {
  log(`${colors.bold}🔍 KIỂM TRA SAU TRIỂN KHAI${colors.reset}`);
  
  // Kiểm tra port có đang listen không
  const isListening = await checkPortInUse(port, host);
  if (!isListening) {
    log(`${colors.red}❌ Server không đang listen trên ${host}:${port}${colors.reset}`);
    return false;
  }
  
  // Kiểm tra HTTP response
  return new Promise((resolve) => {
    const http = require('http');
    const options = {
      hostname: host,
      port: port,
      path: '/',
      method: 'GET',
      timeout: 5000
    };
    
    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        log(`${colors.green}✅ Server phản hồi thành công (HTTP ${res.statusCode})${colors.reset}`);
        log(`${colors.green}✅ Server đang chạy độc lập tại http://${host}:${port}${colors.reset}`);
        resolve(true);
      } else {
        log(`${colors.yellow}⚠️ Server phản hồi với mã lỗi: ${res.statusCode}${colors.reset}`);
        resolve(false);
      }
    });
    
    req.on('error', (error) => {
      log(`${colors.red}❌ Lỗi kết nối đến server: ${error.message}${colors.reset}`);
      resolve(false);
    });
    
    req.on('timeout', () => {
      log(`${colors.red}❌ Timeout khi kết nối đến server${colors.reset}`);
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

// Main function
async function main() {
  try {
    log(`${colors.bold}🌟 TRIỂN KHAI LOCALHOST ISOLATED SERVER${colors.reset}`);
    log(`Cấu hình: ${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`);
    console.log('');
    
    // 1. Kiểm tra thư mục dist
    checkDistDirectory();
    
    // 2. Kiểm tra xung đột
    const conflictResult = await detectConflicts();
    
    let finalHost = SERVER_CONFIG.host;
    let finalPort = SERVER_CONFIG.port;
    
    if (conflictResult.conflict) {
      log(`${colors.yellow}⚠️ Sử dụng port thay thế: ${conflictResult.suggestedPort}${colors.reset}`);
      finalPort = conflictResult.suggestedPort;
    }
    
    console.log('');
    
    // 3. Khởi chạy server
    const serverProcess = await startServer(finalHost, finalPort);
    
    // 4. Kiểm tra sau triển khai
    setTimeout(async () => {
      const isWorking = await verifyServer(finalHost, finalPort);
      
      if (isWorking) {
        console.log('');
        log(`${colors.bold}${colors.green}🎉 TRIỂN KHAI THÀNH CÔNG!${colors.reset}`);
        log(`${colors.bold}📍 URL: http://${finalHost}:${finalPort}${colors.reset}`);
        log(`${colors.bold}🔒 Server chạy độc lập, không xung đột với các dịch vụ khác${colors.reset}`);
        console.log('');
        log(`${colors.blue}💡 Nhấn Ctrl+C để dừng server${colors.reset}`);
      } else {
        log(`${colors.red}❌ Triển khai thất bại!${colors.reset}`);
        process.exit(1);
      }
    }, 3000);
    
    // Xử lý tín hiệu dừng
    process.on('SIGINT', () => {
      log(`${colors.yellow}🛑 Đang dừng server...${colors.reset}`);
      serverProcess.kill();
      process.exit(0);
    });
    
  } catch (error) {
    log(`${colors.red}❌ Lỗi: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Chạy script
if (require.main === module) {
  main();
}

module.exports = { checkPortInUse, findAvailablePort, detectConflicts };