import React from 'react';

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
const rnd = (seed) => {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};

const bez = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
};

/** Cusped (foliated) pointed arch, the signature Mughal opening. Path is closed along `base`. */
export function archPath({ cx, w, base, shoulder, apex, foils = 7 }) {
  const L = [cx - w, shoulder];
  const A = [cx, apex];
  const h = shoulder - apex;
  const left = [];
  for (let i = 0; i <= foils; i++) {
    left.push(bez(L, [cx - w, shoulder - h * 0.38], [cx - w * 0.28, apex + h * 0.12], A, i / foils));
  }
  const right = left
    .slice(0, -1)
    .reverse()
    .map(([x, y]) => [2 * cx - x, y]);
  const all = [...left, ...right];
  let d = `M${cx - w},${base} L${cx - w},${shoulder}`;
  for (let i = 1; i < all.length; i++) {
    const [x0, y0] = all[i - 1];
    const [x1, y1] = all[i];
    const r = Math.hypot(x1 - x0, y1 - y0) * 0.58;
    d += ` A${r.toFixed(2)},${r.toFixed(2)} 0 0 1 ${x1.toFixed(2)},${y1.toFixed(2)}`;
  }
  return d + ` L${cx + w},${base} Z`;
}

const solid = (f) => ({ fill: f });

function Crenels({ x0, x1, y, w = 13, gap = 8, h = 13, fill, pf = solid }) {
  const out = [];
  let i = 0;
  for (let x = x0; x + w <= x1 + 0.1; x += w + gap) {
    out.push(<rect key={i++} x={x} y={y - h} width={w} height={h} {...pf(fill)} />);
  }
  return <>{out}</>;
}

