import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, Strikethrough, ArrowUp, ArrowDown, ChevronsUp, ChevronsDown, Copy, Trash2 } from 'lucide-react';
import useEditorStore from '../store/useEditorStore';

const FONTS = ['Inter','Arial','Georgia','Courier New','Impact','Trebuchet MS','Times New Roman','Garamond','Verdana'];

const SWATCH_COLORS = [
  '#000','#fff','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899',
  '#6b7280','#374151','#1f2937','#7c3aed','#db2777','#dc2626','#059669','#0284c7',
];

function ColorBtn({ value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position:'relative' }}>
      <div onClick={() => setOpen(!open)} style={{ width:26, height:26, borderRadius:5, background:value||'#000', border:'1.5px solid #3a3a3a', cursor:'pointer', flexShrink:0, transition:'border-color 0.1s' }}
        onMouseEnter={e => e.currentTarget.style.borderColor='#555'} onMouseLeave={e => e.currentTarget.style.borderColor='#3a3a3a'} />
      {open && (
        <div style={{ position:'absolute', right:0, top:32, zIndex:9999, background:'#1e1e1e', border:'1px solid #2e2e2e', borderRadius:10, padding:12, width:180, boxShadow:'0 8px 32px rgba(0,0,0,0.5)' }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:10 }}>
            {SWATCH_COLORS.map(c => (
              <div key={c} onClick={() => { onChange(c); setOpen(false); }}
                style={{ width:22, height:22, borderRadius:4, background:c, cursor:'pointer', border: value===c?'2px solid #fff':'2px solid transparent' }} />
            ))}
          </div>
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            <input type="color" value={value||'#000000'} onChange={e => onChange(e.target.value)}
              style={{ width:28, height:26, border:'none', cursor:'pointer', borderRadius:4, padding:0 }} />
            <input type="text" value={value||''} onChange={e => { if(/^#[0-9a-f]{6}$/i.test(e.target.value)) onChange(e.target.value); }}
              className="inp inp-sm" style={{ flex:1 }} placeholder="#000000" />
          </div>
          <button onClick={() => setOpen(false)} style={{ marginTop:8, width:'100%', padding:'4px', background:'#2a2a2a', border:'none', borderRadius:5, color:'#888', cursor:'pointer', fontSize:10, fontFamily:'Inter,sans-serif' }}>Done</button>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
      <span style={{ fontSize:11, color:'#555', minWidth:52, flexShrink:0 }}>{label}</span>
      <div style={{ flex:1, display:'flex', justifyContent:'flex-end', gap:4 }}>{children}</div>
    </div>
  );
}

function Section({ title, children, defaultOpen=true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom:'1px solid #1e1e1e' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width:'100%', display:'flex', alignItems:'center', justify:'space-between', justifyContent:'space-between', padding:'9px 14px', background:'none', border:'none', cursor:'pointer', color:'#555', fontSize:10, fontWeight:600, letterSpacing:0.8, fontFamily:'Inter,sans-serif' }}>
        {title}
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </button>
      {open && <div style={{ padding:'0 14px 12px' }}>{children}</div>}
    </div>
  );
}

function TransformSection({ layer }) {
  const upd = useEditorStore(s => s.updateLayer);
  return (
    <Section title="TRANSFORM">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5, marginBottom:8 }}>
        {[['X','x'],['Y','y'],['W','width'],['H','height']].map(([lbl,key]) => (
          <div key={key}>
            <div style={{ fontSize:9, color:'#444', marginBottom:3, fontWeight:600 }}>{lbl}</div>
            <input type="number" className="num-inp" value={Math.round(layer[key])} onChange={e => upd(layer.id,{[key]:+e.target.value||0})} />
          </div>
        ))}
      </div>
      <Field label="Rotate">
        <input type="range" min={0} max={360} value={Math.round(layer.rotation||0)} onChange={e => upd(layer.id,{rotation:+e.target.value})} style={{ flex:1 }} />
        <input type="number" className="num-inp" style={{ width:46 }} value={Math.round(layer.rotation||0)} onChange={e => upd(layer.id,{rotation:+e.target.value||0})} />
      </Field>
      <Field label="Opacity">
        <input type="range" min={0} max={1} step={0.01} value={layer.opacity??1} onChange={e => upd(layer.id,{opacity:+e.target.value})} style={{ flex:1 }} />
        <span style={{ fontSize:10, color:'#666', minWidth:30, textAlign:'right' }}>{Math.round((layer.opacity??1)*100)}%</span>
      </Field>
    </Section>
  );
}

