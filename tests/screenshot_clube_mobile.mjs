import { spawn } from 'node:child_process';
import fs from 'node:fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9225;

const proc = spawn(edgePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--hide-scrollbars',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=390,844',
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

  // Set viewport to iPhone 12/13/14 size (390x844)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await new Promise(r => setTimeout(r, 2500));

  // Scroll to top first to ensure stable coordinates
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await new Promise(r => setTimeout(r, 500));

  // Get absolute page rect of #clube
  const evalRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const clube = document.getElementById('clube');
        if (!clube) return null;
        const rect = clube.getBoundingClientRect();
        const pageY = rect.top + window.pageYOffset;
        return {
          x: 0,
          y: Math.max(0, Math.round(pageY) - 100),
          width: 390,
          height: 650
        };
      })()
    `,
    returnByValue: true
  });

  const clip = evalRes?.result?.value;
  console.log('Mobile capture clip:', clip);

  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    clip: clip ? {
      x: 0,
      y: clip.y,
      width: 390,
      height: clip.height,
      scale: 1
    } : undefined,
    captureBeyondViewport: true
  });

  fs.writeFileSync('d:/.GITHUB/site-villa-park/tests/clube_transition_mobile.png', Buffer.from(data, 'base64'));
  console.log('Saved tests/clube_transition_mobile.png');

  ws.close();
} catch (e) {
  console.error('Error:', e);
} finally {
  proc.kill();
}
