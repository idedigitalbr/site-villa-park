import { spawn } from 'node:child_process';
import fs from 'node:fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9224;

const proc = spawn(edgePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--hide-scrollbars',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=1440,900',
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

  // Set viewport to 1920x1080
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Give a little time for Tailwind and fonts to render
  await new Promise(r => setTimeout(r, 2500));

  // Get bounding rect of #clube
  const evalRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const clube = document.getElementById('clube');
        if (!clube) return null;
        clube.scrollIntoView({ behavior: 'instant', block: 'start' });
        const rect = clube.getBoundingClientRect();
        return {
          x: 0,
          y: Math.max(0, Math.round(rect.top + window.scrollY) - 200),
          width: 1920,
          height: 800
        };
      })()
    `,
    returnByValue: true
  });

  const clip = evalRes?.result?.value;
  console.log('Capture clip:', clip);

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

  fs.writeFileSync('d:/.GITHUB/site-villa-park/tests/clube_transition_desktop.png', Buffer.from(data, 'base64'));
  console.log('Saved tests/clube_transition_desktop.png');

  ws.close();
} catch (e) {
  console.error('Error:', e);
} finally {
  proc.kill();
}
