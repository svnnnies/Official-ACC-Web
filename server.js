const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
http.createServer((request,response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); response.end('Bad request'); return; }
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const file = path.resolve(root,relative);
  const allowed = ['index.html','styles.css','app.js','content.js'];
  if ((!allowed.includes(relative) && !relative.startsWith('assets/')) || !file.startsWith(root + path.sep)) {
    response.writeHead(404); response.end('Not found'); return;
  }
  fs.readFile(file,(error,data) => {
    if (error) { response.writeHead(404); response.end('Not found'); return; }
    response.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'});
    response.end(data);
  });
}).listen(3000,'127.0.0.1',() => console.log('ACC preview: http://127.0.0.1:3000'));

