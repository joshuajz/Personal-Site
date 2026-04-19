/**
 * prerender.mjs — post-build static prerender
 *
 * Run after `vite build` completes. Spins up a tiny Node http server over
 * dist/, navigates to it with headless Chromium, waits for React + Mantine
 * to fully render, captures the DOM, writes it back to dist/index.html, then
 * explicitly shuts everything down so the process always exits cleanly.
 *
 * Usage (called from package.json "build" script):
 *   node scripts/prerender.mjs
 */

import http          from 'node:http';
import fs            from 'node:fs';
import path          from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer     from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST      = path.resolve(__dirname, '..', 'dist');
const PORT      = 5999;
const URL       = `http://localhost:${PORT}/`;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
};

// ── Tiny static file server over dist/ ────────────────────────────────────
function startServer() {
  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST, req.url === '/' ? 'index.html' : req.url);
    // SPA fallback
    if (!fs.existsSync(filePath)) filePath = path.join(DIST, 'index.html');
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve, reject) => {
    server.listen(PORT, 'localhost', () => resolve(server));
    server.on('error', reject);
  });
}

async function main() {
  let browser = null;
  let server  = null;

  try {
    // 1. Serve dist/
    console.log('[prerender] Starting static server on port', PORT);
    server = await startServer();

    // 2. Launch puppeteer
    console.log('[prerender] Launching headless browser');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const page = await browser.newPage();
    page.on('console', () => {}); // silence app logs
    page.on('pageerror', () => {});

    // 3. Navigate and wait for full render
    console.log('[prerender] Navigating to', URL);
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30_000 });

    // Wait until React has mounted and Mantine has injected its style tags
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        return (
          root &&
          root.children.length > 0 &&
          document.querySelector('style[data-mantine-styles]') !== null
        );
      },
      { timeout: 20_000 },
    );

    // Extra wait for TypeAnimation to type out its first frame
    await new Promise(r => setTimeout(r, 2500));

    // 4. Capture full DOM
    const html = await page.content();
    console.log('[prerender] Captured', html.length, 'bytes');

    // 5. Write back to dist/index.html
    const outPath = path.join(DIST, 'index.html');
    fs.writeFileSync(outPath, html, 'utf8');
    console.log('[prerender] Written to', outPath);

    // 6. Sanity checks
    const checks = [
      ['root has children',        !html.includes('<div id="root"></div>')],
      ['Royal Bank in HTML',        html.includes('Royal Bank')],
      ['Uniqlo in HTML',            html.includes('Uniqlo')],
      ['JSON-LD present',           html.includes('application/ld+json')],
      ['meta description present',  html.includes('name="description"')],
      ['canonical present',         html.includes('rel="canonical"')],
      ['bio paragraph present',     html.includes("Queen's University")],
      ['h2 headings present',       html.includes('<h2')],
    ];

    let allPassed = true;
    for (const [label, pass] of checks) {
      console.log(pass ? `  ✓ ${label}` : `  ✗ ${label}`);
      if (!pass) allPassed = false;
    }

    if (!allPassed) {
      console.error('[prerender] Some checks failed — see above');
      process.exitCode = 1;
    } else {
      console.log('[prerender] All checks passed ✓');
    }
  } catch (err) {
    console.error('[prerender] Fatal error:', err);
    process.exitCode = 1;
  } finally {
    // Always clean up — this is what prevents hanging
    if (browser) { try { await browser.close(); } catch (_) {} }
    if (server)  { server.close(); }
    console.log('[prerender] Cleanup done, exiting');
  }
}

main();
