/* ResultTable — computed output per body */

function ResultTable({ bodies }) {
  const rows = bodies.map(b => ({ b, r: calc(b) }));
  return React.createElement('div', {
    style:{ overflow:'hidden', borderRadius:'var(--r-md)', border:'1px solid var(--color-border)' }
  },
    React.createElement('table', {
      style:{ width:'100%', borderCollapse:'separate', borderSpacing:0, fontSize:12, background:'var(--nebula)' }
    },
      React.createElement('thead', null,
        React.createElement('tr', null,
          ['Body','Longitude','Nakshatra','Lord','Pada','Navamsa'].map(h =>
            React.createElement('th', { key:h, style:thStyle() }, h)
          )
        )
      ),
      React.createElement('tbody', null,
        rows.map(({b, r}) =>
          React.createElement('tr', { key:b.key, style:{ borderBottom:'1px solid var(--color-border)' } },
            React.createElement('td', { style:tdStyle2() },
              React.createElement('div',{style:{display:'flex',alignItems:'center',gap:8}},
                React.createElement(Glyph,{planet:b.key,size:16}),
                React.createElement('span',{style:{color:'var(--fg-1)',fontWeight:600}},b.key)
              )
            ),
            React.createElement('td', { style:tdMono() },
              `${b.deg}° ${b.sign} ${b.min}′ ${b.sec.toFixed(2)}″`
            ),
            React.createElement('td', { style:tdStyle2() },
              React.createElement('span',{className:'sanskrit',style:{color:'var(--fg-1)'}}, r.nakshatra)
            ),
            React.createElement('td', { style:tdStyle2() },
              React.createElement('span',{style:{color:'var(--glow-violet)',textShadow:'var(--glow-violet-md)',fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.04em'}},
                `${LORD_SHORT[r.nakLord]} · ${r.nakLord}`
              )
            ),
            React.createElement('td', { style:{...tdMono(),color:'var(--glow-gold)',textShadow:'var(--glow-gold-md)',fontWeight:700} }, r.pada),
            React.createElement('td', { style:tdStyle2() },
              React.createElement('span',{style:{display:'inline-flex',alignItems:'center',gap:6}},
                React.createElement(SignGlyph,{abbr:r.navamsaSign.abbr,size:14,color:'var(--glow-lime)'}),
                React.createElement('span',{style:{color:'var(--glow-lime)',fontSize:12,textShadow:'0 0 8px #9dff6f66'}}, r.navamsaSign.name)
              )
            )
          )
        )
      )
    )
  );
}
function thStyle(){ return { padding:'9px 10px', textAlign:'left', background:'var(--orbit)', color:'var(--glow-cyan)', fontSize:10, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', textShadow:'var(--glow-cyan-sm)', borderBottom:'1px solid var(--color-border-strong)' }; }
function tdStyle2(){ return { padding:'8px 10px', color:'var(--fg-1)', verticalAlign:'middle' }; }
function tdMono(){ return { ...tdStyle2(), fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg-2)', fontVariantNumeric:'tabular-nums' }; }

window.ResultTable = ResultTable;
