# Matcha Diary

A responsive, illustrated-editorial matcha tasting archive with a searchable card shelf and a live tasting dashboard. Built as a plain static website so it can be hosted free with GitHub Pages.

## Files

- `index.html` — page structure and accessible navigation
- `styles.css` — responsive styling, muted green palette, typography and layout
- `app.js` — search, source filters, sorting, tasting detail dialog and dashboard summaries
- `data.js` — tasting entries (edit this to add matchas)

## Preview locally

Open `index.html` in a modern browser. No build step or package installation is required. Internet access is only used to load the optional Google Fonts; system fallback fonts are included.

## Publish with GitHub Pages

1. Create a new **public** repository on GitHub (for example, `matcha-diary`).
2. Upload the files in this folder to the repository root. Keep `index.html`, `styles.css`, `app.js` and `data.js` together.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish; the URL will appear in Settings → Pages.

## Add a tasting

Open `data.js` and add another object inside `window.MATCHA_ENTRIES`. Keep each `id` unique. Dates use `YYYY-MM-DD`; scores use a 1–5 scale and `enjoyment` uses a 1–10 scale. Example:

```js
{
  id: "matcha-name-2026-10-20",
  name: "Matcha name",
  purchasedFrom: "Shop name",
  location: "City, Country",
  dateTasted: "2026-10-20",
  style: "Latte",
  tastingNotes: ["white chocolate", "fresh greens"],
  notesSummary: "White chocolate · fresh greens",
  thoughts: "My personal impression of this bowl.",
  scores: { umami: 4, sweetness: 3, bitterness: 2, astringency: 2, body: 4 },
  enjoyment: 8,
  preparation: { matchaGrams: 2, waterMl: 20, milkMl: 80, milk: "", method: "Whisked, then added milk" },
  image: "",
  personalTags: ["round", "creamy"],
  roasterNotes: ""
}
```

You can omit unknown fields or leave score fields out; the dashboard will calculate averages from the available scores. `tastingNotes` are flavour/aroma observations, while `thoughts` are your personal response. This mirrors the coffee diary's separation between roaster notes and personal notes.

## Current seed entry

The archive starts with your Kyogoku matcha from Ippodo in Kyoto, tasted on 11 October 2026. Its scores and enjoyment rating are taken from your recorded tasting. The 2 g : 20 ml water : 80 ml milk recipe is included under preparation.

## Notes

- Search matches the matcha name, shop, location, date, style, tasting notes and personal thoughts.
- Entries are newest-first by default. You can switch to oldest-first, highest-rated or name A–Z.
- Dashboard scores and preference tags are calculated from the entries in `data.js`.
- This static version doesn't have an online admin form or cross-device database. To change the archive, edit `data.js` and commit the update to GitHub.
