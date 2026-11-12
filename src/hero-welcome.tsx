import React from 'react';
import { createRoot } from 'react-dom/client';
import { Typewriter } from './components/ui/typewriter-text';
import './hero-welcome.css';

const welcomeMessages = [
  'Selamat datang di Informatika UIKA.',
  'Yuk, jelajahi empat laboratorium kami!',
  'Ikuti kuis untuk menemukan\nlab yang cocok buatmu.',
];
const welcomeSummary = welcomeMessages.join(' ').replace('\n', ' ');

export function initHeroWelcome() {
  const mount = document.getElementById('heroWelcome');
  if (!mount || mount.dataset.initialized) return;
  mount.dataset.initialized = 'true';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  createRoot(mount).render(
    <p>
      {reduceMotion ? welcomeMessages.join('\n') : <>
        <span className="sr-only">{welcomeSummary}</span>
        <span aria-hidden="true"><Typewriter text={welcomeMessages} loop delay={2400} /></span>
      </>}
    </p>,
  );
}
