import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { runDebatePipeline, clearDebateCache } from './server/orchestrator';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.post('/api/debate', async (req, res) => {
    try {
      const { prompt, mode, intensity, keys } = req.body;

      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        return res.status(400).json({ error: 'Prompt is required and must be non-empty.' });
      }

      console.log(`[API /api/debate] Processing query: "${prompt.slice(0, 50)}..."`);
      const result = await runDebatePipeline(
        prompt,
        mode || 'balanced',
        intensity || 'deep',
        keys
      );

      res.json(result);
    } catch (error: any) {
      console.error('[API /api/debate Error]:', error);
      res.status(500).json({
        error: error?.message || 'An error occurred during the multi-agent debate pipeline.',
      });
    }
  });

  app.post('/api/cache/clear', (req, res) => {
    clearDebateCache();
    res.json({ success: true, message: 'Debate cache cleared successfully.' });
  });

  // Vite middleware in development vs Static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI Consensus Hub] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
