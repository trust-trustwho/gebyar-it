export function observeSectionReveals(elements) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.intersectionRatio < 0.12) continue;
      entry.target.classList.add('se-in-view');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });

  elements.forEach(element => observer.observe(element));
}
