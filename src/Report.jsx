import React, { useEffect, useState } from 'react';
import * as R from './report.js';
import { BADGE_COLORS } from './data.js';
import { ALL, P } from './photos.js';
import { Badge } from './art.jsx';

const col = (i) => BADGE_COLORS[i % BADGE_COLORS.length];
const Sec = ({ id, n, title, i = 0, children }) => (
  <section id={id} className="card">
    <header className="head"><Badge n={n} color={col(i)} className="badge" /><h2>{title}</h2></header>
    <div className="body">{children}</div>
  </section>
);
const Bar = ({ l, c, pct, hi }) => (
  <div className={`brow${hi ? ' hi' : ''}`}>
    <span>{l}</span>
    <i><u style={{ '--w': `${pct}%` }} /></i>
    <b>{c}<small> · {pct}%</small></b>
  </div>
);
const Table = ({ head, rows, cap }) => (
  <>
    {cap && <h3 className="cap">{cap}</h3>}
    <div className="tablewrap"><table>
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table></div>
  </>
);

function Gallery() {
  const [o, setO] = useState(null);
  useEffect(() => {
    if (o === null) return;
    const k = (e) => {
      if (e.key === 'Escape') setO(null);
      if (e.key === 'ArrowRight') setO((i) => (i + 1) % ALL.length);
      if (e.key === 'ArrowLeft') setO((i) => (i + ALL.length - 1) % ALL.length);
    };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [o]);
  const p = o === null ? null : ALL[o];
  const grid = (set, id) => (
    <div className="pgrid" id={id}>
      {ALL.map((x, i) => x.set !== set ? null : (
        <figure key={x.id}>
          <button type="button" onClick={() => setO(i)} aria-label={`Enlarge ${x.fig}: ${x.t}`}>
            <img src={x.src} alt={`${x.t}. ${x.cap}`} loading="lazy" style={{ objectPosition: x.pos }} />
          </button>
          <figcaption><b>{x.fig}.</b> {x.t}</figcaption>
        </figure>
      ))}
    </div>
  );
  return (
    <>
      {grid('f', 'gallery')}
      <h3 className="cap" style={{ marginTop: '1.6rem' }}>Further photographs from the visit (D1–D15)</h3>
      {grid('d', 'photolog')}
      {p && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={p.t} onClick={() => setO(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={p.src} alt={`${p.t}. ${p.cap}`} />
            <figcaption><b>{p.fig}. {p.t}.</b> {p.cap} <i>Taken by the visiting members, 22 October 2026.</i></figcaption>
            <div className="lbn">
              <button type="button" onClick={() => setO((o + ALL.length - 1) % ALL.length)}>Previous</button>
              <button type="button" onClick={() => setO(null)} autoFocus>Close</button>
              <button type="button" onClick={() => setO((o + 1) % ALL.length)}>Next</button>
            </div>
          </figure>
        </div>
      )}
    </>
  );
}

export default function Report() {
  const [t, setT] = useState(0);
  const [f, setF] = useState('All');
  const [s, setS] = useState(0);
  const cur = R.TIMELINE[t], [kn, kc] = R.KINDS[cur.k];
  const claims = R.CLAIMS.filter((c) => f === 'All' || c[3] === f);
  const sv = R.SURVEY[s];
  return (
    <>
      <Sec id="abstract" n="✦" title="Abstract" i={0}>
        {R.ABSTRACT.map((p) => <p key={p}>{p}</p>)}
        <p className="kw">{R.KEYWORDS.map((k) => <span key={k}>{k}</span>)}</p>
        <div className="glance">{R.GLANCE.map(([a, b]) => <div key={a}><h4>{a}</h4><p>{b}</p></div>)}</div>
      </Sec>

      <Sec id="intro" n="1" title="Introduction" i={1}>
        {R.INTRO.map((p) => <p key={p}>{p}</p>)}
        <h3 className="cap">1.1 Scope</h3>
        <p>{R.SCOPE}</p>
        <h3 className="cap">1.2 Research questions</h3>
        <ol className="rq">{R.QUESTIONS.map((q) => <li key={q}>{q}</li>)}</ol>
      </Sec>

      <Sec id="method" n="2" title="Methodology and source evaluation" i={2}>
        <h3 className="cap">2.1 Research design</h3>
        <p>{R.DESIGN}</p>
        <h3 className="cap">2.2 Evidence hierarchy</h3>
        <div className="hier">{R.HIERARCHY.map(([a, b], i) => <div key={a} style={{ '--w': `${100 - i * 11}%` }}><b>{a}</b><span>{b}</span></div>)}</div>
        <h3 className="cap">2.3 Verification procedure</h3>
        <ol className="steps">{R.STEPS.map((x) => <li key={x}>{x}</li>)}</ol>
        <h3 className="cap">2.4 Limitations</h3>
        <p>{R.LIMITS}</p>
      </Sec>

      <Sec id="timeline" n="3" title="Historical development" i={3}>
        <h3 className="cap">3.1 Din Panah, Shergarh, and the sixteenth-century fort</h3>
        {R.HIST_TEXT.map((p) => <p key={p}>{p}</p>)}
        <h3 className="cap">3.2 Later history and Partition</h3>
        <p>{R.PARTITION}</p>
        <h3 className="cap">3.3 Timeline of major phases</h3>
        <div className="chips" role="group" aria-label="Timeline">
          {R.TIMELINE.map((p, i) => <button key={p.y} type="button" aria-pressed={t === i} style={{ '--c': R.KINDS[p.k][1] }} onClick={() => setT(i)}>{p.y}</button>)}
        </div>
        <div className="tcard" style={{ '--c': kc }} aria-live="polite">
          <span className="chip" style={{ '--c': kc }}>{kn}</span>
          <h3>{cur.y}: {cur.t}</h3><p>{cur.b}</p>
        </div>
        <p className="note">Table 1. {R.TIMELINE_NOTE}</p>
      </Sec>

      <Sec id="architecture" n="4" title="Architectural features" i={0}>
        <div className="arc3">
          {R.STRUCTURES.map((a, i) => (
            <article key={a.t}>
              <img src={P[a.p].src} alt={P[a.p].cap} style={{ objectPosition: P[a.p].pos }} loading="lazy" />
              <h3>4.{i + 1} {a.t}</h3><p>{a.b}</p>
            </article>
          ))}
        </div>
        <h3 className="cap">4.4 Archaeological display and visitor interpretation</h3>
        <p>{R.MUSEUM}</p>
      </Sec>

      <Sec id="archaeology" n="5" title="Archaeological evidence and chronology" i={1}>
        <h3 className="cap">5.1 Excavation history</h3>
        {R.EXCAV.map((p) => <p key={p}>{p}</p>)}
        <h3 className="cap">5.2 Reported cultural sequence and finds</h3>
        <p>{R.SEQUENCE}</p>
        <ol className="strata" aria-label="Nine reported cultural levels, newest at the top">
          {R.LEVELS.map(([n, c]) => <li key={n} style={{ background: c }}><b>{n}</b></li>)}
        </ol>
        <p className="note">Nine cultural levels reported by PIB, May 2023. Schematic, not to scale.</p>
        <div className="finds">{R.FINDS.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
        <Table head={['Reported evidence', 'What it can support', 'What it cannot prove by itself']} rows={R.CAN} />
        <h3 className="cap">5.3 The PGW dating discrepancy</h3>
        <p>{R.PGW_TEXT}</p>
        <div className="pgw" role="img" aria-label="Reported PGW dates by source, between about 540 and 1000 BCE">
          {R.PGW.map((p) => (
            <div key={p.s} className="prow">
              <span>{p.s}</span>
              <i>{p.v.map((y) => <u key={y} style={{ left: `${((1100 - y) / 700) * 100}%` }} title={`${y} BCE`}><em>{y}</em></u>)}</i>
              <small>{p.n}</small>
            </div>
          ))}
          <div className="axis"><span>1100 BCE</span><span>900</span><span>700</span><span>500 BCE</span></div>
        </div>
        <p>{R.PGW_NOTE}</p>
        <h3 className="cap">5.4 Why “2,500 years of habitation” needs careful wording</h3>
        <p>{R.HABITATION}</p>
      </Sec>

      <Sec id="indraprastha" n="6" title="The Indraprastha question: evidence versus interpretation" i={2}>
        <p>{R.INDRA_INTRO}</p>
        <p>{R.INDRA_2}</p>
        <div className="ladder">
          {R.LADDER.map(([a, b, c, k], i) => (
            <div key={a} style={{ '--c': k, '--i': i }}>
              <h4>{a}</h4><p className="ex">{b}</p><p><b>Appropriate wording:</b> {c}</p>
            </div>
          ))}
        </div>
        <p>{R.INDRA_END}</p>
        <h3 className="cap">6.1 A source-language problem</h3>
        <p>{R.SOURCE_NOTE}</p>
      </Sec>

      <Sec id="claims" n="7" title="Comparative claim-verification audit" i={3}>
        <div className="chips" role="group" aria-label="Filter claims">
          {['All', ...Object.keys(R.ST)].map((k) => (
            <button key={k} type="button" aria-pressed={f === k} style={{ '--c': R.ST[k] || '#3b2316' }} onClick={() => setF(k)}>
              {k} <i>{k === 'All' ? R.CLAIMS.length : R.CLAIMS.filter((c) => c[3] === k).length}</i>
            </button>
          ))}
        </div>
        <div className="cardgrid">
          {claims.map((c) => (
            <article key={c[0]} className="claim" style={{ '--c': R.ST[c[3]] }}>
              <header><span className="chip" style={{ '--c': R.ST[c[3]] }}>{c[3]}</span></header>
              <h4>{c[0]}</h4>
              <p className="lbl">What the reviewed evidence says</p><p>{c[1]}</p>
              <footer><span><b>{c[2]}</b></span><span>Sources: {c[4]}</span></footer>
            </article>
          ))}
        </div>
        <p className="note">{R.CLAIM_NOTE}</p>
      </Sec>

      <Sec id="visit" n="8" title="Group site visit and field observations" i={0}>
        <p>{R.VISIT_INTRO}</p>
        <h3 className="cap">8.1 Team composition and travel route</h3>
        <p>{R.TEAM_TEXT}</p>
        <div className="team">{R.TEAM.map(([n, r, v]) => <div key={n} className={v ? 'vis' : ''}><b>{n}</b><span>{r}</span></div>)}</div>
        <p>{R.ROUTE_TEXT}</p>
        <Table cap="8.2 Visit record" head={['Field', 'Group record']} rows={R.VISIT_RECORD} />
        <Table cap="8.3 Field observation matrix" head={['Observation area', 'What to record', 'Group’s observation']} rows={R.MATRIX} />
        <h3 className="cap">8.4 Informal visitor account</h3>
        <p>{R.INFORMAL}</p>
        <h3 className="cap">8.5 Photographic evidence</h3>
        <p>{R.PHOTO_TEXT}</p>
        <Gallery />
      </Sec>

      <Sec id="survey" n="9" title="Visitor survey: results and analysis" i={1}>
        <Table cap="9.1 Administration record" head={['Item', 'Record']} rows={R.ADMIN} />
        <h3 className="cap">9.2 Questionnaire used</h3>
        <p>{R.QNAIRE_INTRO}</p>
        <dl className="vdl">{R.QNAIRE.map(([a, b]) => <div key={a}><dt>{a.split('. ')[0]}</dt><dd><b>{a.split('. ').slice(1).join('. ')}</b><br />{b}</dd></div>)}</dl>
        <h3 className="cap">9.3 Response profile</h3>
        <p>{R.PROFILE}</p>
        <h3 className="cap">9.4 Survey results</h3>
        <p>Twenty respondents (R01–R20), a convenience sample at the fort on 22 October 2026. Results describe these people only. Choose a question.</p>
        <div className="chips" role="group" aria-label="Survey questions">
          {R.SURVEY.map((x, i) => <button key={x.q} type="button" aria-pressed={s === i} style={{ '--c': '#7b1e1a' }} onClick={() => setS(i)}>{x.q}</button>)}
        </div>
        <div className="svy" key={sv.q} aria-live="polite">
          <h3>{sv.q}. {sv.t}</h3>
          {sv.r.map(([l, c, h]) => <Bar key={l} l={l} c={c} pct={Math.round((c / R.N) * 100)} hi={h} />)}
          <p className="note">{sv.n}</p>
        </div>
        <p className="note">{R.Q10}</p>
        <h3 className="cap">9.5 Interpretation rules</h3>
        <p>{R.RULES}</p>
      </Sec>

      <Sec id="findings" n="10" title="Results and discussion" i={2}>
        <h3 className="cap">10.1 What the documentary research establishes</h3>
        <ul>{R.ESTABLISHED.map((x) => <li key={x}>{x}</li>)}</ul>
        <h3 className="cap">10.2 What the group visit and survey add</h3>
        {R.SURVEY_ADDS.map((p) => <p key={p}>{p}</p>)}
        <h3 className="cap">10.3 What remains unresolved</h3>
        <p>{R.UNRESOLVED}</p>
      </Sec>

      <Sec id="advice" n="11" title="Recommendations" i={3}>
        <ol className="recs">{R.RECS.map((x) => <li key={x}>{x}</li>)}</ol>
      </Sec>

      <Sec id="conclusion" n="12" title="Conclusion" i={0}>
        {R.CONCLUSION.map((p) => <p key={p}>{p}</p>)}
      </Sec>

      <Sec id="references" n="✦" title="References" i={1}>
        <ol className="refs">{R.REFS.map((x) => <li key={x}>{x.replace(/^\[\d+\]\s*/, '')}</li>)}</ol>
      </Sec>

      <Sec id="appA" n="A" title="Appendix A. Group visit data sheet" i={2}>
        <p>Compiled from the group’s visit notes. Details not recorded are marked as such.</p>
        <Table head={['Field', 'Entry']} rows={R.APPA} />
      </Sec>

      <Sec id="appB" n="B" title="Appendix B. Source-to-claim audit sheet" i={3}>
        <Table head={['Claim to check', 'Best available source', 'Evidence recorded', 'Limit / disagreement', 'Final wording used']} rows={R.APPB} />
      </Sec>

      <Sec id="appC" n="C" title="Appendix C. Survey tally sheet" i={0}>
        <p>This sheet records the completed responses collected during the site visit (n = 20).</p>
        <Table head={['Question', 'Option A', 'Option B', 'Option C', 'Option D / missing']} rows={R.APPC} />
      </Sec>
    </>
  );
}
