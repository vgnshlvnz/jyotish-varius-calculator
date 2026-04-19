/*
  icons.js — Jyotish Ārambha iconography
  Zodiac + planetary glyphs are Unicode astrological symbols rendered
  with the system's :symbol font (falls back to Segoe UI Symbol / Apple Color Emoji).
  UI micro-icons are inline SVG strings (Lucide-style 1.5px stroke).
*/
(function (global) {
  const SIGNS = [
    { abbr: 'Ar', name: 'Aries',       sym: '\u2648', sanskrit: 'Meṣa',    element: 'fire',  modality: 'movable' },
    { abbr: 'Ta', name: 'Taurus',      sym: '\u2649', sanskrit: 'Vṛṣabha', element: 'earth', modality: 'fixed'   },
    { abbr: 'Ge', name: 'Gemini',      sym: '\u264A', sanskrit: 'Mithuna', element: 'air',   modality: 'dual'    },
    { abbr: 'Cn', name: 'Cancer',      sym: '\u264B', sanskrit: 'Karka',   element: 'water', modality: 'movable' },
    { abbr: 'Le', name: 'Leo',         sym: '\u264C', sanskrit: 'Siṃha',   element: 'fire',  modality: 'fixed'   },
    { abbr: 'Vi', name: 'Virgo',       sym: '\u264D', sanskrit: 'Kanyā',   element: 'earth', modality: 'dual'    },
    { abbr: 'Li', name: 'Libra',       sym: '\u264E', sanskrit: 'Tulā',    element: 'air',   modality: 'movable' },
    { abbr: 'Sc', name: 'Scorpio',     sym: '\u264F', sanskrit: 'Vṛścika', element: 'water', modality: 'fixed'   },
    { abbr: 'Sg', name: 'Sagittarius', sym: '\u2650', sanskrit: 'Dhanu',   element: 'fire',  modality: 'dual'    },
    { abbr: 'Cp', name: 'Capricorn',   sym: '\u2651', sanskrit: 'Makara',  element: 'earth', modality: 'movable' },
    { abbr: 'Aq', name: 'Aquarius',    sym: '\u2652', sanskrit: 'Kumbha',  element: 'air',   modality: 'fixed'   },
    { abbr: 'Pi', name: 'Pisces',      sym: '\u2653', sanskrit: 'Mīna',    element: 'water', modality: 'dual'    }
  ];

  // Vedic planetary glyphs (Rahu/Ketu use the ☊/☋ node glyphs)
  const PLANETS = {
    Sun:        { sym: '\u2609', short: 'Su', sanskrit: 'Sūrya',    color: 'var(--glow-gold)'    },
    Moon:       { sym: '\u263D', short: 'Mo', sanskrit: 'Candra',   color: 'var(--glow-cyan)'    },
    Mars:       { sym: '\u2642', short: 'Ma', sanskrit: 'Maṅgala',  color: 'var(--glow-ember)'   },
    Mercury:    { sym: '\u263F', short: 'Me', sanskrit: 'Budha',    color: 'var(--glow-lime)'    },
    Jupiter:    { sym: '\u2643', short: 'Ju', sanskrit: 'Bṛhaspati',color: 'var(--glow-gold)'    },
    Venus:      { sym: '\u2640', short: 'Ve', sanskrit: 'Śukra',    color: 'var(--glow-magenta)' },
    Saturn:     { sym: '\u2644', short: 'Sa', sanskrit: 'Śani',     color: 'var(--glow-violet)'  },
    Rahu:       { sym: '\u260A', short: 'Ra', sanskrit: 'Rāhu',     color: 'var(--glow-violet)'  },
    Ketu:       { sym: '\u260B', short: 'Ke', sanskrit: 'Ketu',     color: 'var(--glow-ember)'   },
    Lagna:      { sym: 'La',     short: 'La', sanskrit: 'Lagna',    color: 'var(--glow-cyan)'    },
    'Mercury(R)':{sym: '\u263F', short: 'Me(R)', sanskrit: 'Budha (vakrī)', color: 'var(--glow-lime)' }
  };

  // Minimal UI icons (stroke=1.5, 24×24). Render via Icon(name, size).
  const UI_ICONS = {
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-down':  '<path d="M12 5v14M6 13l6 6 6-6"/>',
    'check':       '<path d="M20 6 9 17l-5-5"/>',
    'close':       '<path d="M18 6 6 18M6 6l12 12"/>',
    'reset':       '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    'clear':       '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    'search':      '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    'info':        '<circle cx="12" cy="12" r="10"/><path d="M12 16v-5M12 8h.01"/>',
    'star':        '<path d="m12 2 3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>',
    'sparkle':     '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8"/>',
    'orbit':       '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"/>',
    'grid':        '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    'calc':        '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h8"/>',
    'chevron-right':'<path d="m9 6 6 6-6 6"/>',
    'chevron-down':'<path d="m6 9 6 6 6-6"/>',
    'minus':       '<path d="M5 12h14"/>',
    'plus':        '<path d="M12 5v14M5 12h14"/>'
  };

  function renderIcon(name, opts = {}) {
    const size = opts.size || 18;
    const color = opts.color || 'currentColor';
    const stroke = opts.stroke || 1.5;
    const path = UI_ICONS[name] || UI_ICONS['info'];
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  }

  const NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni',
    'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha',
    'Anuradha', 'Jyeshta', 'Mula', 'Purva Ashadha', 'Uttara Ashadha',
    'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
  ];
  const LORD_CYCLE = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];

  global.JA_ICONS = { SIGNS, PLANETS, UI_ICONS, renderIcon, NAKSHATRAS, LORD_CYCLE };
})(window);
