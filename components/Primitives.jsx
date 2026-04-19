/* Jyotish Ārambha — Calculator UI Kit
   Shared components export to window. Each is small & cosmetic.
*/
const { useState, useMemo, useEffect } = React;

// ---------- Domain constants ----------
const SIGNS = [
  { abbr: 'Ar', name: 'Aries',       sym: '\u2648' },
  { abbr: 'Ta', name: 'Taurus',      sym: '\u2649' },
  { abbr: 'Ge', name: 'Gemini',      sym: '\u264A' },
  { abbr: 'Cn', name: 'Cancer',      sym: '\u264B' },
  { abbr: 'Le', name: 'Leo',         sym: '\u264C' },
  { abbr: 'Vi', name: 'Virgo',       sym: '\u264D' },
  { abbr: 'Li', name: 'Libra',       sym: '\u264E' },
  { abbr: 'Sc', name: 'Scorpio',     sym: '\u264F' },
  { abbr: 'Sg', name: 'Sagittarius', sym: '\u2650' },
  { abbr: 'Cp', name: 'Capricorn',   sym: '\u2651' },
  { abbr: 'Aq', name: 'Aquarius',    sym: '\u2652' },
  { abbr: 'Pi', name: 'Pisces',      sym: '\u2653' }
];
const SIGN_INDEX = Object.fromEntries(SIGNS.map((s, i) => [s.abbr, i]));
const NAVAMSA_OFFSET = [0, 8, 4, 0, 8, 4, 0, 8, 4, 0, 8, 4];
const NAKSHATRAS = [
  'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra',
  'Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni',
  'Uttara Phalguni','Hasta','Chitra','Swati','Vishakha',
  'Anuradha','Jyeshta','Mula','Purva Ashadha','Uttara Ashadha',
  'Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada',
  'Uttara Bhadrapada','Revati'
];
const LORD_CYCLE = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const LORD_SHORT = {Ketu:'Ke',Venus:'Ve',Sun:'Su',Moon:'Mo',Mars:'Ma',Rahu:'Ra',Jupiter:'Ju',Saturn:'Sa',Mercury:'Me'};
const NAK_LEN = 360/27;
const PADA_LEN = NAK_LEN/4;

const PLANETS = {
  Sun: { sym:'\u2609', short:'Su', color:'var(--glow-gold)', shadow:'var(--glow-gold-md)' },
  Moon:{ sym:'\u263D', short:'Mo', color:'var(--glow-cyan)', shadow:'var(--glow-cyan-md)' },
  Mars:{ sym:'\u2642', short:'Ma', color:'var(--glow-ember)', shadow:'0 0 12px #ff8a5b99,0 0 3px #ff8a5bcc' },
  'Mercury(R)':{sym:'\u263F',short:'Me(R)',color:'var(--glow-lime)',shadow:'0 0 12px #9dff6f99,0 0 3px #9dff6fcc'},
  Mercury:{sym:'\u263F',short:'Me',color:'var(--glow-lime)',shadow:'0 0 12px #9dff6f99'},
  Jupiter:{sym:'\u2643',short:'Ju',color:'var(--glow-gold)',shadow:'var(--glow-gold-md)'},
  Venus:{sym:'\u2640',short:'Ve',color:'var(--glow-magenta)',shadow:'var(--glow-magenta-md)'},
  Saturn:{sym:'\u2644',short:'Sa',color:'var(--glow-violet)',shadow:'var(--glow-violet-md)'},
  Rahu:{sym:'\u260A',short:'Ra',color:'var(--glow-violet)',shadow:'var(--glow-violet-md)'},
  Ketu:{sym:'\u260B',short:'Ke',color:'var(--glow-ember)',shadow:'0 0 12px #ff8a5b99'},
  Lagna:{sym:'La',short:'La',color:'var(--glow-magenta)',shadow:'var(--glow-magenta-md)'}
};

// ---------- Math ----------
const dmsToDeg = (d,m,s) => d + m/60 + s/3600;
const totalLon = (b) => SIGN_INDEX[b.sign]*30 + dmsToDeg(b.deg,b.min,b.sec);
function calc(body){
  const lon = totalLon(body);
  const nakIdx = Math.floor(lon/NAK_LEN);
  const padaInNak = Math.floor((lon - nakIdx*NAK_LEN)/PADA_LEN);
  const signIdx = SIGN_INDEX[body.sign];
  const degInSign = dmsToDeg(body.deg,body.min,body.sec);
  const padaInSign = Math.floor(degInSign/PADA_LEN);
  const navIdx = (signIdx + NAVAMSA_OFFSET[signIdx] + padaInSign) % 12;
  return {
    longitude: lon,
    nakshatra: NAKSHATRAS[nakIdx],
    nakLord: LORD_CYCLE[nakIdx % 9],
    pada: padaInNak + 1,
    navamsaSign: SIGNS[navIdx],
    signIndex: signIdx,
    nakIdx
  };
}
function nakshatrasInSign(signIdx){
  const signStart = signIdx*30, signEnd = signStart+30;
  const blocks = []; let cur = null;
  for (let n=0; n<27; n++){
    for (let k=0; k<4; k++){
      const ps = n*NAK_LEN + k*PADA_LEN, pe = ps + PADA_LEN;
      if (pe <= signStart || ps >= signEnd) continue;
      if (!cur || cur.nakIdx !== n){
        cur = { nakIdx:n, nakshatra:NAKSHATRAS[n], lord:LORD_CYCLE[n%9], padas:[] };
        blocks.push(cur);
      }
      cur.padas.push({ pada:k+1, startInSign:Math.max(ps,signStart)-signStart, endInSign:Math.min(pe,signEnd)-signStart });
    }
  }
  return blocks;
}
function fmtInSign(x){
  const totalMin = Math.round(x*60);
  const d = Math.floor(totalMin/60), m = totalMin - d*60;
  return `${d}°${m.toString().padStart(2,'0')}′`;
}

