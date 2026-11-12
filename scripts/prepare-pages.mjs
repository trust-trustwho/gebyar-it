import { copyFile, mkdir } from 'node:fs/promises';

// Give each lab a static entry so GitHub Pages serves direct links and refreshes.
for (const lab of ['se', 'csn', 'git', 'keris']) {
  await mkdir(`dist/${lab}`, { recursive: true });
  await copyFile('dist/index.html', `dist/${lab}/index.html`);
}
