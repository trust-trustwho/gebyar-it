import { siteUrl } from './site-url.js';
import './se-edge-objects.css';

// Software symbols are custom 3D renders based on Better Icons / Phosphor.
// Model renders and icon licences are recorded beside the exported images.
const COMPOSITIONS = {
  se: {
    hero: ['code', 'database'], about: ['interface'], learn: ['git'],
    faculty: ['quality'], career: ['monitor'], contact: ['code'],
  },
  csn: {
    hero: ['router', 'cloud'], about: ['topology'], learn: ['server'],
    faculty: ['quality'], career: ['router'], contact: ['cloud'],
  },
  git: {
    hero: ['globe', 'pin'], about: ['map'], learn: ['satellite'],
    faculty: ['quality'], career: ['map'], contact: ['pin'],
  },
  keris: {
    hero: ['brain', 'chip'], about: ['knowledge'], learn: ['robot'],
    faculty: ['quality'], career: ['chip'], contact: ['knowledge'],
  },
};

export function renderSEEdgeObjects(section, lab = 'se') {
  const directory = lab === 'se' ? 'se/edge-objects' : `lab-objects/${lab}`;
  return `<span class="se-edge-scene se-edge-scene--${section}" aria-hidden="true">
    ${COMPOSITIONS[lab][section].map((object, index) => `<span class="se-edge-object se-edge-object--${object} se-edge-object--slot-${index}">
      <img src="${siteUrl(`/assets/${directory}/${object}.webp`)}" width="800" height="600" alt="" draggable="false" decoding="async" ${section === 'hero' ? '' : 'loading="lazy"'}>
    </span>`).join('')}
  </span>`;
}
