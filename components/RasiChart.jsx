/* RasiChart — South Indian 4×4 fixed layout */

const SI_LAYOUT = [
  ['Pi','Ar','Ta','Ge'],
  ['Aq', null, null,'Cn'],
  ['Cp', null, null,'Le'],
  ['Sg','Sc','Li','Vi']
];

function RasiChart({ bodies, selectedKey, onSelectBody }) {
  const lagnaIdx = SIGN_INDEX[bodies[0].sign];
  const bySign = {};
  SIGNS.forEach(s => bySign[s.abbr] = []);
  bodies.forEach(b => bySign[b.sign].push(b));

  return React.createElement('div', {
    style:{
      display:'grid',
      gridTemplateColumns:'repeat(4,1fr)',
      gridTemplateRows:'repeat(4,1fr)',
      aspectRatio:'1/1',
      width:'100%', maxWidth:520,
      margin:'0 auto',
      background:'var(--nebula)',
      border:'1.5px solid var(--color-border-strong)',
      borderRadius:'var(--r-md)',
      overflow:'hidden',
      boxShadow:'var(--shadow-lg), var(--inset-top)'
    }
  },
    SI_LAYOUT.flatMap((row,r) => row.map((abbr,c) => {
      if (abbr === null) {
        if (r===1 && c===1) {
          return React.createElement('div', {
            key:`center-${r}-${c}`,
            style:{
              gridColumn:'2 / span 2', gridRow:'2 / span 2',
              display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
              gap:6, color:'var(--fg-3)',
              background:'radial-gradient(circle,var(--nebula-2) 0%,var(--nebula) 70%)',
              borderTop:'1px solid var(--color-border)',
              borderBottom:'1px solid var(--color-border)',
              borderLeft:'1px solid var(--color-border)',
              borderRight:'1px solid var(--color-border)'
            }
          },
            React.createElement('div',{className:'symbol',style:{fontSize:44,color:'var(--glow-cyan)',textShadow:'var(--glow-cyan-lg)',opacity:0.85}},'\u2609'),
            React.createElement('div',{style:{fontFamily:'var(--font-display)',fontStyle:'italic',fontWeight:600,fontSize:15,color:'var(--fg-2)',letterSpacing:'0.1em'}},'Rāśi Cakra'),
            React.createElement('div',{style:{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--fg-3)',letterSpacing:'0.2em',textTransform:'uppercase'}},'South Indian')
          );
        }
        return null;
      }
      const signIdx = SIGN_INDEX[abbr];
      const house = ((signIdx - lagnaIdx + 12) % 12) + 1;
      const sign = SIGNS[signIdx];
      const cellBodies = bySign[abbr];
      const hasSelected = cellBodies.some(b => b.key === selectedKey);
      const isLagnaCell = cellBodies.some(b => b.key === 'Lagna');
      return React.createElement('div', {
        key:abbr,
        className: isLagnaCell ? 'lagna-cell' : '',
        style:{
          border:'1px solid var(--color-border)',
          padding:8, position:'relative',
          display:'flex', flexDirection:'column', gap:4,
          minHeight:0, overflow:'hidden', minWidth:0,
          background: hasSelected ? 'rgba(111,246,255,0.04)' : (isLagnaCell ? 'rgba(255,93,224,0.05)' : 'transparent'),
          boxShadow: hasSelected && !isLagnaCell ? 'inset 0 0 0 1.5px var(--glow-cyan), inset 0 0 24px rgba(111,246,255,0.1)' : 'none',
          transition:'all var(--dur-med) var(--ease-out)'
        }
      },
        React.createElement('div',{style:{display:'flex',alignItems:'center',gap:4}},
          React.createElement('span',{className:'symbol',style:{color:'var(--glow-cyan)',textShadow:'var(--glow-cyan-md)',fontSize:13}},sign.sym),
          React.createElement('span',{style:{fontFamily:'var(--font-sans)',fontSize:9,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--fg-2)'}},sign.abbr)
        ),
        React.createElement('div',{
          style:{position:'absolute',top:6,right:8,fontFamily:'var(--font-mono)',fontSize:9,color:'var(--glow-lime)',fontWeight:700,letterSpacing:'0.05em',textShadow:'0 0 6px #9dff6f66'}
        }, `H${house}`),
        cellBodies.map(b => {
          const isSelected = b.key === selectedKey;
          const isLagna = b.key === 'Lagna';
          const p = PLANETS[b.key];
          return React.createElement('div',{
            key:b.key,
            onClick: () => onSelectBody && onSelectBody(b.key),
            style:{
              display:'flex',alignItems:'baseline',gap:4,
              cursor: onSelectBody ? 'pointer' : 'default',
              padding:'2px 4px', marginLeft:-4,
              borderRadius:3,
              background: isSelected ? 'rgba(255,93,224,0.12)' : 'transparent',
              transition:'background var(--dur-fast)'
            }
          },
            React.createElement('span',{className: isLagna ? 'symbol lagna-glyph' : 'symbol',style:{fontSize:14,color:p.color,textShadow:p.shadow,lineHeight:1}}, p.sym),
            React.createElement('span',{style:{fontSize:11,fontWeight:600,color: isLagna ? 'var(--glow-magenta)' : 'var(--fg-1)', textShadow: isLagna ? 'var(--glow-magenta-md)':'none'}}, p.short),
            React.createElement('span',{style:{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--fg-3)',marginLeft:'auto'}}, `${b.deg}°${b.min.toString().padStart(2,'0')}′`)
          );
        })
      );
    }))
  );
}

window.RasiChart = RasiChart;
