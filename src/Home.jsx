import React from 'react';
import { META } from './data.js';
import { P } from './photos.js';
import { Lotus } from './art.jsx';

const D = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  pin: 'M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  book: 'M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1zM12 6v14',
  bars: 'M5 20v-6M10 20V8M15 20v-9M20 20V5',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z',
  image: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M16 9.5h.01',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-6 8-6s8 2 8 6',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5',
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7',
  cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  clip: 'M8 4h8v3H8zM6 5h12v16H6zM9 12h6M9 16h6',
  layers: 'M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5',
  people: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20c0-3.5 3-5.5 7-5.5M17 11a3 3 0 1 0 0-6M15.5 14.5c4 0 6.5 2 6.5 5.5',
  map: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14',
};
const Ic = ({ n }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={D[n]} /></svg>
);
const SIDE = [['home', 'Home', '#top'], ['book', 'Abstract', '#abstract'], ['pin', 'History', '#timeline'], ['bars', 'Claim audit', '#claims'], ['image', 'Gallery', '#gallery'], ['bulb', 'Survey', '#survey']];
const TOP = [['Home', '#top'], ['Abstract', '#abstract'], ['Claims', '#claims'], ['Survey', '#survey'], ['Gallery', '#gallery']];
const STAT = [['people', '2 of 6', 'members visited the site'], ['clip', '12', 'public claims audited'], ['layers', '9', 'cultural levels reported'], ['bars', '20', 'visitors surveyed'], ['map', '1533', 'Din Panah founded']];

export default function Home() {
  return (
    <div className="sheet" id="top">
      <svg width="0" height="0" aria-hidden="true"><clipPath id="hmArch" clipPathUnits="objectBoundingBox"><path d="M0,1V.34Q0,.24 .1,.21C.2,.17 .3,.1 .4,.05Q.5,-.01 .6,.05C.7,.1 .8,.17 .9,.21Q1,.24 1,.34V1Z" /></clipPath></svg>
      <header className="hm-top">
        <svg className="hm-logo" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 36V16l14-9 14 9v20M13 36V22a7 7 0 0 1 14 0v14M2 36h36M20 7V3" fill="none" stroke="#7b1e1a" strokeWidth="2" /></svg>
        <span className="hm-brand">Technical research report</span><span className="hm-rule" />
        <nav aria-label="Home sections">{TOP.map(([t, h], i) => <a key={t} href={h} aria-current={i === 0 ? 'page' : undefined}>{t}</a>)}</nav>
        <Lotus className="hm-lotus" color="#b4552d" />
        <span className="hm-pill">Heritage <i>•</i> History <i>•</i> Culture</span>
      </header>
      <div className="hm-body">
        <aside className="hm-side" aria-label="Page sections">
          <svg className="hm-niche" viewBox="0 0 100 60" aria-hidden="true"><path d="M8 60V40Q8 30 24 26 40 20 50 4 60 20 76 26 92 30 92 40V60" fill="none" stroke="#c9a56a" strokeWidth="1.5" /></svg>
          {SIDE.map(([i, t, h], n) => <a key={t} href={h} aria-current={n === 0 ? 'page' : undefined}><Ic n={i} /><span>{t}</span></a>)}
        </aside>
        <div className="hm-main">
          <section className="hm-hero">
            <div className="hm-copy">
              <p className="hm-kick"><b>◆</b> Historical site <b>◆</b></p>
              <h1>Purana Qila</h1>
              <p className="hm-deva" lang="hi">पुराना किला</p>
              <p className="hm-sub">Historical Development, Architecture, Archaeological Evidence, and Heritage Interpretation</p>
              <p className="hm-script">Where the past still lives…</p>
              <dl className="hm-id">
                <div><Ic n="user" /><dt>Submitted to</dt><dd>{META.to}</dd></div>
                <div><Ic n="cap" /><dt>Course</dt><dd>{META.course}</dd></div>
                <div><Ic n="cal" /><dt>Site visit</dt><dd>{META.visit}</dd></div>
                <div><Ic n="doc" /><dt>Institution</dt><dd>{META.inst}</dd></div>
              </dl>
              <a className="hm-cta" href="#claims">Explore the claim audit <span aria-hidden="true">→</span></a>
            </div>
            <figure className="hm-photo">
              <div className="hm-frame">
                <img src={P.f1.src} alt="The main gateway of Purana Qila with flanking bastions, photographed on the site visit" />
                <svg viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true"><path vectorEffect="non-scaling-stroke" d="M0,1V.34Q0,.24 .1,.21C.2,.17 .3,.1 .4,.05Q.5,-.01 .6,.05C.7,.1 .8,.17 .9,.21Q1,.24 1,.34V1" /></svg>
              </div>
              <Lotus className="hm-fl a" color="#b4552d" /><Lotus className="hm-fl b" color="#b4552d" />
              <figcaption className="hm-tag"><b>Purana Qila</b><span><Ic n="pin" /> Delhi</span></figcaption>
            </figure>
          </section>
          <ul className="hm-stats">
            {STAT.map(([i, n, t]) => <li key={t}><span className="hm-badge"><Ic n={i} /></span><div><b>{n}</b><span>{t}</span></div></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
