import React, { useEffect, useState } from 'react';
import { META } from './data.js';
import Home from './Home.jsx';
import Report from './Report.jsx';
import { FortSketch } from './art.jsx';

const NAV = [['abstract', 'Abstract'], ['intro', 'Intro'], ['method', 'Method'], ['timeline', 'History'], ['architecture', 'Architecture'], ['archaeology', 'Archaeology'], ['indraprastha', 'Indraprastha'], ['claims', 'Claims'], ['visit', 'Visit'], ['survey', 'Survey'], ['findings', 'Findings'], ['advice', 'Advice'], ['references', 'References'], ['appA', 'Appendices']];

export default function App() {
  const [cur, setCur] = useState('abstract');
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); setCur(e.target.id); } }),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    document.querySelectorAll('.card').forEach((el) => io.observe(el));
    const sc = () => setPct((window.scrollY / (document.body.scrollHeight - innerHeight)) * 100);
    addEventListener('scroll', sc, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', sc); };
  }, []);
  return (
    <>
      <Home />
      <header className="topbar">
        <a className="brand" href="#top">Purana Qila</a>
        <nav aria-label="Report sections">
          {NAV.map(([id, t]) => <a key={id} href={`#${id}`} aria-current={cur === id ? 'true' : undefined}>{t}</a>)}
        </nav>
        <span className="progress" style={{ width: `${pct}%` }} />
      </header>
      <main id="main"><Report /></main>
      <footer className="foot">
        <FortSketch className="sketch" />
        <h2>Thank You</h2>
        <p className="script">Heritage is not just what we inherit, but what we give to the future.</p>
        <p className="small">{META.group.join(' · ')}</p>
        <p className="small">{META.course} · {META.inst} · Submitted to {META.to}</p>
      </footer>
    </>
  );
}
