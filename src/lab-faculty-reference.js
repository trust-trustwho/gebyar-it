import { FACULTY_LEADERSHIP_SOURCE, FACULTY_OFFICIAL_SOURCE } from './data-faculty.js';

export function renderLabFacultyReference({ sourceHref, sourceLabel }) {
  return `
    <div class="se-faculty-reference">
      <p class="se-body">Sumber data dosen</p>
      <ul class="se-faculty-source-links">
        <li><a href="${sourceHref}">${sourceLabel}</a></li>
        <li><a href="${FACULTY_OFFICIAL_SOURCE}">Profil Dosen Teknik Informatika UIKA</a></li>
        <li><a href="${FACULTY_LEADERSHIP_SOURCE}">Pelantikan Kepala Lab 2024–2028</a></li>
      </ul>
    </div>`;
}
