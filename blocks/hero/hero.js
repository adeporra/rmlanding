/**
 * loads and decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // Row 1: background image
  const bgRow = rows[0];
  const bgPicture = bgRow.querySelector('picture');

  // Row 2: content (title + optional logo)
  const contentRow = rows[1];
  const contentDiv = contentRow.querySelector('div > div') || contentRow.firstElementChild;

  // Build hero structure
  block.textContent = '';

  // Add background image
  if (bgPicture) {
    block.append(bgPicture);
  }

  // Process content - the pipeline renders "# Heading" as literal text
  if (contentDiv) {
    const container = document.createElement('div');
    container.className = 'hero-content';

    // Check if content has literal markdown heading (# text)
    const textContent = contentDiv.textContent.trim();
    const pictures = [...contentDiv.querySelectorAll('picture')];

    if (textContent.startsWith('#')) {
      // Extract heading text (remove # prefix)
      const headingText = textContent.replace(/^#+\s*/, '').trim();
      // Remove picture alt text from heading
      let cleanHeading = headingText;
      pictures.forEach((pic) => {
        const img = pic.querySelector('img');
        if (img?.alt) {
          cleanHeading = cleanHeading.replace(img.alt, '').trim();
        }
      });

      const h1 = document.createElement('h1');
      h1.textContent = cleanHeading;
      container.append(h1);
    } else {
      // Content already has proper HTML elements
      const h1 = contentDiv.querySelector('h1');
      if (h1) container.append(h1);
    }

    // Add any pictures (like logo/crest) from content row
    pictures.forEach((pic) => {
      const img = pic.querySelector('img');
      if (img && img.alt) {
        const alt = img.alt.toLowerCase();
        if (alt.includes('logo') || alt.includes('escudo') || alt.includes('crest') || alt.includes('badge')) {
          pic.className = 'hero-logo';
        }
      }
      container.append(pic);
    });

    block.append(container);
  }
}
