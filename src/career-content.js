const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

export function renderCareerCards(cards) {
  return cards.map((card, index) => `
    <div class="fan-card liquid-glass-dark" data-index="${index}" data-lab="${card.labCode}">
      <div class="fan-card-inner">
        <div class="fan-card-top"><span class="fan-track-badge badge-${card.labCode.toLowerCase()}">${escapeHtml(card.trackLabel)}</span><span class="fan-grad-year">${card.labCode}</span></div>
        <div class="fan-avatar-row"><div class="fan-persona-info"><h4 class="fan-name">${escapeHtml(card.title)}</h4><p class="fan-current-role">${escapeHtml(card.description)}</p><div class="fan-company-tag"><span class="company-dot" style="background:${card.accentColor}"></span><span class="company-name">Contoh profesi · Lab ${card.labCode}</span></div></div></div>
        <div class="fan-career-trajectory"><span class="trajectory-label">CONTOH ALUR BELAJAR</span><div class="trajectory-steps">${card.roadmapSteps.map((step, i) => `<div class="trajectory-step ${i === card.roadmapSteps.length - 1 ? 'is-current' : ''}"><span class="step-num">0${i + 1}</span><span class="step-title">${escapeHtml(step.title)}</span></div>`).join('')}</div></div>
        <div class="fan-card-metrics"><div class="fan-salary-box"><span class="salary-lbl">Arah Pengembangan:</span><span class="salary-val">${escapeHtml(card.focus)}</span></div><div class="fan-skills-pills">${card.topSkills.map(skill => `<span class="fan-skill-tag">${escapeHtml(skill)}</span>`).join('')}</div></div>
      </div>
    </div>`).join('');
}

export function populateCareerModal(data, doc = document) {
  const modal = doc.getElementById('alumniRoadmapModal');
  if (!modal || !data) return;
  const setText = (id, value) => { const node = doc.getElementById(id); if (node) node.textContent = value; };
  setText('modalAlumniTrack', data.trackLabel);
  const track = doc.getElementById('modalAlumniTrack');
  if (track) track.className = `modal-track-badge badge-${data.labCode.toLowerCase()}`;
  setText('modalAlumniGrad', 'Contoh profesi');
  setText('modalAlumniName', data.title);
  setText('modalAlumniRole', `Peminatan ${data.labCode} · ${data.focus}`);
  setText('modalAlumniQuote', data.description);
  const roadmap = doc.getElementById('modalAlumniRoadmap');
  if (roadmap) roadmap.innerHTML = data.roadmapSteps.map(step => `
    <div class="modal-roadmap-step"><div class="step-marker" style="border-color:${data.accentColor};color:#0a0a0c;background:${data.accentColor}20"><span>0${step.step}</span></div><div class="step-content"><span class="step-period">${escapeHtml(step.period)}</span><h5 class="step-title">${escapeHtml(step.title)}</h5><p class="step-desc">${escapeHtml(step.desc)}</p></div></div>`).join('');
  const skills = doc.getElementById('modalAlumniSkills');
  if (skills) skills.innerHTML = data.topSkills.map(skill => `<span class="modal-skill-pill">${escapeHtml(skill)}</span>`).join('');
  const sources = doc.getElementById('modalCareerSources');
  if (sources) sources.innerHTML = data.sources.map(source => `<a href="${escapeHtml(source.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)} <span aria-hidden="true">↗</span></a>`).join('');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  doc.body.style.overflow = 'hidden';
}
