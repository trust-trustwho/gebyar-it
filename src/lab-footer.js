import { siteUrl } from './site-url.js';
import { LAB_NAMES } from './data-faculty.js';

const FACULTY_EMAIL = 'ft@uika-bogor.ac.id';

export function renderLabFooterActions(currentLab) {
  const links = Object.entries(LAB_NAMES)
    .filter(([code]) => code.toLowerCase() !== currentLab)
    .map(([code, name]) => {
      const lab = code.toLowerCase();
      return `<a class="se-footer-lab se-footer-lab--${lab}" href="${siteUrl(lab)}" data-se-lab="${lab}" aria-label="Laboratorium ${name}">${code}</a>`;
    }).join('');

  return `<p class="se-body"><span class="desktop-copy">Setiap laboratorium punya fokus dan cara belajar yang berbeda.<br>Temukan bidang yang paling dekat dengan minatmu.</span><span class="mobile-copy">Tiap lab punya fokus berbeda.<br>Temukan lab sesuai minatmu.</span></p>
    <div class="se-faculty-contact">
      <button type="button" class="fsf-mail se-faculty-copy" aria-label="Salin alamat email ${FACULTY_EMAIL}">
        <span class="fsf-mail-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
            <path d="M4.5 7L12 12.5L19.5 7" />
          </svg>
        </span>
        <span class="fsf-mail-text">${FACULTY_EMAIL}</span>
        <span class="fsf-mail-tag" aria-hidden="true"><span class="is-idle">salin</span><span class="is-done">tersalin!</span></span>
      </button>
      <span class="se-sr-only" role="status"></span>
    </div>
    <p class="se-contact-explore"><span>Eksplorasi <em>lab lainnya</em></span></p>
    <nav class="se-footer-labs" aria-label="Laboratorium lainnya">${links}</nav>
    <div class="se-bottom">
      <span>${LAB_NAMES[currentLab.toUpperCase()].toUpperCase()}</span>
      <button type="button" data-se-top>Kembali ke atas ↑</button>
      <span>UIKA BOGOR</span>
    </div>`;
}

export function initLabFooter(root, onLab) {
  const footer = root.querySelector('.se-contact');
  const copyButton = footer.querySelector('.se-faculty-copy');
  const copyStatus = footer.querySelector('.se-faculty-contact [role="status"]');
  let copyTimer;

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(FACULTY_EMAIL);
      copyButton.classList.add('is-copied');
      copyStatus.textContent = 'Alamat email fakultas tersalin.';
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copyButton.classList.remove('is-copied');
        copyStatus.textContent = '';
      }, 1800);
    } catch {
      copyStatus.textContent = 'Email tidak dapat disalin. Membuka aplikasi email.';
      window.location.href = `mailto:${FACULTY_EMAIL}`;
    }
  });

  footer.addEventListener('click', event => {
    const link = event.target.closest('[data-se-lab]');
    if (link && onLab && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      onLab(link.dataset.seLab);
    }
  });
}
