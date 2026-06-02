/* ============================================================================
 *  PolMeth Europe — shared site script
 *  --------------------------------------------------------------------------
 *  Builds the header and footer from data/site.js, highlights the current
 *  page, runs the mobile menu, and renders the committee / conference lists
 *  from their data files. You normally never need to edit this file —
 *  change content in the data/ folder instead.
 * ========================================================================== */
(function () {
  "use strict";

  var SITE = window.POLMETH_SITE || {};

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(sel) { return document.querySelector(sel); }

  /* ----------------------------- Header ---------------------------------- */
  function buildHeader(currentPage) {
    var navLinks = (SITE.nav || []).map(function (n) {
      var active = n.page === currentPage ? " active" : "";
      return '<a class="navlink' + active + '" href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
    }).join("");

    var brand = SITE.brand || { line1: "PolMeth", line2: "Europe" };

    return '' +
      '<div class="container">' +
        '<a class="brand" href="index.html" aria-label="' + esc(brand.line1 + " " + brand.line2) + ' home">' +
          '<span class="b1">' + esc(brand.line1) + '</span>' +
          '<span class="b2">' + esc(brand.line2) + '</span>' +
        '</a>' +
        '<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
        '</button>' +
        '<nav class="nav" id="primary-nav">' + navLinks + '</nav>' +
      '</div>';
  }

  /* ----------------------------- Footer ---------------------------------- */
  function buildFooter() {
    var brand = SITE.brand || { line1: "PolMeth", line2: "Europe" };
    var c = SITE.contact || {};
    var year = new Date().getFullYear();

    var navLinks = (SITE.nav || []).map(function (n) {
      return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
    }).join("");

    var contactBits = [];
    if (c.email) contactBits.push('<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>");
    if (c.twitter) contactBits.push('<a href="' + esc(c.twitter) + '" rel="noopener">' + esc(c.twitterHandle || "Twitter / X") + "</a>");

    return '' +
      '<div class="container">' +
        '<div class="cols">' +
          '<div>' +
            '<div><span class="b1">' + esc(brand.line1) + '</span> <span class="b2">' + esc(brand.line2) + '</span></div>' +
            '<p style="max-width:34ch;margin:.4rem 0 0">' + esc(SITE.tagline || "") + '</p>' +
            (contactBits.length ? '<p style="margin:.8rem 0 0">' + contactBits.join(" &nbsp;·&nbsp; ") + "</p>" : "") +
          '</div>' +
          '<nav aria-label="Footer">' + navLinks + '</nav>' +
        '</div>' +
        '<div class="legal">© ' + esc(year) + ' ' + esc(SITE.copyright || (brand.line1 + " " + brand.line2)) + '. All rights reserved.</div>' +
      '</div>';
  }

  /* --------------------------- Mobile menu ------------------------------- */
  function wireMenu() {
    var btn = el(".nav-toggle"), nav = el("#primary-nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* -------------------------- Conferences -------------------------------- */
  function sortedConferences() {
    return (window.POLMETH_CONFERENCES || []).slice().sort(function (a, b) {
      return (b.year || 0) - (a.year || 0);
    });
  }

  function confLinks(c) {
    var arrow = '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    var bits = [];
    if (c.website)   bits.push('<a href="' + esc(c.website) + '" rel="noopener">Conference website ' + arrow + "</a>");
    if (c.programme) bits.push('<a href="' + esc(c.programme) + '" rel="noopener">Programme (PDF) ' + arrow + "</a>");
    if (c.cfp)       bits.push('<a href="' + esc(c.cfp) + '" rel="noopener">Call for papers ' + arrow + "</a>");
    return bits.length ? '<div class="links">' + bits.join("") + "</div>" : "";
  }

  function confCard(c) {
    var upcoming = c.status === "upcoming";
    var badge = upcoming
      ? '<span class="badge">Upcoming</span>'
      : '<span class="badge badge-past">' + esc(c.year) + "</span>";
    var whereParts = [];
    if (c.host) whereParts.push("<strong>" + esc(c.host) + "</strong>");
    if (c.city) whereParts.push(esc(c.city));
    if (c.dates) whereParts.push(esc(c.dates));
    return '' +
      '<article class="conf' + (upcoming ? " upcoming" : "") + '">' +
        '<div class="edition">' + esc(c.number || "") + "</div>" +
        '<div class="meta">' +
          "<h3>" + esc(c.title || "") + badge + "</h3>" +
          (whereParts.length ? '<p class="where">' + whereParts.join(" · ") + "</p>" : "") +
          (c.summary ? "<p>" + esc(c.summary) + "</p>" : "") +
          confLinks(c) +
          (c.verify ? '<p class="verify-note">Details to be confirmed.</p>' : "") +
        "</div>" +
      "</article>";
  }

  function renderConferences(sel) {
    var host = el(sel); if (!host) return;
    // mode: "past" => only previous meetings (no headings);
    //       "all"  => upcoming + past with section headings (default).
    var mode = host.getAttribute("data-conferences") || "all";
    var all = sortedConferences();
    var upcoming = all.filter(function (c) { return c.status === "upcoming"; });
    var past = all.filter(function (c) { return c.status !== "upcoming"; });

    var html = "";
    if (mode === "past") {
      html = '<div class="conf-list">' + past.map(confCard).join("") + "</div>";
    } else {
      if (upcoming.length) {
        html += '<h2>Upcoming</h2><div class="conf-list">' +
          upcoming.map(confCard).join("") + "</div>";
      }
      if (past.length) {
        html += '<h2 style="margin-top:2.4rem">Past meetings</h2><div class="conf-list">' +
          past.map(confCard).join("") + "</div>";
      }
    }
    host.innerHTML = html;
  }

  /* Renders the "next conference" call-to-action box wherever asked.
     If no conference is marked status:"upcoming", the whole surrounding
     section is hidden so the home page doesn't show an empty band. */
  function renderNextConference(sel) {
    var host = el(sel); if (!host) return;
    var next = sortedConferences().filter(function (c) { return c.status === "upcoming"; })[0];
    if (!next) {
      var section = host.closest ? host.closest(".section") : null;
      (section || host).style.display = "none";
      return;
    }
    var where = [next.city, next.dates].filter(Boolean).join(" · ");
    host.innerHTML = '' +
      '<div>' +
        '<p class="kicker" style="margin-bottom:.4rem">Next meeting</p>' +
        "<h2>" + esc(next.title) + "</h2>" +
        '<p>' + esc(next.host) + (where ? " — " + esc(where) : "") + "</p>" +
      "</div>" +
      '<div class="actions">' +
        '<a class="btn btn-primary" href="conference.html">Conference details</a>' +
        (next.website ? '<a class="btn btn-ghost" href="' + esc(next.website) + '" rel="noopener">Visit site</a>' : "") +
      "</div>";
  }

  /* --------------------------- Committee --------------------------------- */
  // Honorifics to skip so initials come from the actual name
  // (e.g. "Dr Thomas Robinson" -> "TR", "Professor Vera Troeger" -> "VT").
  var TITLES = { dr: 1, prof: 1, professor: 1, mr: 1, mrs: 1, ms: 1, mx: 1,
    miss: 1, sir: 1, dame: 1, rev: 1, hon: 1, "asst": 1, "assoc": 1 };

  function initials(name) {
    var parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    // drop one or more leading honorifics
    while (parts.length > 1 && TITLES[parts[0].toLowerCase().replace(/\./g, "")]) {
      parts.shift();
    }
    if (!parts.length) return "?";
    var first = parts[0][0];
    var last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  function personCard(p) {
    var avatar = p.photo
      ? '<img class="avatar" src="' + esc(p.photo) + '" alt="' + esc(p.name) + '">'
      : '<div class="avatar" aria-hidden="true">' + esc(initials(p.name)) + "</div>";
    var link = p.website
      ? '<a class="link" href="' + esc(p.website) + '" rel="noopener">Website ›</a>'
      : "";
    return '' +
      '<div class="person">' +
        avatar +
        '<div class="name">' + esc(p.name) + "</div>" +
        (p.role ? '<div class="role">' + esc(p.role) + "</div>" : "") +
        (p.affiliation ? '<div class="aff">' + esc(p.affiliation) + "</div>" : "") +
        link +
      "</div>";
  }

  function renderCommittee(sel) {
    var host = el(sel); if (!host) return;
    var people = window.POLMETH_COMMITTEE || [];
    host.innerHTML = people.map(personCard).join("");
  }

  /* ------------------------------- init ---------------------------------- */
  function init(opts) {
    opts = opts || {};
    var header = el("[data-header]");
    if (header) header.innerHTML = buildHeader(opts.page);
    var footer = el("[data-footer]");
    if (footer) footer.innerHTML = buildFooter();
    wireMenu();

    // Render any content regions present on this page.
    if (el("[data-conferences]"))   renderConferences("[data-conferences]");
    if (el("[data-committee]"))     renderCommittee("[data-committee]");
    if (el("[data-next-conf]"))     renderNextConference("[data-next-conf]");
  }

  window.PolMeth = {
    init: init,
    renderConferences: renderConferences,
    renderCommittee: renderCommittee,
    renderNextConference: renderNextConference
  };
})();
