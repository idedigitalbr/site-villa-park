import { spawn } from 'node:child_process';
import fs from 'node:fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9223;

const proc = spawn(edgePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--hide-scrollbars',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=1920,1080',
  'file:///D:/.GITHUB/site-villa-park/index.html'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const res = await fetch(`http://127.0.0.1:${port}/json`);
  const targets = await res.json();
  const pageTarget = targets.find(t => t.type === 'page');
  if (!pageTarget) throw new Error('No page target found');

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  // Set viewport to 1920x1080 (standard desktop)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Wait for document to load completely
  await send('Runtime.evaluate', {
    expression: `new Promise(resolve => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve);
    })`,
    awaitPromise: true
  });

  // Give a little time for Tailwind and fonts to render
  await new Promise(r => setTimeout(r, 1000));

  // Get bounding rect of #filiais
  const evalRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.getElementById('filiais');
        if (!el) return null;
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        const rect = el.getBoundingClientRect();
        return {
          x: Math.round(rect.left + window.scrollX),
          y: Math.round(rect.top + window.scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      })()
    `,
    returnByValue: true
  });

  console.log('Filiais element clip:', evalRes?.result?.value);
  const clip = evalRes?.result?.value;

  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    clip: clip ? {
      x: 0,
      y: clip.y,
      width: 1920,
      height: clip.height,
      scale: 1
    } : undefined
  });

  fs.writeFileSync('d:/.GITHUB/site-villa-park/tests/filiais_preview.png', Buffer.from(data, 'base64'));
  console.log('Saved tests/filiais_preview.png');

  ws.close();
} catch (e) {
  console.error('Error:', e);
} finally {
  proc.kill();
}
