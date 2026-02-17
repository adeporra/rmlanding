/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Real Madrid Foundation tournament page cleanup
 * Purpose: Remove navigation, SVG decorations, and non-content elements
 * Applies to: www.realmadrid.com/StaticFiles/RealMadrid/landings/torneo_frm/
 * Generated: 2026-02-17
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (cleaned.html)
 * - Source: nav.menu, div.svg1, class="oculto" sections
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove navigation menu
    // EXTRACTED: Found <nav class="menu"> in captured DOM (line 3)
    WebImporter.DOMUtils.remove(element, [
      'nav.menu',
    ]);

    // Remove SVG decorative animations between sections
    // EXTRACTED: Found <div class="svg1"> containing inline SVG in captured DOM (lines 75-76, 97-98)
    WebImporter.DOMUtils.remove(element, [
      'div.svg1',
    ]);

    // Remove hidden sections class to make content accessible
    // EXTRACTED: Found class="oculto" on section elements in original source
    const hiddenSections = element.querySelectorAll('.oculto');
    hiddenSections.forEach((section) => {
      section.classList.remove('oculto');
    });
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining iframes (Google Maps handled by embed parser)
    // Standard HTML elements - safe to remove after parsing
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link',
    ]);

    // Remove data:image SVG icons from navigation (base64 encoded)
    // EXTRACTED: Found img[src^="data:image/svg+xml"] in nav menu items
    const svgDataImages = element.querySelectorAll('img[src^="data:image/svg+xml"]');
    svgDataImages.forEach((img) => {
      img.remove();
    });
  }
}
