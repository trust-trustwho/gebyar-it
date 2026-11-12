import { FACULTY_DIRECTORY, FACULTY_OFFICIAL_SOURCE, FACULTY_LEADERSHIP_SOURCE } from './data-faculty.js';

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);

function orgCard(member, badge, highlighted = false) {
  return `<article class="org-card liquid-glass-dark ${highlighted ? 'org-card-highlight' : `lab-card-${member.labCode.toLowerCase()}`}">
    <div class="org-card-badge badge-${member.labCode.toLowerCase()}">${badge}</div>
    <div class="org-avatar-wrap"><div class="org-avatar-circle circle-${member.labCode.toLowerCase()}"><img src="${member.image}" alt="${escapeHtml(member.name)}" class="org-avatar-img" loading="lazy"></div></div>
    <h4 class="org-name">${escapeHtml(member.name)}</h4><p class="org-role">${escapeHtml(member.leadershipRole || `Lab ${member.labCode}`)}</p>
    ${member.nidn ? `<span class="org-nidn">NIDN (arsip): ${member.nidn}</span>` : ''}
    <p class="org-focus">${escapeHtml(member.field)}</p></article>`;
}

export function renderFacultyOrganization() {
  const leaders = FACULTY_DIRECTORY.filter(member => member.isPimpinan);
  const heads = FACULTY_DIRECTORY.filter(member => member.isKaLab);
  return `<div class="org-tree-header"><h3 class="org-tree-title">Bagan Struktur Organisasi</h3></div>
    <p class="faculty-source-note">Pimpinan dan kepala lab mengacu publikasi UIKA masa bakti 2024–2028. <a href="${FACULTY_LEADERSHIP_SOURCE}" target="_blank" rel="noopener noreferrer">Sumber jabatan</a> · <a href="${FACULTY_OFFICIAL_SOURCE}" target="_blank" rel="noopener noreferrer">Direktori resmi</a></p>
    <div class="org-hierarchy-tree"><div class="org-tier org-tier-pimpinan">${leaders.map(member => orgCard(member, member.leadershipRole.toLocaleUpperCase('id'), true)).join('')}</div>
    <div class="org-tree-connector" aria-hidden="true"><div class="connector-stem"></div><div class="connector-branch-horizontal"></div><div class="connector-drop-lines"><span></span><span></span><span></span><span></span></div></div>
    <div class="org-tier-label-strip"><span>KEPALA LABORATORIUM</span></div><div class="org-tier org-tier-labs">${heads.map(member => orgCard(member, `KEPALA LAB ${member.labCode}`)).join('')}</div></div>`;
}

export function renderDirectoryFacultyCard(member, index) {
  return `<article class="carousel-card" data-idx="${index}" data-category="${member.labCode}"><div class="carousel-card-inner liquid-glass-dark">
    <div class="dosen-card-top"><div class="dosen-avatar ${member.isPimpinan ? 'avatar-pimpinan' : ''} ${member.isKaLab ? 'avatar-kalab' : ''}"><img src="${member.image}" alt="${escapeHtml(member.name)}" class="dosen-avatar-img" loading="lazy" draggable="false"></div><div class="dosen-top-badges"><span class="dosen-lab-badge badge-${member.labCode.toLowerCase()}">${member.labCode}</span><span class="dosen-pub-badge">${member.isPimpinan ? 'Pimpinan Prodi' : member.isKaLab ? 'Kepala Lab' : 'Anggota Lab'}</span></div></div>
    <div class="dosen-card-body"><h4 class="dosen-name">${escapeHtml(member.name)}</h4><p class="dosen-role">${escapeHtml(member.role)}</p>
    ${member.nidn ? `<div class="dosen-meta-row"><span class="dosen-nidn-tag">NIDN (arsip) ${member.nidn}</span></div>` : ''}
    <div class="dosen-expertise-wrap"><span class="expertise-label">${member.fieldLabel}:</span><div class="expertise-tags">${member.expertise.map(field => `<span class="exp-tag">${escapeHtml(field)}</span>`).join('')}</div></div></div>
    </div></article>`;
}
