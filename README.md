# Purana Qila: Technical Writing & Memorial Survey Report

An interactive, heritage-inspired React website presenting a technical report on **Purana Qila, Delhi**, developed as part of the JHS-302 Technical Writing project for CSE-1 at JSS University, Noida.

The project documents the historical and architectural significance of Purana Qila while comparing information available from online sources with observations from the site visit and public perceptions gathered through a memorial survey. It combines technical report writing, survey-based analysis, photographic documentation, and an interactive web presentation.

## Project Overview

- **Project Title:** Purana Qila — Memorial Survey Report
- **Course:** JHS-302 Technical Writing
- **Department:** Computer Science and Engineering (CSE-1)
- **Institution:** JSS University, Noida
- **Site Visit Date:** 22 October 2026
- **Project Type:** Technical Report and Survey-Based Website

## Key Features

- **Structured Technical Report:** Organised into 12 main sections, followed by Appendices A–C.
- **Memorial Survey:** Presents survey questions, responses, and findings concerning visitors' perceptions and understanding of Purana Qila.
- **Historical and Architectural Documentation:** Explores the monument's background, architectural features, preservation, and cultural significance.
- **Comparative Analysis:** Examines documented historical information alongside site observations and public perceptions.
- **Photographic Documentation:** Includes 21 photographs covering the report's cover, figures, and supporting documentation.
- **Heritage-Inspired Design:** Uses traditional Indian visual motifs, including jaali lattice patterns, mandala elements, and decorative corner flourishes.
- **Typography:** Combines Marcellus, Spectral, Caveat, Playfair Display, and Tiro Devanagari Hindi for an editorial, heritage-focused aesthetic.
- **Standalone Build:** Generates a single HTML file that can be opened directly in a browser.

## Technology Stack

- **React** — Component-based user interface
- **Vite** — Development server and build tooling
- **JavaScript** — Report content and application logic
- **CSS** — Responsive styling, typography, and decorative motifs
- **Google Fonts** — Custom typography with offline fallback fonts

## Project Structure

```text
purana-qila-website/
├── src/
│   ├── report.js          # Report text and survey data
│   ├── Report.jsx         # Report sections 1–12 and Appendices A–C
│   ├── data.js            # Cover details and group information
│   ├── photos.js          # Photograph references
│   ├── photos/            # 21 project photographs
│   └── styles.css         # Theme, layout, and visual styling
├── dist/
│   └── index.html         # Production build output
├── purana-qila-website-built.html
├── index.html
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm before running the project.

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd purana-qila-website
npm install
```

Replace `<repository-url>` with the actual Git repository URL.

### Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal to view the website.

### Build for Production

```bash
npm run build
```

The production build is generated in the `dist/` directory. The project is configured to produce a single-file HTML output.

### Open the Standalone Website

Open `purana-qila-website-built.html` in a modern web browser to view the prebuilt website without starting the development server.

## Editing the Report

The project separates report content from presentation to make updates easier.

| File | Purpose |
|---|---|
| `src/report.js` | Edit report text, survey figures, and findings |
| `src/Report.jsx` | Modify report sections, headings, and structure |
| `src/data.js` | Update cover details and group information |
| `src/photos.js` | Update photograph references |
| `src/photos/` | Replace or add project photographs |
| `src/styles.css` | Customise the theme, typography, layout, and decorative elements |

After changing the source files, run the production build again to regenerate the website.

## Research Methodology

The project follows a documentation-oriented approach incorporating:

1. **Secondary Research:** Reviewing available historical and architectural information about Purana Qila.
2. **Site Visit:** Recording observations during the visit on 22 October 2026.
3. **Photographic Documentation:** Using photographs to support observations and report findings.
4. **Memorial Survey:** Gathering or presenting survey responses about public awareness, visitor impressions, and perceptions of heritage conservation.
5. **Comparative Analysis:** Comparing published information, site observations, and survey findings.
6. **Recommendations:** Identifying opportunities to improve heritage awareness, visitor understanding, and preservation efforts.

*Survey results should be interpreted according to the actual data collected. Any hypothetical or illustrative responses used for demonstration must be clearly identified as such.*

## Design Philosophy

The website combines the structure of an academic technical report with the visual character of Indian architectural heritage. Its restrained editorial typography, traditional decorative motifs, and photographic content aim to create an engaging presentation without compromising readability or the report's academic purpose.

## Academic Purpose

This project demonstrates the application of technical writing principles, structured documentation, research organisation, survey interpretation, and web-based presentation. It also explores how digital interfaces can make historical and cultural research more accessible.

## License

This project was developed for academic purposes as part of the JHS-302 Technical Writing coursework at JSS University, Noida.

Historical content, photographs, and other third-party materials remain subject to their respective sources and usage rights.
