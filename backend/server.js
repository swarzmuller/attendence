const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const targetUrl = 'http://94.131.246.109:5555/v1/2';

// Проксі для всіх запитів на API
app.use('/api', createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/': '',
  },
}));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});