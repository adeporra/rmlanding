/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed block (Google Maps)
 *
 * Source: https://www.realmadrid.com/StaticFiles/RealMadrid/landings/torneo_frm/index.html
 * Base Block: embed
 *
 * Block Structure (from markdown example):
 * - Row 1: URL to embed
 *
 * Source HTML Pattern (from captured DOM):
 * <div id="comollegar">
 *   <div>
 *     <iframe src="https://maps.google.com/maps?...">
 *     </iframe>
 *   </div>
 * </div>
 *
 * Generated: 2026-02-17
 */
export default function parse(element, { document }) {
  // Extract iframe src URL
  // VALIDATED: Found <iframe src="https://maps.google.com/maps?..."> in captured DOM (line 104)
  // The element passed here is the iframe itself (matched by selector "div#comollegar iframe")
  let embedUrl = '';

  if (element.tagName === 'IFRAME') {
    // Direct iframe match
    embedUrl = element.getAttribute('src') || '';
  } else {
    // Container match - look for iframe inside
    const iframe = element.querySelector('iframe');
    if (iframe) {
      embedUrl = iframe.getAttribute('src') || '';
    }
  }

  // Build cells array matching Embed block markdown structure
  const cells = [];

  // Row 1: Embed URL as a link
  if (embedUrl) {
    const link = document.createElement('a');
    link.href = embedUrl;
    link.textContent = embedUrl;
    cells.push([link]);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Embed', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
