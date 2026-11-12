export function renderLabFacilities(lab) {
  const description = lab === 'se'
    ? 'Lihat ruang dan fasilitas komputer Laboratorium Software Engineering UIKA.'
    : `Lihat ruang dan fasilitas Laboratorium ${lab.toUpperCase()} UIKA.`;

  return `
    <section class="se-block" id="${lab}-fasilitas" aria-labelledby="${lab}-facilities-title">
      <div class="se-section-heading">
        <h2 class="se-heading" id="${lab}-facilities-title" data-se-reveal>Ruang untuk merancang.<br><em>Tempat untuk berkarya.</em></h2>
        <p class="se-body">${description}</p>
      </div>
      <div data-lab-facilities="${lab}"></div>
    </section>`;
}

export function initLabFacilities(scope, createCarousel) {
  import('./se-facilities.tsx').then(({ mountLabFacilities }) => mountLabFacilities(scope, createCarousel));
}
