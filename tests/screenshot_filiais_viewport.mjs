import { spawn } from 'node:child_process';
import fs from 'node:fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9234;

const proc = spawn(edgePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--hide-scrollbars',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=1366,768',
  'file:///C:/.PROJETOS - Sites 2026/site-villa-park/index.html'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const res = await fetch(`http://127.0.0.1:${port}/json`);
  const targets = await res.json();
  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId) { ws.removeEventListener('message', handler); resolve(msg.result); }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Runtime.evaluate', {
    expression: `new Promise(resolve => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve);
    })`,
    awaitPromise: true
  });

  await new Promise(r => setTimeout(r, 1200));

  // Scroll to absolute bottom of page
  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      window.scrollTo(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
    `
  });

  await new Promise(r => setTimeout(r, 1000));

  // Capture full viewport
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false
  });

  fs.writeFileSync('tests/filiais_viewport_bottom.png', Buffer.from(data, 'base64'));
  console.log('Saved tests/filiais_viewport_bottom.png');

  ws.close();
} catch (e) {
  console.error('Error:', e);
} finally {
  proc.kill();
}
