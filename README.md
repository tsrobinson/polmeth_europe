# PolMeth Europe — website

A clean, static website for PolMeth Europe. There is **no build step and nothing to
install**: it's plain HTML, one CSS file, and a little JavaScript. The content you'll
change most often (committee members, the conference list, site-wide text) lives in
small data files you edit by hand.

## View it locally

Just double-click **`index.html`** to open it in your browser. That's it.

> If your browser ever refuses to load the data files from a `file://` URL, run a tiny
> local server from this folder instead and open <http://localhost:8000>:
> ```bash
> python3 -m http.server 8000
> ```

## Edit the content (the common stuff)

Everything you'll routinely update is in the **`data/`** folder. Open a file in any text
editor, follow the comments at the top, save, and refresh the page.

| To change… | Edit this file |
|---|---|
| Site name, tagline, navigation menu, footer contact/email | `data/site.js` |
| Steering committee members (name, role, affiliation, photo) | `data/committee.js` |
| The list of conferences (past + upcoming, with programme links) | `data/conferences.js` |

Each file has instructions and a copy-and-edit template at the top. A few examples:

- **Add a conference:** copy one `{ … }` block in `data/conferences.js`, change the
  fields, and set its `status` to `"upcoming"` or `"past"`. The newest one with
  `status: "upcoming"` automatically becomes the “next meeting” shown on the home page.
- **Add a committee member:** copy one `{ … }` block in `data/committee.js`. If you don't
  add a `photo`, the site shows tidy initials instead, so the page still looks complete.
- **Some conference details are marked “to be confirmed.”** They were gathered from public
  sources — please verify them and remove the `verify: true` line in `data/conferences.js`.

## Edit a whole page

The pages themselves are the `.html` files in this folder:

| File | Page |
|---|---|
| `index.html` | Home (title + the three highlight columns) |
| `about.html` | About |
| `conference.html` | The current (2026) meeting — update this each year |
| `committee.html` | Steering committee (content comes from `data/committee.js`) |
| `conferences.html` | Previous conferences (content comes from `data/conferences.js`) |
| `contact.html` | Contact |

The bar at the top and the footer are the same on every page; they're generated
from `data/site.js`, so you change them in one place.

**Programme PDFs** live in `data/programs/` (e.g. `program-2025.pdf`). To link one from a
conference, set its `programme` field in `data/conferences.js` to a **relative** path such
as `data/programs/program-2025.pdf` — note: no leading `/`, or the link will break on
GitHub Pages.

## Restyle it

All colours, fonts, and spacing are defined as variables at the top of
`assets/css/style.css` (the `:root { … }` block). Change them there to restyle the whole
site at once. To switch to elegant web fonts, uncomment the Google Fonts `<link>` in each
page's `<head>` and set `--font-head` / `--font-body` in the stylesheet.

## Put it online (free)

Any static host works. Two easy options:

- **GitHub Pages:** create a repository, upload these files, then in
  *Settings → Pages* choose the `main` branch / root. Your site appears at
  `https://<user>.github.io/<repo>/` (or your custom domain, e.g. `polmeth.eu`).
- **Netlify:** drag this folder onto <https://app.netlify.com/drop>.

To use the `polmeth.eu` domain, point its DNS at your host and set the custom domain in
the host's settings.

## Folder layout

```
polmeth_web/
├── index.html      about.html        conference.html
├── committee.html  conferences.html  contact.html
├── assets/
│   ├── css/style.css        ← all styling (palette/fonts at the top)
│   ├── js/site.js           ← shared logic (rarely needs editing)
│   └── img/favicon.svg
├── data/
│   ├── site.js              ← site name, menu, footer
│   ├── committee.js         ← steering committee
│   ├── conferences.js       ← list of meetings
│   └── programs/            ← programme PDFs (program-2025.pdf, …)
└── README.md
```
