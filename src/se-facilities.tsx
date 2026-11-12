import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './se-facilities.css';

const galleries = {
  se: [
    { id: '153317', alt: 'Deretan meja dan komputer di ruang praktikum Lab SE' },
    { id: '153324', alt: 'Tampilan meja dan monitor komputer Lab SE dari sisi depan' },
  ],
  csn: [
    { id: '153039', alt: 'Meja praktikum dengan perangkat dan laptop di Lab CSN' },
    { id: '153058', alt: 'Deretan laptop dan perangkat di meja kerja Lab CSN' },
  ],
  git: [
    { id: '152912', alt: 'Deretan komputer dengan peta di dinding ruang praktikum Lab GIT' },
    { id: '152916', alt: 'Meja dan komputer Lab GIT dari sisi ruang' },
    { id: '152921', alt: 'Tampilan lebar ruang Lab GIT dengan layar di bagian depan' },
  ],
  keris: [
    { id: '153234', alt: 'Meja diskusi dan deretan kursi di Lab KERIS' },
    { id: '153245', alt: 'Ruang Lab KERIS dengan papan tulis dan layar di ujung meja' },
  ],
};

type Photo = (typeof galleries.se)[number];
type PhotoCarousel = {
  pitch: number;
  isPaused: boolean;
  justDragged: boolean;
  scrollByOffset: (offset: number) => void;
  destroy: () => void;
};
type CarouselFactory = (
  stage: HTMLElement,
  track: HTMLElement,
  empty: null,
  options: {
    data: Photo[];
    centerInStage: boolean;
    cardWidth: number;
    mobileHeightScale?: number;
    cardGap: number;
    renderCard: (photo: Photo, index: number) => string;
  },
) => PhotoCarousel;

function FacilitiesGallery({ lab, createCarousel }: { lab: keyof typeof galleries; createCarousel: CarouselFactory }) {
  const photos = galleries[lab];
  const imageUrl = (id: string) => `${import.meta.env.BASE_URL}assets/fasilitas/${lab}/IMG_20261019_${id}.webp`;
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const carousel = useRef<PhotoCarousel | null>(null);
  const reduced = useReducedMotion();
  const photo = selected === null ? null : photos[selected];
  const step = (direction: number) => setSelected(index => index === null
    ? null : (index + direction + photos.length) % photos.length);

  const open = (index: number) => {
    setSelected(index);
    dialog.current?.showModal();
  };

  useEffect(() => {
    if (!stage.current || !track.current) return;
    const instance = createCarousel(stage.current, track.current, null, {
      data: photos,
      centerInStage: true,
      cardWidth: 440,
      mobileHeightScale: .65,
      cardGap: 12,
      renderCard: (item, index) => `
        <div class="carousel-card se-facilities-panel" data-photo-index="${index % photos.length}">
          <img src="${import.meta.env.BASE_URL}assets/fasilitas/${lab}/IMG_20261019_${item.id}.webp" alt="" draggable="false" loading="lazy">
        </div>`,
    });
    carousel.current = instance;
    return () => {
      instance.destroy();
      carousel.current = null;
    };
  }, [createCarousel, lab, photos]);

  useEffect(() => {
    if (carousel.current) carousel.current.isPaused = Boolean(reduced) || selected !== null;
  }, [createCarousel, reduced, selected]);

  return <>
    <div className="curved-carousel-stage se-facilities-carousel" ref={stage}
      tabIndex={0} role="region" aria-label={`Foto fasilitas Lab ${lab.toUpperCase()}. Gunakan panah kiri atau kanan untuk menggeser dan Enter untuk membuka galeri.`}
      onClick={event => {
        if (carousel.current?.justDragged) return;
        const card = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-photo-index]');
        if (card && event.currentTarget.contains(card)) open(Number(card.dataset.photoIndex));
      }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          const instance = carousel.current;
          instance?.scrollByOffset(event.key === 'ArrowLeft' ? instance.pitch : -instance.pitch);
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          const bounds = event.currentTarget.getBoundingClientRect();
          const card = document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
            ?.closest<HTMLElement>('[data-photo-index]');
          open(card && event.currentTarget.contains(card) ? Number(card.dataset.photoIndex) : 0);
        }
      }}>
      <div className="curved-carousel-track" ref={track} aria-hidden="true" />
    </div>
    <dialog className="se-facilities-dialog" ref={dialog} aria-label={`Galeri fasilitas Lab ${lab.toUpperCase()}`} data-lenis-prevent=""
      onClose={() => setSelected(null)}
      onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          step(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
      onWheel={event => event.stopPropagation()} onTouchMove={event => event.stopPropagation()}>
      <button type="button" className="se-facilities-control se-facilities-close" aria-label="Tutup galeri"
        onClick={() => dialog.current?.close()}><X aria-hidden="true" /></button>
      {photo && <div className="se-facilities-view">
        <div className="se-facilities-frame">
          <AnimatePresence initial={false}>
            <motion.img key={photo.id} src={imageUrl(photo.id)} alt={photo.alt}
              initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }} />
          </AnimatePresence>
        </div>
        <div className="se-facilities-navigation">
          <button type="button" className="se-facilities-control" aria-label="Foto sebelumnya" onClick={() => step(-1)}><ChevronLeft aria-hidden="true" /></button>
          <span aria-live="polite">{selected! + 1} / {photos.length}</span>
          <button type="button" className="se-facilities-control" aria-label="Foto berikutnya" onClick={() => step(1)}><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>}
    </dialog>
  </>;
}

export function mountLabFacilities(scope: HTMLElement, createCarousel: CarouselFactory) {
  const mount = scope.querySelector<HTMLElement>('[data-lab-facilities]');
  if (!mount?.isConnected) return;
  const lab = mount.dataset.labFacilities as keyof typeof galleries;
  createRoot(mount).render(<FacilitiesGallery lab={lab} createCarousel={createCarousel} />);
}
