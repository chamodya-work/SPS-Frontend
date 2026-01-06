const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy frontend requests starting with /SPS to backend running on :8088
  const { createProxyMiddleware } = require("http-proxy-middleware");

  // This proxy attaches an Authorization header for development to avoid
  // browser basic-auth popups when the backend requires HTTP Basic Auth.
  // Set environment variables BASIC_AUTH_USER and BASIC_AUTH_PASSWORD in
  // your shell or in a .env (note: create .env.local for CRA) to avoid
  // checking in credentials. Falls back to provided credentials if env
  // vars are not present.
  const BASIC_USER = process.env.BASIC_AUTH_USER || "user";
  const BASIC_PASS = process.env.BASIC_AUTH_PASSWORD || "admin123";
  const BASIC_AUTH_HEADER = "Basic " + Buffer.from(`${BASIC_USER}:${BASIC_PASS}`).toString("base64");

  app.use(
    "/SPS",
    createProxyMiddleware({
      target: "http://localhost:8096",
      changeOrigin: true,
      pathRewrite: { '^/SPS': '' },
      onProxyReq: (proxyReq, req, res) => {
        // Attach Authorization header so backend sees credentials
        proxyReq.setHeader('Authorization', BASIC_AUTH_HEADER);
      },
    })
  );

  // Keep existing proxy for plain /api paths (used by some services)
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      secure: false,
    })
  );
};