function TextSection({ layer }) {
  const upd = useEditorStore(s => s.updateLayer);
  const aligns = [
    { val:'left', Icon:AlignLeft },
    { val:'center', Icon:AlignCenter },
    { val:'right', Icon:AlignRight },
    { val:'justify', Icon:AlignJustify },
  ];
  const styles = [
    { key:'fontWeight', on:'700', off:'400', Icon:Bold },
    { key:'fontStyle', on:'italic', off:'normal', Icon:Italic },
    { key:'textDecoration', on:'underline', off:'none', Icon:Underline },
    { key:'textDecoration', on:'line-through', off:'none', Icon:Strikethrough },
  ];

  return (
    <Section title="TEXT">
      <Field label="Font">
        <select className="inp" style={{ fontSize:11 }} value={layer.fontFamily||'Inter'} onChange={e => upd(layer.id,{fontFamily:e.target.value})}>
          {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </Field>
      <div style={{ display:'flex', gap:5, marginBottom:7 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:9, color:'#444', marginBottom:3, fontWeight:600 }}>SIZE</div>
          <input type="number" className="num-inp" value={layer.fontSize||32} min={1} onChange={e => upd(layer.id,{fontSize:+e.target.value||12})} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:9, color:'#444', marginBottom:3, fontWeight:600 }}>LINE H.</div>
          <input type="number" className="num-inp" value={layer.lineHeight||1.2} step={0.1} min={0.5} onChange={e => upd(layer.id,{lineHeight:+e.target.value||1})} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:9, color:'#444', marginBottom:3, fontWeight:600 }}>SPACING</div>
          <input type="number" className="num-inp" value={layer.letterSpacing||0} min={-10} onChange={e => upd(layer.id,{letterSpacing:+e.target.value||0})} />
        </div>
      </div>
      <Field label="Color">
        <ColorBtn value={layer.textColor||'#000'} onChange={v => upd(layer.id,{textColor:v})} />
      </Field>
      <Field label="Align">
        <div style={{ display:'flex', gap:2 }}>
          {aligns.map(({val,Icon}) => (
            <button key={val} onClick={() => upd(layer.id,{textAlign:val})} className="btn-icon"
              style={{ width:26, height:26, background:(layer.textAlign||'left')===val?'#333':'transparent', color:(layer.textAlign||'left')===val?'#fff':'#555', borderRadius:5 }}>
              <Icon size={12} />
            </button>
          ))}
        </div>
      </Field>
      <Field label="Style">
        <div style={{ display:'flex', gap:2 }}>
          {styles.map(({key,on,off,Icon},i) => {
            const active = layer[key]===on;
            return (
              <button key={i} onClick={() => upd(layer.id,{[key]:active?off:on})} className="btn-icon"
                style={{ width:26, height:26, background:active?'#333':'transparent', color:active?'#fff':'#555', borderRadius:5 }}>
                <Icon size={12} />
              </button>
            );
          })}
        </div>
      </Field>
    </Section>
  );
}

