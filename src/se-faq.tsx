import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { FaqPro, type FaqProItem } from '@/components/ui/faq-pro';
import './se-faq.css';

const mounts = new WeakMap<HTMLElement, Root>();

export function initSEFaq(root: HTMLElement, careers: string[][], aboutAnswer?: string) {
  const about: FaqProItem[] = [{
    id: 'visi-arah-pengembangan',
    question: 'Visi & arah pengembangan',
    answer: 'Menghasilkan riset unggulan berbasis teknologi web, mobile, dan kecerdasan buatan untuk mendukung pengembangan smart campus. Kegiatannya mencakup pendidikan, penelitian, pengabdian masyarakat, serta pendampingan skripsi dan publikasi mahasiswa.',
  }];
  if (aboutAnswer) about[0].answer = aboutAnswer;
  const careerItems: FaqProItem[] = careers.map(([question, description, skills], index) => ({
    id: `karier-${index+1}`,
    question,
    answer: `${description} Kompetensi terkait: ${skills}.`,
  }));

  root.querySelectorAll<HTMLElement>('[data-se-faq]').forEach(container => {
    if (mounts.has(container)) return;
    const isCareer = container.dataset.seFaq === 'career';
    const reactRoot = createRoot(container, { identifierPrefix: `${root.id}-${container.dataset.seFaq}-` });
    mounts.set(container, reactRoot);
    reactRoot.render(
      <MotionConfig reducedMotion="user">
        <FaqPro
          className="se-faq-glass"
          items={isCareer ? careerItems : about}
          defaultOpenFirst={isCareer}
          showSearch={false}
        />
      </MotionConfig>
    );
  });
}
