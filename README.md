# Purana Qila: Technical Report website

React + Vite site for the JHS-302 Technical Writing report on Purana Qila (CSE-1, JSS University, Noida).

```bash
npm install
npm run dev     # local dev server
npm run build   # one self-contained file at dist/index.html
```

- `src/report.js`: all report text and survey numbers. Edit here to change content.
- `src/Report.jsx`: sections 1–12 and Appendices A–C, following the Final PDF report.
- `src/data.js`: cover details and group names. `src/photos.js` and `src/photos/`: all 21 photographs (f0–f5 = Cover and Figures 1–5; d01–d15 = D1–D15).
- `src/styles.css`: theme, including the background motifs (jaali lattice, mandala, corner flourishes) at the end of the file.
- `purana-qila-website-built.html`: the finished single-file site, open it directly in a browser.

Fonts (Marcellus, Spectral, Caveat, Playfair Display, Tiro Devanagari Hindi) load from Google Fonts and fall back to Georgia offline.
