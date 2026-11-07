// server.js - Sweet Shop Online Sales Server & Static File Host
// Zero-dependency Node.js server with REST API for recording sales online.

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const SALES_FILE = path.join(DATA_DIR, 'sales.json');
const BACKUP_FILE = path.join(DATA_DIR, 'sales.backup.json');

// Ensure data directory and sales file exist safely
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(SALES_FILE)) {
  fs.writeFileSync(SALES_FILE, '[]\n', 'utf8');
}

function readSales() {
  try {
    if (!fs.existsSync(SALES_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(SALES_FILE, 'utf8');
    if (!raw.trim()) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading sales file, checking backup:', err);
    // Automatic failover to rolling backup to prevent any data loss
    if (fs.existsSync(BACKUP_FILE)) {
      try {
        const bRaw = fs.readFileSync(BACKUP_FILE, 'utf8');
        const bParsed = JSON.parse(bRaw);
        if (Array.isArray(bParsed)) {
          console.log('Successfully recovered sales records from backup file');
          return bParsed;
        }
      } catch (bErr) {
        console.error('Backup read also failed:', bErr);
      }
    }
    return [];
  }
}

function writeSales(sales) {
  try {
    const jsonStr = JSON.stringify(sales, null, 2);
    // 1. Write to temporary file first (atomic write prevents corrupted/empty 0-byte file on interruption)
    const tempFile = SALES_FILE + '.tmp';
    fs.writeFileSync(tempFile, jsonStr, 'utf8');

    // 2. Keep a rolling backup copy of previous valid data
    if (fs.existsSync(SALES_FILE)) {
      try {
        fs.copyFileSync(SALES_FILE, BACKUP_FILE);
      } catch (copyErr) {
        // Non-critical, proceed
      }
    }

    // 3. Atomically replace target sales.json file
    fs.renameSync(tempFile, SALES_FILE);
    return true;
  } catch (err) {
    console.error('Error writing sales file atomically:', err);
    // Fallback: direct write
    try {
      fs.writeFileSync(SALES_FILE, JSON.stringify(sales, null, 2), 'utf8');
      return true;
    } catch (fallbackErr) {
      console.error('Direct write fallback failed:', fallbackErr);
      return false;
    }
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Global CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // REST API Routes
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', provider: 'node_server', time: new Date().toISOString() }));
    return;
  }

  if (pathname === '/api/sales') {
    if (req.method === 'GET') {
      const sales = readSales();
      const dateFilter = parsedUrl.query.date;
      const result = dateFilter ? sales.filter(s => s.date === dateFilter) : sales;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const sale = JSON.parse(body);
          if (!sale || typeof sale.total !== 'number') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid sale payload' }));
            return;
          }

          if (!sale.id) {
            sale.id = 'sale_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
          }
          if (!sale.timestamp) {
            sale.timestamp = new Date().toISOString();
          }

          const sales = readSales();
          sales.unshift(sale); // Add newest first
          writeSales(sales);

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(sale));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'JSON parse error: ' + err.message }));
        }
      });
      return;
    }
  }

  // DELETE /api/sales/:id
  if (pathname.startsWith('/api/sales/') && req.method === 'DELETE') {
    const id = pathname.replace('/api/sales/', '').trim();
    if (!id) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing sale id' }));
      return;
    }

    const sales = readSales();
    const index = sales.findIndex(s => String(s.id) === id);
    if (index === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Sale not found' }));
      return;
    }

    const removed = sales.splice(index, 1)[0];
    writeSales(sales);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, removed }));
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : decodeURIComponent(pathname));

  // Security: prevent path traversal outside workspace
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🍬 Sweet Shop Online Server running at http://localhost:${PORT}`);
  console.log(`   - POS Counter:    http://localhost:${PORT}/index.html`);
  console.log(`   - Sales History:  http://localhost:${PORT}/sales-history.html`);
  console.log(`   - Menu Manager:   http://localhost:${PORT}/manage.html`);
  console.log(`   - REST API:       http://localhost:${PORT}/api/sales`);
});
