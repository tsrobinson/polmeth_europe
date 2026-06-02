/* ============================================================================
 *  CONFERENCES  —  edit this file to add or change meetings
 * ============================================================================
 *
 *  This is the single source of truth for the "Conferences" page and the
 *  "next conference" links elsewhere on the site.  To add a meeting, copy one
 *  block below, change the fields, and save. No other steps are required.
 *
 *  Fields:
 *    number       Roman numeral or label shown as the edition (e.g. "VI").
 *    year         Numeric year (used for sorting — newest first).
 *    title        Full meeting name.
 *    host         Hosting institution(s).
 *    city         City and country.
 *    dates        Human-readable dates (free text).
 *    status       "upcoming" or "past".  Exactly one entry should be "upcoming".
 *    summary      One or two sentences describing the meeting (optional).
 *    website      URL to the meeting's own site (optional, "" to hide).
 *    programme    URL to the programme / schedule PDF (optional, "" to hide).
 *    cfp          URL to the call for papers (optional, "" to hide).
 *    verify       OPTIONAL: set to true while details are unconfirmed; shows a
 *                 small "details to be confirmed" note. Delete the line once set.
 *
 *  NOTE FOR THE EDITOR: a few historical details below were gathered from public
 *  sources and are marked `verify: true`. Please confirm/correct them and then
 *  remove the `verify` line.
 * ------------------------------------------------------------------------- */

window.POLMETH_CONFERENCES = [
  {
    number: "V",
    year: 2026,
    title: "PolMeth Europe 2026",
    host: "Trinity College Dublin",
    city: "Dublin, Ireland",
    dates: "14–15 May 2026",
    status: "past",
    summary:
      "",
    website: "",
    programme: "data/programs/program-2026.pdf",
    cfp: "data/programs/cfp-2026.pdf"
  },
  {
    number: "IV",
    year: 2025,
    title: "PolMeth Europe 2025",
    host: "London School of Economics and Political Science",
    city: "London, United Kingdom",
    dates: "7-8 April 2025",
    status: "past",
    summary: "",
    website: "",
    programme: "data/programs/program-2025.pdf",
    cfp: "data/programs/cfp-2025.pdf",
  },
  {
    number: "III",
    year: 2023,
    title: "PolMeth Europe 2023",
    host: "King's College London",
    city: "London",
    dates: "19-20 June 2023",
    status: "past",
    summary: "",
    website: "",
    programme: "data/programs/program-2023.pdf",
    cfp: "",
  },
  {
    number: "II",
    year: 2022,
    title: "PolMeth Europe 2022",
    host: "University of Hamburg",
    city: "Hamburg, Germany",
    dates: "11–12 March 2022",
    status: "past",
    summary:
      "",
    website: "https://www.wiso.uni-hamburg.de/en/fachbereich-sowi/professuren/troeger/events/polmeth-europe/2022.html",
    programme: "data/programs/program-2022.pdf",
    cfp: "",
  },
  {
    number: "I",
    year: 2021,
    title: "PolMeth Europe 2021",
    host: "University of Hamburg",
    city: "Hamburg, Germany",
    dates: "March 2021",
    status: "past",
    summary: "The inaugural PolMeth Europe meeting, held online.",
    website: "https://www.wiso.uni-hamburg.de/en/fachbereich-sowi/professuren/troeger/events/polmeth-europe/2021.html",
    programme: "data/programs/program-2021.pdf",
    cfp: "",
  }
];
