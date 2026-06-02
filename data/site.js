/* ============================================================================
 *  SITE SETTINGS  —  edit this file to change site-wide text and navigation
 * ============================================================================
 *
 *  Everything that appears in the header, footer, and the home-page intro is
 *  set here, so you rarely need to touch the HTML files.
 * ------------------------------------------------------------------------- */

window.POLMETH_SITE = {
  /* The wordmark shown top-left, split into two parts for styling. */
  brand: { line1: "PolMeth", line2: "Europe" },

  /* Short tagline used in the footer and page metadata. */
  tagline: "The European Political Methodology Meeting",

  /* Contact details (used on the Contact page and in the footer). */
  contact: {
    email: "",                       // e.g. "info@polmeth.eu" — "" to hide
    twitter: "",                     // e.g. "https://x.com/..." — "" to hide
    twitterHandle: ""                // e.g. "@PolMethEurope"
  },

  /* The main navigation. Order = display order. Add/remove freely.
     "page" must match a value passed to PolMeth.init({ page: "..." }) at the
     bottom of each HTML file, so the current page is highlighted. */
  nav: [
    { label: "About",                href: "about.html",       page: "about" },
    { label: "Committee",            href: "committee.html",   page: "committee" },
    { label: "2026 Meeting",         href: "conference.html",  page: "conference" },
    { label: "Previous Conferences", href: "conferences.html", page: "conferences" },
    { label: "Contact",              href: "contact.html",     page: "contact" }
  ],

  /* Footer copyright line; the year is appended automatically. */
  copyright: "PolMeth Europe"
};
