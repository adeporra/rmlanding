/**
 * loads and decorates the cover block
 * @param {Element} block The cover block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const content = document.createElement('div');
  content.className = 'cover-content';

  rows.forEach((row, i) => {
    const cell = row.querySelector('div');
    if (!cell) return;
    const text = cell.textContent.trim();
    if (!text) return;

    if (i === 0) {
      // First row: eyebrow / tagline
      const eyebrow = document.createElement('p');
      eyebrow.className = 'cover-eyebrow';
      eyebrow.textContent = text;
      content.append(eyebrow);
    } else if (i === 1) {
      // Second row: main heading
      const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        content.append(heading);
      } else {
        const h1 = document.createElement('h1');
        h1.textContent = text;
        content.append(h1);
      }
    } else if (i === 2) {
      // Third row: badge / label
      const badge = document.createElement('div');
      badge.className = 'cover-badge';
      badge.textContent = text;
      content.append(badge);
    }
  });

  block.append(content);
}
