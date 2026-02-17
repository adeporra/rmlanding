/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero block
 *
 * Source: https://www.realmadrid.com/StaticFiles/RealMadrid/landings/torneo_frm/index.html
 * Base Block: hero
 *
 * Block Structure (from markdown example):
 * - Row 1: Background image
 * - Row 2: Title heading + logo image
 *
 * Source HTML Pattern (from captured DOM):
 * <div class="principal visible">
 *   <section id="home">
 *     <img src="...piernas.jpg">  <!-- background image -->
 *   </section>
 *   <div id="hero">
 *     <div>
 *       <h1 class="p1">Torneo FRM 25-26</h1>
 *       <img src="...logofrm.png" alt="escudo FRM">  <!-- logo -->
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-02-17
 */
export default function parse(element, { document }) {
  // Extract background image from section#home
  // VALIDATED: Found <section id="home"><img src="..."> in captured DOM (line 50-52)
  const bgImage = element.querySelector('section#home > img') ||
                  element.querySelector('section#home img') ||
                  element.querySelector(':scope > img');

  // Extract title heading
  // VALIDATED: Found <h1 class="p1">Torneo FRM 25-26</h1> in captured DOM (line 55)
  const heading = element.querySelector('div#hero h1') ||
                  element.querySelector('h1.p1') ||
                  element.querySelector('h1');

  // Extract logo image
  // VALIDATED: Found <img alt="escudo FRM"> in div#hero in captured DOM (line 56)
  const logo = element.querySelector('div#hero img[alt]') ||
               element.querySelector('div#hero img:not([src^="data:"])');

  // Build cells array matching Hero block markdown structure
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content (heading + logo combined)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (logo) contentCell.push(logo);
  cells.push(contentCell);

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
