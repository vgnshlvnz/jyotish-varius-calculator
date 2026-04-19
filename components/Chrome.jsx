/* TopBar + Tabs chrome */

function TopBar() {
  return React.createElement('header',{
    style:{
      display:'flex',alignItems:'center',gap:14,
      padding:'14px 28px',
      borderBottom:'1px solid var(--color-border)',
      background:'rgba(11,13,26,0.7)',
      backdropFilter:'blur(12px)',
      position:'sticky', top:0, zIndex:100
    }
  },
    React.createElement('div',{className:'symbol',style:{fontSize:32,color:'var(--glow-gold)',textShadow:'var(--glow-gold-md)',lineHeight:1}},'\u2609'),
    React.createElement('div',null,
      React.createElement('div',{style:{fontFamily:'var(--font-display)',fontStyle:'italic',fontWeight:600,fontSize:22,color:'var(--fg-1)',lineHeight:1}}, 'Jyotiṣa '),
      React.createElement('div',{style:{fontFamily:'var(--font-sans)',fontSize:10,fontWeight:500,letterSpacing:'0.28em',color:'var(--glow-cyan)',textShadow:'var(--glow-cyan-sm)',marginTop:3}},'ĀRAMBHA')
    ),
    React.createElement('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}},
      React.createElement(Pill,{tone:'violet'}, 'Assignment #10'),
      React.createElement(Pill,{}, 'v. 1.0')
    )
  );
}

function Tabs({ active, onChange }) {
  const items = [
    { id:'calc', label:'Q1 Calculator', sym:'\u2609' },
    { id:'ref',  label:'Nakshatra & Pada Reference', sym:'\u2652' }
  ];
  return React.createElement('div',{
    style:{ display:'flex',gap:0,borderBottom:'1px solid var(--color-border)',marginBottom:22 }
  },
    items.map(it => {
      const isActive = it.id === active;
      return React.createElement('button',{
        key:it.id,
        onClick:()=>onChange(it.id),
        style:{
          padding:'12px 20px', fontSize:13, fontWeight:600,
          color: isActive ? 'var(--glow-cyan)' : 'var(--fg-3)',
          borderBottom: isActive ? '2px solid var(--glow-cyan)' : '2px solid transparent',
          background:'transparent', cursor:'pointer',
          textShadow: isActive ? 'var(--glow-cyan-sm)' : 'none',
          letterSpacing:'0.04em', display:'inline-flex', alignItems:'center', gap:8,
          marginBottom:-1, border:'none', borderBottomWidth:2, borderBottomStyle:'solid',
          borderBottomColor: isActive ? 'var(--glow-cyan)' : 'transparent',
          transition:'all var(--dur-fast) var(--ease-out)', fontFamily:'inherit'
        }
      },
        React.createElement('span',{className:'symbol',style:{fontSize:15}},it.sym),
        it.label
      );
    })
  );
}

function SectionHead({ eyebrow, title, right }) {
  return React.createElement('div',{
    style:{ display:'flex',alignItems:'baseline',gap:12,marginBottom:10 }
  },
    React.createElement('div',null,
      React.createElement('div',{className:'eyebrow'}, eyebrow),
      React.createElement('div',{style:{fontFamily:'var(--font-display)',fontWeight:600,fontSize:22,color:'var(--fg-1)',marginTop:2,fontStyle:'italic'}}, title)
    ),
    right && React.createElement('div',{style:{marginLeft:'auto'}}, right)
  );
}

window.TopBar = TopBar;
window.Tabs = Tabs;
window.SectionHead = SectionHead;
