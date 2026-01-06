module.exports = {
  eslint: {
    // Disable CRACO's ESLint integration for the production build to silence
    // warnings emitted by the webpack eslint plugin. This is a quick way to
    // prevent warnings from appearing during `npm run build` when you need a
    // deployable output. Prefer fixing the underlying warnings later.
    enable: false,
  },
  webpack: {
    configure: {
      resolve: {
        fallback: {
        "http": false,
          "https": false,
          "zlib": false,
          "stream": false,
          "crypto": false,
          "url": false,
          "assert": false,
          "util": false
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
};