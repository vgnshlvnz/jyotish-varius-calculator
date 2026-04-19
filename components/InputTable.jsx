/* InputTable — planetary longitude editor */
const { useState: _useStateIT } = React;

function InputTable({ bodies, onChange }) {
  return React.createElement('div', {
    className: 'surface',
    style: { overflow:'hidden', borderRadius:'var(--r-md)' }
  },
    React.createElement('table', {
      style: {
        width:'100%', borderCollapse:'separate', borderSpacing:0,
        fontSize:12, background:'var(--nebula)'
      }
    },
      React.createElement('thead', null,
        React.createElement('tr', null,
          ['Body','Deg','Sign','Min','Sec','Decimal Longitude'].map(h =>
            React.createElement('th', {
              key:h,
              style:{
                padding:'9px 10px', textAlign:'left',
                background:'var(--orbit)', color:'var(--glow-cyan)',
                fontSize:10, fontWeight:600, letterSpacing:'0.14em',
                textTransform:'uppercase', textShadow:'var(--glow-cyan-sm)',
                borderBottom:'1px solid var(--color-border-strong)'
              }
            }, h)
          )
        )
      ),
      React.createElement('tbody', null,
        bodies.map((b, i) => {
          const p = PLANETS[b.key] || {};
          return React.createElement('tr', { key:b.key,
            style:{ borderBottom:'1px solid var(--color-border)' }
          },
            React.createElement('td', { style:tdStyle() },
              React.createElement('div',{style:{display:'flex',alignItems:'center',gap:8}},
                React.createElement(Glyph,{planet:b.key,size:16}),
                React.createElement('span',{style:{fontWeight:600,color:'var(--fg-1)'}},b.key)
              )
            ),
            React.createElement('td', { style:tdStyle() },
              numInput(b.deg, 0, 29, 1, v => onChange(i,'deg',v))
            ),
            React.createElement('td', { style:tdStyle() },
              React.createElement('select', {
                value:b.sign,
                onChange:e => onChange(i,'sign',e.target.value),
                style:selectStyle()
              }, SIGNS.map(s =>
                React.createElement('option',{key:s.abbr,value:s.abbr}, `${s.sym} ${s.abbr} — ${s.name}`)
              ))
            ),
            React.createElement('td',{style:tdStyle()},numInput(b.min,0,59,1,v=>onChange(i,'min',v))),
            React.createElement('td',{style:tdStyle()},numInput(b.sec,0,59.99,0.01,v=>onChange(i,'sec',v))),
            React.createElement('td',{style:{...tdStyle(),textAlign:'right',fontFamily:'var(--font-mono)',color:'var(--fg-2)',fontVariantNumeric:'tabular-nums'}},
              `${totalLon(b).toFixed(4)}°`
            )
          );
        })
      )
    )
  );
}

function tdStyle(){ return { padding:'6px 10px', borderBottom:'1px solid var(--color-border)', verticalAlign:'middle', color:'var(--fg-1)' }; }
function numInput(value, min, max, step, onChange){
  return React.createElement('input', {
    type:'number', value, min, max, step,
    onChange: e => onChange(parseFloat(e.target.value||0)),
    style:{
      width:'100%', padding:'5px 7px',
      background:'var(--space)', color:'var(--fg-1)',
      border:'1px solid var(--color-border)',
      borderRadius:'var(--r-sm)',
      fontFamily:'var(--font-mono)', fontSize:12,
      fontVariantNumeric:'tabular-nums', outline:'none'
    }
  });
}
function selectStyle(){
  return {
    width:'100%', padding:'5px 7px',
    background:'var(--space)', color:'var(--fg-1)',
    border:'1px solid var(--color-border)',
    borderRadius:'var(--r-sm)',
    fontFamily:'var(--font-sans)', fontSize:12, outline:'none'
  };
}

window.InputTable = InputTable;