function Chhatri({ x, y, s = 1, dark, light, pf = solid }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x="-15" y="-4" width="30" height="4" {...pf(dark)} />
      {[-12, -4, 4, 12].map((px) => (
        <rect key={px} x={px - 1.2} y="-30" width="2.4" height="26" {...pf(light)} />
      ))}
      <rect x="-16" y="-33.5" width="32" height="3.5" {...pf(dark)} />
      <path d="M-14,-33.5 A14,15 0 0 1 14,-33.5 Z" {...pf(light)} />
      <rect x="-1" y="-56" width="2" height="9" {...pf(dark)} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* the fort: one geometry, drawn filled or as a line sketch            */
/* ------------------------------------------------------------------ */
const SAND = {
  sunset: { wall: '#a24b33', wallLight: '#bd6240', wallDark: '#6e2d20', marble: '#f1e3c4', tile: '#2f7690', hole: '#2a120c', far: '#c07b5c', farLight: '#d29272' },
  day: { wall: '#9a4630', wallLight: '#b85d3b', wallDark: '#6a2a1e', marble: '#f1e3c4', tile: '#2a7c98', hole: '#2a120c', far: '#a9715a', farLight: '#bf8a70' },
  dusk: { wall: '#7d3524', wallLight: '#984530', wallDark: '#4e1e15', marble: '#e8cfa6', tile: '#2a6e86', hole: '#1c0b07', far: '#8c4c3c', farLight: '#a3604a' },
};

export function FortShape({ mode = 'fill', c = SAND.sunset }) {
  const line = mode === 'line';
  const pf = (fill, extra) =>
    line ? { fill: 'none', stroke: '#4a2f20', strokeWidth: 1.5, strokeLinejoin: 'round', ...extra } : { fill, ...extra };
  const gateOuter = archPath({ cx: 400, w: 50, base: 340, shoulder: 240, apex: 170, foils: 7 });
  const gateHole = archPath({ cx: 400, w: 40, base: 340, shoulder: 248, apex: 186, foils: 7 });
  const courses = [232, 262, 292, 322];
  return (
    <g>
      {/* skyline behind the wall: Sher Mandal and the mosque dome */}
      <g>
        <rect x="178" y="112" width="44" height="92" {...pf(c.far)} />
        <rect x="172" y="150" width="56" height="7" {...pf(c.farLight)} />
        <Chhatri x={200} y={112} dark={c.far} light={c.farLight} pf={pf} />
        <rect x="552" y="140" width="56" height="64" {...pf(c.far)} />
        <path d="M546,142 A34,46 0 0 1 614,142 Z" {...pf(c.farLight)} />
        <rect x="578" y="82" width="4" height="16" {...pf(c.far)} />
        <rect x="538" y="132" width="9" height="72" {...pf(c.far)} />
        <rect x="613" y="132" width="9" height="72" {...pf(c.far)} />
      </g>

      {/* curtain wall */}
      <path d="M10,340 L28,200 L772,200 L790,340 Z" {...pf(c.wall)} />
      <Crenels x0={28} x1={772} y={200} fill={c.wall} pf={pf} />
      {!line &&
        courses.map((y) => (
          <path key={y} d={`M${14 + (340 - y) * 0.15},${y} H${786 - (340 - y) * 0.15}`} stroke={c.wallDark} strokeWidth="1.2" opacity="0.3" fill="none" />
        ))}

      {/* bastions */}
      {[90, 710].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 38},340 L${cx - 32},160 H${cx + 32} L${cx + 38},340 Z`} {...pf(c.wallLight)} />
          {!line && <path d={`M${cx - 38},340 L${cx - 32},160 H${cx - 14} L${cx - 18},340 Z`} fill={c.wallDark} opacity="0.35" />}
          <Crenels x0={cx - 32} x1={cx + 32} y={160} w={12} gap={7} h={12} fill={c.wallLight} pf={pf} />
          <rect x={cx - 2} y="205" width="4" height="26" {...pf(c.wallDark)} />
          <rect x={cx - 2} y="262" width="4" height="26" {...pf(c.wallDark)} />
        </g>
      ))}

      {/* Bara Darwaza */}
      <rect x="290" y="118" width="220" height="222" {...pf(c.wall)} />
      <Crenels x0={290} x1={510} y={118} fill={c.wall} pf={pf} />
      {!line && <rect x="290" y="118" width="16" height="222" fill={c.wallDark} opacity="0.35" />}
      {!line && <rect x="494" y="118" width="16" height="222" fill={c.wallDark} opacity="0.25" />}
      <rect x="290" y="148" width="220" height="7" {...pf(c.marble)} />
      <rect x="290" y="300" width="220" height="5" {...pf(c.marble)} />
      <path d={gateOuter} {...pf(c.wallLight, { stroke: line ? '#4a2f20' : c.marble, strokeWidth: line ? 1.5 : 3 })} />
      <path d={gateHole} {...pf(c.hole)} />
      {[372, 400, 428].map((x, i) => (
        <path key={x} d={`M${x},${i === 1 ? 156 : 166} l7,7 -7,7 -7,-7Z`} {...pf(c.tile)} />
      ))}
      <rect x="318" y="206" width="6" height="30" {...pf(c.wallDark)} />
      <rect x="476" y="206" width="6" height="30" {...pf(c.wallDark)} />
      {[316, 400, 484].map((x) => (
        <Chhatri key={x} x={x} y={105} dark={c.wallDark} light={c.wallLight} pf={pf} />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* full scene                                                          */
/* ------------------------------------------------------------------ */
const SCENES = {
  sunset: { sky: ['#f6cf9d', '#f0a06a', '#f6c47f'], glow: true, lake: ['#efb07c', '#c47a50', '#4b392f'], haze: '#b9774f', trees: ['#27331f', '#3a4a27', '#55652f'], hi: '#d9a24a', fort: SAND.sunset },
  day: { sky: ['#76adc8', '#b8d5db', '#f1e8cf'], glow: false, lake: ['#86aaa8', '#4d7f80', '#2c4f50'], haze: '#8ea88f', trees: ['#2c4a28', '#3f6232', '#6a8a3e'], hi: '#d3bc54', fort: SAND.day },
  dusk: { sky: ['#4a2b3d', '#b5503f', '#f0a15a'], glow: true, lake: ['#e08a55', '#8a4a3a', '#2a1a18'], haze: '#7a4a45', trees: ['#1b2218', '#27331f', '#3a4a27'], hi: '#c97e3a', fort: SAND.dusk },
};

function Foliage({ cx, cy, rx, ry, n, seed, cols, hi }) {
  const r = rnd(seed);
  const blobs = [];
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    const x = cx + Math.cos(a) * rx * d;
    const y = cy + Math.sin(a) * ry * d;
    const size = 16 + r() * 22;
    blobs.push({ x, y, size, col: cols[Math.floor(r() * cols.length)], lit: x > cx && r() > 0.55 });
  }
  return (
    <g>
      {blobs.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.size} fill={b.col} />
      ))}
      {blobs
        .filter((b) => b.lit)
        .map((b, i) => (
          <circle key={`h${i}`} cx={b.x + 5} cy={b.y - 4} r={b.size * 0.5} fill={hi} opacity="0.35" />
        ))}
    </g>
  );
}

export function SceneContent({ uid, variant = 'sunset', birds = true }) {
  const S = SCENES[variant];
  const r = rnd(11);
  const haze = [];
  for (let x = -10; x < 820; x += 22) haze.push({ x, y: 392 - r() * 14, s: 14 + r() * 14 });
  const ripples = [];
  for (let i = 0; i < 26; i++) ripples.push({ x: r() * 760 + 10, y: 410 + r() * 180, w: 24 + r() * 70 });
  return (
    <>
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={S.sky[0]} />
          <stop offset="0.6" stopColor={S.sky[1]} />
          <stop offset="1" stopColor={S.sky[2]} />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="0.7" cy="0.93" r="0.55">
          <stop offset="0" stopColor="#fff4d4" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ffd9a0" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`lake-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={S.lake[0]} />
          <stop offset="0.5" stopColor={S.lake[1]} />
          <stop offset="1" stopColor={S.lake[2]} />
        </linearGradient>
        <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`rm-${uid}`}>
          <rect x="0" y="400" width="800" height="200" fill={`url(#fade-${uid})`} />
        </mask>
        <filter id={`water-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.12" numOctaves="2" seed="3" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="14" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.2" />
        </filter>
        <g id={`fort-${uid}`}>
          <g transform="translate(0,60)">
            <FortShape c={S.fort} />
          </g>
        </g>
      </defs>

      <rect x="0" y="-400" width="800" height="402" fill={S.sky[0]} />
      <rect width="800" height="402" fill={`url(#sky-${uid})`} />
      {S.glow && <rect width="800" height="402" fill={`url(#glow-${uid})`} />}
      {S.glow && <circle cx="560" cy="376" r="34" fill="#fff4d8" opacity="0.85" />}

      {haze.map((h, i) => (
        <circle key={i} cx={h.x} cy={h.y} r={h.s} fill={S.haze} opacity="0.45" />
      ))}

      <use href={`#fort-${uid}`} />

      <rect y="400" width="800" height="200" fill={`url(#lake-${uid})`} />
      <g mask={`url(#rm-${uid})`} filter={`url(#water-${uid})`} opacity="0.6">
        <g transform="translate(0,800) scale(1,-1)">
          <use href={`#fort-${uid}`} />
        </g>
      </g>
      {ripples.map((p, i) => (
        <path key={i} d={`M${p.x},${p.y} h${p.w}`} stroke="#fff4d8" strokeWidth="1.4" opacity="0.28" strokeLinecap="round" />
      ))}

      {/* left bank */}
      <ellipse cx="60" cy="430" rx="150" ry="18" fill={S.trees[0]} />
      <path d="M62,330 C66,380 56,410 58,432 L74,432 C72,400 76,370 72,330Z" fill="#3a2418" />
      <Foliage cx={62} cy={240} rx={120} ry={125} n={30} seed={5} cols={S.trees} hi={S.hi} />
      {/* right bank */}
      <ellipse cx="775" cy="424" rx="95" ry="14" fill={S.trees[0]} />
      <path d="M770,330 C772,370 766,400 768,426 L780,426 C778,396 782,366 780,330Z" fill="#3a2418" />
      <Foliage cx={775} cy={300} rx={72} ry={85} n={16} seed={9} cols={S.trees} hi={S.hi} />

      {birds &&
        [
          [300, 70, 1],
          [350, 100, 0.8],
          [255, 112, 0.7],
          [470, 60, 0.9],
        ].map(([x, y, s], i) => (
          <path key={i} transform={`translate(${x},${y}) scale(${s})`} d="M0,0 q7,-8 14,0 q7,-8 14,0" fill="none" stroke="#5a3524" strokeWidth="2" strokeLinecap="round" />
        ))}
    </>
  );
}

export function FortScene({ id = 's', variant = 'sunset', className, label = 'Illustration of Purana Qila', viewBox = '0 0 800 600' }) {
  return (
    <svg viewBox={viewBox} preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={label}>
      <SceneContent uid={`${id}-${variant}`} variant={variant} />
    </svg>
  );
}

/** Line sketch of the fort, drawn in ink */
export function FortSketch({ className }) {
  return (
    <svg viewBox="0 120 800 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <FortShape mode="line" />
      <path d="M0,340 H800" stroke="#4a2f20" strokeWidth="1.5" fill="none" />
      {Array.from({ length: 40 }).map((_, i) => (
        <path key={i} d={`M${i * 20 + 6},346 l-6,8`} stroke="#4a2f20" strokeWidth="1" opacity="0.5" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* arch frame (cover, thank-you) and arch window (inset scenes)        */
/* ------------------------------------------------------------------ */
export function ArchFrame({ shoulder = 210, apex = 26, w = 272, foils = 8, fill = '#3a1710', gold = '#c9962f', className }) {
  const W = 600;
  const H = 800;
  const hole = archPath({ cx: W / 2, w, base: H + 2, shoulder, apex, foils });
  const inner = archPath({ cx: W / 2, w: w - 9, base: H + 2, shoulder: shoulder + 7, apex: apex + 10, foils });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <pattern id="frame-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M11,3 l4,8 -4,8 -4,-8Z" fill="#c9962f" opacity="0.22" />
        </pattern>
      </defs>
      <path fillRule="evenodd" d={`M0,0H${W}V${H}H0Z ${hole}`} fill={fill} />
      <path fillRule="evenodd" d={`M0,0H${W}V${H}H0Z ${hole}`} fill="url(#frame-dots)" />
      <path d={hole} fill="none" stroke={gold} strokeWidth="3" />
      <path d={inner} fill="none" stroke={gold} strokeWidth="1" opacity="0.75" />
    </svg>
  );
}

export function ArchWindow({ id = 'w', variant = 'dusk', className }) {
  const W = 300;
  const H = 380;
  const path = archPath({ cx: W / 2, w: 140, base: H, shoulder: 150, apex: 14, foils: 8 });
  const uid = `win-${id}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label="Purana Qila seen through an arch">
      <defs>
        <clipPath id={`clip-${uid}`}>
          <path d={path} />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${uid})`}>
        <svg width={W} height={H} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <SceneContent uid={uid} variant={variant} />
        </svg>
      </g>
      <path d={path} fill="none" stroke="#4a2a1a" strokeWidth="5" />
      <path d={path} fill="none" stroke="#c9962f" strokeWidth="1.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* gallery panels                                                      */
/* ------------------------------------------------------------------ */
const PSKY = { warm: ['#f5d8a8', '#f3b87a'], blue: ['#86bdd6', '#e9ecd6'], rose: ['#f1c4a0', '#e9a07a'] };
const W1 = '#a44b32';
const W2 = '#bf6441';
const WD = '#6c2c20';
const MB = '#f1e3c4';
const HOLE = '#26110b';

function GateBody({ twin }) {
  return (
    <g>
      <rect x="22" y="94" width="196" height="56" fill={W1} />
      <Crenels x0={22} x1={218} y={94} w={8} gap={5} h={8} fill={W1} />
      <rect x="60" y="38" width="120" height="112" fill={W1} />
      <rect x="60" y="38" width="10" height="112" fill={WD} opacity="0.3" />
      <Crenels x0={60} x1={180} y={38} w={8} gap={5} h={8} fill={W1} />
      <rect x="60" y="58" width="120" height="4" fill={MB} />
      <path d={archPath({ cx: 120, w: 31, base: 150, shoulder: 102, apex: 64, foils: 6 })} fill={W2} stroke={MB} strokeWidth="2.5" />
      <path d={archPath({ cx: 120, w: 24, base: 150, shoulder: 106, apex: 74, foils: 6 })} fill={HOLE} />
      {[100, 120, 140].map((x, i) => (
        <path key={x} d={`M${x},${i === 1 ? 64 : 70} l4,4 -4,4 -4,-4Z`} fill="#2f7690" />
      ))}
      {(twin ? [90, 150] : [82, 120, 158]).map((x) => (
        <Chhatri key={x} x={x} y={30} s={0.55} dark={WD} light={W2} />
      ))}
    </g>
  );
}

function MosqueBody() {
  const arches = [
    [52, 11, 120, 100],
    [86, 12, 118, 96],
    [120, 21, 112, 78],
    [154, 12, 118, 96],
    [188, 11, 120, 100],
  ];
  return (
    <g>
      <rect x="26" y="68" width="188" height="82" fill={W1} />
      <rect x="26" y="68" width="188" height="5" fill={MB} />
      <rect x="26" y="86" width="188" height="3" fill={MB} opacity="0.7" />
      <rect x="94" y="58" width="52" height="92" fill={W2} />
      <rect x="22" y="48" width="9" height="102" fill={W2} />
      <rect x="209" y="48" width="9" height="102" fill={W2} />
      <path d="M20,48 h13 l-6.5,-10Z M207,48 h13 l-6.5,-10Z" fill={WD} />
      <rect x="104" y="40" width="32" height="20" fill={W2} />
      <path d="M96,42 A24,28 0 0 1 144,42 Z" fill={W1} />
      <rect x="119" y="6" width="2" height="12" fill={WD} />
      <circle cx="120" cy="6" r="2.4" fill={WD} />
      {[88, 152].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="50" width="4" height="12" fill={WD} />
          <path d={`M${x - 4},50 A4,5 0 0 1 ${x + 4},50Z`} fill={W1} />
        </g>
      ))}
      {arches.map(([cx, w, sh, ap]) => (
        <path key={cx} d={archPath({ cx, w, base: 150, shoulder: sh, apex: ap, foils: 5 })} fill={HOLE} stroke={MB} strokeWidth="1.6" />
      ))}
    </g>
  );
}

function MandalBody() {
  return (
    <g>
      <rect x="40" y="132" width="160" height="18" fill={W1} />
      <Crenels x0={40} x1={200} y={132} w={8} gap={6} h={7} fill={W1} />
      <path d="M78,132 L84,92 H156 L162,132 Z" fill={W1} />
      <path d="M78,132 L84,92 H100 L96,132 Z" fill={WD} opacity="0.3" />
      <rect x="82" y="88" width="76" height="5" fill={MB} />
      <rect x="92" y="54" width="56" height="36" fill={W2} />
      <rect x="90" y="50" width="60" height="5" fill={MB} />
      {[102, 120, 138].map((x) => (
        <path key={x} d={archPath({ cx: x, w: 6, base: 120, shoulder: 108, apex: 98, foils: 3 })} fill={HOLE} />
      ))}
      {[104, 120, 136].map((x) => (
        <path key={x} d={archPath({ cx: x, w: 5, base: 84, shoulder: 74, apex: 64, foils: 3 })} fill={HOLE} />
      ))}
      <Chhatri x={120} y={50} s={0.95} dark={WD} light={W2} />
      <path d="M96,150 h48 l6,-6 h-60Z" fill={WD} opacity="0.4" />
    </g>
  );
}

function WallBody() {
  return (
    <g>
      <path d="M0,150 L6,90 H234 L240,150 Z" fill={W1} />
      <Crenels x0={6} x1={234} y={90} w={9} gap={6} h={8} fill={W1} />
      <path d="M118,150 L122,52 H182 L186,150 Z" fill={W2} />
      <path d="M118,150 L122,52 H136 L134,150 Z" fill={WD} opacity="0.3" />
      <Crenels x0={122} x1={182} y={52} w={9} gap={5} h={8} fill={W2} />
      {[30, 70, 210].map((x) => (
        <rect key={x} x={x} y="104" width="3.5" height="18" fill={WD} />
      ))}
      {[78, 116].map((y) => (
        <rect key={y} x="148" y={y} width="4" height="16" fill={WD} />
      ))}
      <path d="M0,118 H240 M0,136 H240" stroke={WD} strokeWidth="1" opacity="0.25" />
    </g>
  );
}

export function Panel({ kind, sky = 'warm', id = 'p', label }) {
  const uid = `${id}-${kind}`;
  const [a, b] = PSKY[sky];
  const body = {
    gate: <GateBody />,
    gate2: <GateBody twin />,
    mosque: <MosqueBody />,
    mandal: <MandalBody />,
    wall: <WallBody />,
  }[kind];
  return (
    <svg viewBox="0 0 240 170" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`pg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="240" height="170" fill={`url(#pg-${uid})`} />
      {Array.from({ length: 14 }).map((_, i) => (
        <circle key={i} cx={i * 19 + 4} cy={140 - ((i * 7) % 9)} r={12 + ((i * 5) % 8)} fill="#5d6b3a" opacity="0.5" />
      ))}
      {body}
      <rect y="150" width="240" height="20" fill="#6f7d3e" />
      <path d="M0,150 q30,-5 60,0 t60,0 t60,0 t60,0" fill="none" stroke="#56642f" strokeWidth="2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* ornaments                                                           */
/* ------------------------------------------------------------------ */
export function Badge({ n, color = '#7b1e1a', className }) {
  return (
    <svg viewBox="0 0 100 114" className={className} aria-hidden="true">
      <path d="M4,114 V48 C4,28 24,16 50,2 C76,16 96,28 96,48 V114Z" fill={color} />
      <path d="M11,114 V49 C11,32 28,22 50,10 C72,22 89,32 89,49 V114" fill="none" stroke="#e8c677" strokeWidth="1.4" opacity="0.8" />
      <text x="50" y="82" textAnchor="middle" fontFamily="Marcellus, Georgia, serif" fontSize="46" fill="#f4e6c6">
        {n}
      </text>
    </svg>
  );
}

export function Lotus({ className, color = '#b5651d' }) {
  return (
    <svg viewBox="-32 -32 64 40" className={className} aria-hidden="true">
      {[-62, -31, 0, 31, 62].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0,0 C-9,-8 -8,-22 0,-28 C8,-22 9,-8 0,0Z" fill={color} opacity={a === 0 ? 1 : 0.78} />
      ))}
      <path d="M-24,3 H24" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Vine({ className }) {
  const p0 = [0, 0];
  const p1 = [40, 10];
  const p2 = [60, 60];
  const p3 = [110, 95];
  const leaves = [0.12, 0.26, 0.4, 0.54, 0.68, 0.82].map((t, i) => {
    const [x, y] = bez(p0, p1, p2, p3, t);
    const [x2, y2] = bez(p0, p1, p2, p3, t + 0.02);
    const ang = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI + (i % 2 ? 58 : -58);
    return { x, y, ang, s: 1 - i * 0.06 };
  });
  return (
    <svg className={className} viewBox="0 0 120 110" aria-hidden="true">
      <path d="M0,0 C40,10 60,60 110,95" fill="none" stroke="#4b5a2c" strokeWidth="1.6" />
      {leaves.map((l, i) => (
        <path
          key={i}
          transform={`translate(${l.x} ${l.y}) rotate(${l.ang}) scale(${l.s})`}
          d="M0,0 C5,-7 15,-9 26,-2 C15,5 5,5 0,0Z"
          fill={i % 2 ? '#5f7133' : '#3f5a2f'}
          opacity="0.92"
        />
      ))}
      {[0.33, 0.6, 0.78].map((t) => {
        const [x, y] = bez(p0, p1, p2, p3, t);
        return <circle key={t} cx={x + 5} cy={y + 6} r="3" fill="#8a2a22" />;
      })}
    </svg>
  );
}

const ICONS = {
  dome: (
    <>
      <path d="M5 20V12a7 7 0 0 1 14 0v8" />
      <path d="M3 20h18M12 3v2M9 20v-5a3 3 0 0 1 6 0v5" />
    </>
  ),
  arch: (
    <>
      <path d="M5 21V10c0-3 3-5 7-8 4 3 7 5 7 8v11" />
      <path d="M9 21v-6a3 3 0 0 1 6 0v6M3 21h18" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M8 7l1.5-3h5L16 7" />
    </>
  ),
  book: (
    <>
      <path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6z" />
      <path d="M12 6v14.5" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M8 12h8M12 8v8" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-14 15-14 0 9-5 15-13 14" />
      <path d="M5 19c3-5 6-8 10-10" />
    </>
  ),
  brick: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 9.7v4.6M9 14.3V19" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.5c3 0 6 1.8 6 5.5" />
    </>
  ),
};

export function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* schematic site plan                                                 */
/* ------------------------------------------------------------------ */
export function SitePlan() {
  const outline = 'M112,40 H248 Q272,40 272,64 V316 Q272,340 248,340 H112 Q90,340 90,316 V64 Q90,40 112,40Z';
  const bastions = [
    [90, 40], [272, 40], [90, 340], [272, 340], [90, 120], [90, 270], [272, 120], [272, 270],
  ];
  return (
    <svg viewBox="-24 0 354 392" className="plan" role="img" aria-label="Schematic plan of Purana Qila showing three gates, the mosque and the Sher Mandal">
      <path d={outline} fill="#efdcb2" stroke="#7b1e1a" strokeWidth="6" strokeLinejoin="round" />
      <path d={outline} fill="none" stroke="#7b1e1a" strokeWidth="1" strokeDasharray="3 3" transform="translate(181 190) scale(0.94) translate(-181 -190)" opacity="0.6" />
      {bastions.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill="#7b1e1a" />
      ))}

      {/* gates */}
      <rect x="83" y="186" width="14" height="28" fill="#efdcb2" />
      <rect x="85" y="188" width="10" height="24" fill="#b8862b" />
      <rect x="166" y="333" width="28" height="14" fill="#efdcb2" />
      <rect x="168" y="335" width="24" height="10" fill="#b8862b" />
      <rect x="166" y="33" width="28" height="14" fill="#efdcb2" />
      <rect x="168" y="35" width="24" height="10" fill="#b8862b" />
      <text x="78" y="204" textAnchor="end">Bara Darwaza</text>
      <text x="180" y="366" textAnchor="middle">Humayun Darwaza (south)</text>
      <text x="180" y="24" textAnchor="middle">Talaqi Darwaza (north)</text>

      {/* mosque */}
      <rect x="140" y="148" width="20" height="62" fill="#b55e3d" stroke="#6e2d20" strokeWidth="1.5" />
      <circle cx="150" cy="179" r="6" fill="#efdcb2" stroke="#6e2d20" strokeWidth="1.2" />
      <path d="M162,179 H178" stroke="#6e2d20" strokeWidth="1" />
      <text x="181" y="176">Qila-i-Kuhna</text>
      <text x="181" y="189">Masjid</text>

      {/* Sher Mandal */}
      <path d="M222,250 l8,-3 8,3 3,8 -3,8 -8,3 -8,-3 -3,-8Z" fill="#b55e3d" stroke="#6e2d20" strokeWidth="1.5" transform="translate(-6 0)" />
      <text x="224" y="289" textAnchor="middle">Sher Mandal</text>

      {/* north arrow */}
      <path d="M306,86 V48 M306,44 l-6,12 h12Z" stroke="#3b2316" strokeWidth="1.5" fill="#3b2316" />
      <text x="306" y="106" textAnchor="middle">N</text>
    </svg>
  );
}
