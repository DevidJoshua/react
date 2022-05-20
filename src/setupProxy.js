const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://localhost:8288',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/render/document/pltransactions',
    createProxyMiddleware({
      target: 'http://localhost:8288',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/render/document/paymentlink/trx',
    createProxyMiddleware({
      target: 'http://localhost:8288',
      changeOrigin: true,
    })
  );
  app.use(
    '/upload/doc/merchant',
    createProxyMiddleware({
      target: 'http://localhost:8288',
      changeOrigin: true,
    })
  );
};