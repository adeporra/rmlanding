/**
 * Section Nav Block
 * Fixed bottom navigation that toggles visibility of page sections.
 * Each row contains a link whose href targets a heading ID.
 * The "home" link restores the default (main) sections.
 *
 * Toggled sections are identified by data-toggled-section attribute
 * set in scripts.js buildSectionNav() before decorateSections runs.
 */
export default function decorate(block) {
  const items = [...block.querySelectorAll(':scope > div')];
  const nav = document.createElement('nav');
  nav.className = 'section-nav-bar';

  const ul = document.createElement('ul');

  items.forEach((row) => {
    const link = row.querySelector('a');
    if (!link) return;

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;
    a.dataset.target = link.getAttribute('href').replace('#', '');

    // Use data-icon attribute if available, otherwise derive from text
    const text = link.textContent.trim();
    const iconName = link.dataset.icon
      || `nav-${text.toLowerCase().replace(/[^a-z0-9-]/g, '')}`;
    const icon = document.createElement('img');
    icon.src = `${window.hlx.codeBasePath}/icons/${iconName}.svg`;
    icon.alt = '';
    icon.loading = 'lazy';
    icon.width = 28;
    icon.height = 28;

    const label = document.createElement('span');
    label.textContent = text;

    a.append(icon, label);
    li.append(a);
    ul.append(li);
  });

  nav.append(ul);
  block.textContent = '';
  block.append(nav);

  // Identify sections
  const mainEl = document.querySelector('main');
  const allSections = [...mainEl.querySelectorAll(':scope > .section')];
  const navSection = block.closest('.section');

  // Toggled sections have data-toggled-section set by buildSectionNav
  const hiddenSections = allSections.filter(
    (s) => s !== navSection && s.dataset.toggledSection,
  );
  const mainSections = allSections.filter(
    (s) => s !== navSection && !s.dataset.toggledSection,
  );

  // Ensure toggled sections are hidden
  hiddenSections.forEach((s) => { s.style.display = 'none'; });

  // Find which section contains a heading matching a target
  function findSectionByHeadingId(id) {
    const heading = mainEl.querySelector(`#${CSS.escape(id)}`);
    if (!heading) return null;
    return heading.closest('.section');
  }

  // Handle nav clicks
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();

    const { target } = a.dataset;

    // Update active state
    nav.querySelectorAll('a').forEach((link) => link.classList.remove('active'));
    a.classList.add('active');

    if (target === 'home') {
      // Show main sections, hide toggled sections
      mainSections.forEach((s) => { s.style.display = ''; });
      hiddenSections.forEach((s) => { s.style.display = 'none'; });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Hide all sections except the target and nav
      allSections.forEach((s) => {
        if (s === navSection) return;
        s.style.display = 'none';
      });

      // Show target section
      const targetSection = findSectionByHeadingId(target);
      if (targetSection) {
        targetSection.style.display = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  });

  // Set "Home" as active by default
  const homeLink = nav.querySelector('a[data-target="home"]');
  if (homeLink) homeLink.classList.add('active');
}