// ---------- Default data ----------
const DEFAULT_BODIES = [
  { key:'Lagna',       deg:9,  sign:'Sg', min:19, sec:52.29 },
  { key:'Sun',         deg:14, sign:'Ge', min:28, sec:43.61 },
  { key:'Moon',        deg:19, sign:'Sg', min:31, sec:45.25 },
  { key:'Mars',        deg:6,  sign:'Ta', min:58, sec:6.57  },
  { key:'Mercury(R)',  deg:2,  sign:'Cn', min:1,  sec:24.61 },
  { key:'Jupiter',     deg:5,  sign:'Cn', min:50, sec:23.77 },
  { key:'Venus',       deg:25, sign:'Cn', min:22, sec:19.63 },
  { key:'Saturn',      deg:19, sign:'Pi', min:57, sec:7.83  },
  { key:'Rahu',        deg:8,  sign:'Aq', min:24, sec:7.57  },
  { key:'Ketu',        deg:8,  sign:'Le', min:24, sec:7.57  }
];

// ---------- Small primitives ----------
function Glyph({ planet, size = 18 }) {
  const p = PLANETS[planet] || { sym: planet, color:'var(--fg-1)', shadow:'none' };
  return React.createElement('span', {
    className: 'symbol',
    style: { color: p.color, textShadow: p.shadow, fontSize: size }
  }, p.sym);
}

function SignGlyph({ abbr, size = 16, color = 'var(--glow-cyan)' }) {
  const s = SIGNS[SIGN_INDEX[abbr]];
  return React.createElement('span', {
    className: 'symbol',
    style: { color, textShadow: 'var(--glow-cyan-md)', fontSize: size }
  }, s.sym);
}

function Pill({ children, tone = 'default' }) {
  const tones = {
    default: { c:'var(--fg-2)', b:'var(--color-border)', t:'none' },
    cyan:    { c:'var(--glow-cyan)', b:'var(--glow-cyan)', t:'var(--glow-cyan-sm)' },
    gold:    { c:'var(--glow-gold)', b:'var(--glow-gold)', t:'var(--glow-gold-md)' },
    magenta: { c:'var(--glow-magenta)', b:'var(--glow-magenta)', t:'var(--glow-magenta-md)' },
    violet:  { c:'var(--glow-violet)', b:'var(--glow-violet)', t:'var(--glow-violet-md)' },
    lime:    { c:'var(--glow-lime)', b:'var(--glow-lime)', t:'0 0 10px #9dff6f66' }
  };
  const t = tones[tone] || tones.default;
  return React.createElement('span', {
    style: {
      display:'inline-flex',alignItems:'center',gap:6,padding:'3px 9px',
      background:'var(--nebula)', border:`1px solid ${t.b}`, borderRadius:999,
      fontSize:11, color:t.c, fontFamily:'var(--font-mono)', textShadow:t.t,
      letterSpacing:'0.04em'
    }
  }, children);
}

function Button({ variant = 'secondary', children, onClick, icon }) {
  const styles = {
    primary:   { bg:'var(--nebula-2)', color:'var(--glow-cyan)', border:'var(--glow-cyan)', shadow:'var(--glow-cyan-sm), inset 0 1px 0 rgba(255,255,255,0.05)', text:'var(--glow-cyan-sm)' },
    secondary: { bg:'var(--nebula)', color:'var(--fg-1)', border:'var(--color-border-strong)', shadow:'none', text:'none' },
    ghost:     { bg:'transparent', color:'var(--fg-2)', border:'var(--color-border)', shadow:'none', text:'none' }
  };
  const s = styles[variant];
  return React.createElement('button', {
    onClick,
    style: {
      fontFamily:'inherit', fontSize:13, fontWeight:600, letterSpacing:'0.04em',
      padding:'8px 14px', borderRadius:'var(--r-sm)',
      background:s.bg, color:s.color, border:`1px solid ${s.border}`,
      boxShadow:s.shadow, textShadow:s.text, cursor:'pointer',
      display:'inline-flex', alignItems:'center', gap:8,
      transition:'all var(--dur-fast) var(--ease-out)'
    }
  }, icon && React.createElement('span',{className:'symbol',style:{fontSize:14}},icon), children);
}

// Export to window
Object.assign(window, {
  SIGNS, SIGN_INDEX, NAVAMSA_OFFSET, NAKSHATRAS, LORD_CYCLE, LORD_SHORT,
  NAK_LEN, PADA_LEN, PLANETS, DEFAULT_BODIES,
  dmsToDeg, totalLon, calc, nakshatrasInSign, fmtInSign,
  Glyph, SignGlyph, Pill, Button
});