function ShapeSection({ layer }) {
  const upd = useEditorStore(s => s.updateLayer);
  const SHAPES = ['rectangle','circle','triangle','diamond','star','pentagon','hexagon','arrow','heart','cross','chatbubble','parallelogram'];
  return (
    <Section title="SHAPE">
      <Field label="Type">
        <select className="inp" style={{ fontSize:11 }} value={layer.shapeType||'rectangle'} onChange={e => upd(layer.id,{shapeType:e.target.value})}>
          {SHAPES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
      </Field>
      <Field label="Fill"><ColorBtn value={layer.fill||'#e5e5e5'} onChange={v => upd(layer.id,{fill:v})} /></Field>
      <Field label="Stroke"><ColorBtn value={layer.stroke==='none'?'#000':(layer.stroke||'#000')} onChange={v => upd(layer.id,{stroke:v})} /></Field>
      <Field label="Stroke W.">
        <input type="number" className="num-inp" style={{ width:60 }} value={layer.strokeWidth||0} min={0} max={30}
          onChange={e => upd(layer.id,{strokeWidth:+e.target.value||0})} />
      </Field>
    </Section>
  );
}

function ImageSection({ layer }) {
  const upd = useEditorStore(s => s.updateLayer);
  return (
    <Section title="IMAGE">
      <Field label="Fit">
        <select className="inp" style={{ fontSize:11 }} value={layer.objectFit||'cover'} onChange={e => upd(layer.id,{objectFit:e.target.value})}>
          {['cover','contain','fill','none'].map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </Field>
      <Field label="Radius">
        <input type="range" min={0} max={50} value={layer.borderRadius||0} onChange={e => upd(layer.id,{borderRadius:+e.target.value})} style={{ flex:1 }} />
        <span style={{ fontSize:10, color:'#666', minWidth:28, textAlign:'right' }}>{layer.borderRadius||0}%</span>
      </Field>
    </Section>
  );
}

function LineSection({ layer }) {
  const upd = useEditorStore(s => s.updateLayer);
  return (
    <Section title="LINE">
      <Field label="Color"><ColorBtn value={layer.stroke||'#000'} onChange={v => upd(layer.id,{stroke:v})} /></Field>
      <Field label="Width">
        <input type="range" min={1} max={30} value={layer.strokeWidth||2} onChange={e => upd(layer.id,{strokeWidth:+e.target.value})} style={{ flex:1 }} />
        <span style={{ fontSize:10, color:'#666', minWidth:24 }}>{layer.strokeWidth||2}px</span>
      </Field>
      <Field label="Style">
        <select className="inp" style={{ fontSize:11 }} value={layer.lineStyle||'solid'} onChange={e => upd(layer.id,{lineStyle:e.target.value})}>
          {['solid','dashed','dotted'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
    </Section>
  );
}

function ArrangeSection() {
  const store = useEditorStore();
  const iconBtn = (Icon, action, label) => (
    <button onClick={action} title={label} className="btn-icon" style={{ flex:1, width:'auto', borderRadius:6, border:'1px solid #2e2e2e' }}>
      <Icon size={13} />
    </button>
  );
  return (
    <Section title="ARRANGE">
      <div style={{ display:'flex', gap:5, marginBottom:8 }}>
        {iconBtn(ChevronsUp, store.bringToFront, 'To Front')}
        {iconBtn(ArrowUp, store.bringForward, 'Bring Forward')}
        {iconBtn(ArrowDown, store.sendBackward, 'Send Backward')}
        {iconBtn(ChevronsDown, store.sendToBack, 'To Back')}
      </div>
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:9, color:'#444', fontWeight:600, marginBottom:5, letterSpacing:0.8 }}>ALIGN</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:4 }}>
          {[['⬅','left','Align Left'],['↔','centerH','Center H'],['➡','right','Align Right'],['⬆','top','Align Top'],['↕','centerV','Center V'],['⬇','bottom','Align Bottom']].map(([lbl,dir,title]) => (
            <button key={dir} onClick={() => store.alignLayers(dir)} title={title}
              style={{ padding:'5px 0', borderRadius:5, border:'1px solid #2e2e2e', background:'transparent', color:'#666', cursor:'pointer', fontSize:11, transition:'all 0.1s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#222'; e.currentTarget.style.color='#ccc'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#666'; }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display:'flex', gap:5 }}>
        <button onClick={store.duplicateSelectedLayers}
          style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:5, padding:'7px', borderRadius:6, border:'1px solid #2e2e2e', background:'#1e1e1e', color:'#888', cursor:'pointer', fontSize:11, fontFamily:'Inter,sans-serif', transition:'all 0.1s' }}
          onMouseEnter={e => { e.currentTarget.style.background='#252525'; e.currentTarget.style.color='#ccc'; }}
          onMouseLeave={e => { e.currentTarget.style.background='#1e1e1e'; e.currentTarget.style.color='#888'; }}>
          <Copy size={12} /> Duplicate
        </button>
        <button onClick={store.deleteSelectedLayers}
          style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:5, padding:'7px', borderRadius:6, border:'1px solid #3a1a1a', background:'#1a1010', color:'#c0392b', cursor:'pointer', fontSize:11, fontFamily:'Inter,sans-serif', transition:'all 0.1s' }}
          onMouseEnter={e => { e.currentTarget.style.background='#2a1010'; e.currentTarget.style.color='#e74c3c'; }}
          onMouseLeave={e => { e.currentTarget.style.background='#1a1010'; e.currentTarget.style.color='#c0392b'; }}>
          <Trash2 size={12} /> Delete
        </button>
      </div>
    </Section>
  );
}

export default function RightPanel() {
  const { selectedLayerIds, pages, currentPageIndex } = useEditorStore();
  const page = pages[currentPageIndex];
  const layer = page.layers.find(l => selectedLayerIds[0] === l.id);

  // Hidden when nothing selected
  if (!layer) return null;

  return (
    <div className="panel-right" style={{ width: 220, display:'flex', flexDirection:'column', zIndex:15, overflowY:'auto', flexShrink:0 }}>
      <div style={{ padding:'11px 14px 10px', borderBottom:'1px solid #1e1e1e', flexShrink:0, display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:12, fontWeight:600, color:'#ccc', textTransform:'capitalize' }}>{layer.type}</span>
        {selectedLayerIds.length > 1 && <span style={{ fontSize:10, color:'#555' }}>+{selectedLayerIds.length-1}</span>}
      </div>

      <TransformSection layer={layer} />
      {layer.type === 'text' && <TextSection layer={layer} />}
      {layer.type === 'shape' && <ShapeSection layer={layer} />}
      {layer.type === 'image' && <ImageSection layer={layer} />}
      {layer.type === 'line' && <LineSection layer={layer} />}
      <ArrangeSection />
    </div>
  );
}
