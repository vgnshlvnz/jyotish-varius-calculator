/* ReferenceGrid + Lookup — all 12 signs, 108 padas */

function LookupBar({ state, setState, result }) {
  const set = (k,v) => setState({...state,[k]:v});
  const fieldStyle = { padding:'6px 8px', background:'var(--space)', color:'var(--fg-1)', border:'1px solid var(--color-border)', borderRadius:'var(--r-sm)', fontFamily:'var(--font-mono)', fontSize:12, outline:'none' };
  return React.createElement('div',{
    style:{ display:'flex',flexWrap:'wrap',gap:10,alignItems:'center', background:'var(--nebula)', border:'1px solid var(--color-border-strong)', padding:'12px 14px', borderRadius:'var(--r-md)', marginBottom:14 }
  },
    React.createElement('span',{className:'eyebrow',style:{marginRight:6}},'Lookup'),
    React.createElement('input',{type:'number',min:0,max:29,value:state.deg,onChange:e=>set('deg',parseFloat(e.target.value||0)),style:{...fieldStyle,width:60}}),
    React.createElement('span',{className:'caption'},'°'),
    React.createElement('select',{value:state.sign,onChange:e=>set('sign',e.target.value),style:{...fieldStyle,width:140}},
      SIGNS.map(s => React.createElement('option',{key:s.abbr,value:s.abbr},`${s.sym} ${s.abbr} — ${s.name}`))
    ),
    React.createElement('input',{type:'number',min:0,max:59,value:state.min,onChange:e=>set('min',parseFloat(e.target.value||0)),style:{...fieldStyle,width:60}}),
    React.createElement('span',{className:'caption'},'′'),
    React.createElement('input',{type:'number',min:0,max:59.99,step:0.01,value:state.sec,onChange:e=>set('sec',parseFloat(e.target.value||0)),style:{...fieldStyle,width:80}}),
    React.createElement('span',{className:'caption'},'″'),
    result && React.createElement('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}},
      React.createElement(Pill,{tone:'cyan'},result.nakshatra),
      React.createElement(Pill,{tone:'violet'},`${LORD_SHORT[result.nakLord]} · ${result.nakLord}`),
      React.createElement(Pill,{tone:'gold'},`Pada ${result.pada}`),
      React.createElement(Pill,{tone:'lime'},`Navamsa: ${result.navamsaSign.name}`)
    )
  );
}

function ReferenceGrid({ highlight }) {
  return React.createElement('div',{
    style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }
  },
    SIGNS.map((sign, s) => {
      const blocks = nakshatrasInSign(s);
      const isMatchSign = highlight && highlight.signIdx === s;
      return React.createElement('div',{
        key:sign.abbr,
        style:{
          background:'var(--nebula)',
          border: isMatchSign ? '1.5px solid var(--glow-cyan)' : '1px solid var(--color-border)',
          borderRadius:'var(--r-md)', padding:'10px 12px',
          boxShadow: isMatchSign ? 'var(--glow-cyan-md), var(--inset-top)' : 'var(--inset-top)',
          transition:'all var(--dur-med) var(--ease-out)'
        }
      },
        React.createElement('div',{style:{display:'flex',alignItems:'center',gap:8,paddingBottom:6,borderBottom:'1px solid var(--color-border)',marginBottom:8}},
          React.createElement('span',{className:'symbol',style:{fontSize:18,color:'var(--glow-cyan)',textShadow:'var(--glow-cyan-md)'}},sign.sym),
          React.createElement('span',{style:{fontFamily:'var(--font-display)',fontStyle:'italic',fontWeight:600,fontSize:14,color:'var(--fg-1)'}},sign.name),
          React.createElement('span',{style:{marginLeft:'auto',fontFamily:'var(--font-mono)',fontSize:9,color:'var(--fg-3)'}},'0°–30°')
        ),
        blocks.map(b =>
          React.createElement('div',{key:b.nakIdx,style:{marginBottom:8}},
            React.createElement('div',{style:{display:'flex',alignItems:'baseline',gap:6,marginBottom:4}},
              React.createElement('span',{style:{fontSize:11,fontWeight:600,color:'var(--fg-1)'}},b.nakshatra),
              React.createElement('span',{style:{fontSize:10,color:'var(--glow-violet)',textShadow:'var(--glow-violet-md)',fontFamily:'var(--font-mono)'}},`(${LORD_SHORT[b.lord]})`),
              React.createElement('span',{style:{marginLeft:'auto',fontFamily:'var(--font-mono)',fontSize:9,color:'var(--fg-3)'}},`${b.padas.length} pada${b.padas.length>1?'s':''}`)
            ),
            React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:3}},
              b.padas.map(p => {
                const match = highlight && highlight.signIdx===s && highlight.nakIdx===b.nakIdx && highlight.pada===p.pada;
                return React.createElement('div',{
                  key:p.pada,
                  style:{
                    background: match ? 'transparent' : 'var(--orbit)',
                    color: match ? 'var(--glow-gold)' : 'var(--fg-2)',
                    border: match ? '1px solid var(--glow-gold)' : '1px solid transparent',
                    textShadow: match ? 'var(--glow-gold-md)' : 'none',
                    boxShadow: match ? '0 0 12px var(--gold-a20)' : 'none',
                    fontFamily:'var(--font-mono)', fontSize:9,
                    padding:'3px 4px', borderRadius:2, textAlign:'center',
                    fontWeight: match ? 700 : 400,
                    animation: match ? 'pulse-gold 3s var(--ease-in-out) infinite' : 'none'
                  }
                }, `P${p.pada} ${fmtInSign(p.startInSign)}–${fmtInSign(p.endInSign)}`);
              })
            )
          )
        )
      );
    })
  );
}

window.LookupBar = LookupBar;
window.ReferenceGrid = ReferenceGrid;
