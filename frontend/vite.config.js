import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Rewrite /cdn-cgi/image/... to direct asset paths
const cdnCgiPlugin = () => ({
  name: 'cdn-cgi-rewrite',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.includes('/cdn-cgi/image/')) {
        req.url = req.url.replace(/\/cdn-cgi\/image\/[^/]+/, '');
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cdnCgiPlugin()],
})

