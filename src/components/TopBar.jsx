import React, { useState } from 'react';
import { Download, Share2, Grid3x3, Undo2, Redo2, ChevronDown, Pen } from 'lucide-react';
import useEditorStore from '../store/useEditorStore';
import ExportModal from './ExportModal';

const SIZE_PRESETS = [
  { label: 'Presentation (16:9)', w: 1280, h: 720 },
  { label: 'Instagram Post', w: 1080, h: 1080 },
  { label: 'Instagram Story', w: 1080, h: 1920 },
  { label: 'Facebook Post', w: 1200, h: 630 },
  { label: 'Twitter Post', w: 1600, h: 900 },
  { label: 'A4 Portrait', w: 794, h: 1123 },
  { label: 'A4 Landscape', w: 1123, h: 794 },
  { label: 'YouTube Thumbnail', w: 1280, h: 720 },
  { label: 'Business Card', w: 1050, h: 600 },
];

function SizeModal({ onClose }) {
  const { setPageSize, getCurrentPage } = useEditorStore();
  const page = getCurrentPage();
  const [w, setW] = useState(page.width);
  const [h, setH] = useState(page.height);

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 12, padding: 24, width: 340, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: '#e5e5e5' }}>Canvas Size</span>
          <button onClick={onClose} className="btn-icon"><span style={{ fontSize: 16 }}>✕</span></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 16, maxHeight: 260, overflowY: 'auto' }}>
          {SIZE_PRESETS.map(p => (
            <div key={p.label} onClick={() => { setPageSize(p.w, p.h); onClose(); }}
              style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 7, cursor: 'pointer', transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#222'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontSize: 13, color: '#ccc' }}>{p.label}</span>
              <span style={{ fontSize: 11, color: '#555', fontFamily: 'monospace' }}>{p.w}×{p.h}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #242424', paddingTop: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: '#555', marginBottom: 4, fontWeight: 600 }}>WIDTH</div>
              <input type="number" className="inp" value={w} onChange={e => setW(+e.target.value)} min={1} max={8000} />
            </div>
            <span style={{ color: '#444', marginTop: 16, fontSize: 14 }}>×</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: '#555', marginBottom: 4, fontWeight: 600 }}>HEIGHT</div>
              <input type="number" className="inp" value={h} onChange={e => setH(+e.target.value)} min={1} max={8000} />
            </div>
          </div>
          <button onClick={() => { setPageSize(w, h); onClose(); }}
            style={{ width: '100%', padding: '9px', borderRadius: 8, border: 'none', background: '#fff', color: '#111', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TopBar() {
  const { zoom, setZoom, showGrid, toggleGrid, pages, getCurrentPage, documentName, setDocumentName } = useEditorStore();
  const page = getCurrentPage();
  const [showExport, setShowExport] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [editName, setEditName] = useState(false);

  const IconBtn = ({ icon: Icon, label, onClick, active }) => (
    <button onClick={onClick} title={label} className={`btn-icon ${active ? 'active' : ''}`}>
      <Icon size={15} />
    </button>
  );

  return (
    <>
      <div className="topbar" style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 4, flexShrink: 0, zIndex: 30 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8 }}>
          <div style={{ width: 28, height: 28, background: '#fff', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Pen size={14} color="#111" strokeWidth={2.5} />
          </div>
          {editName
            ? <input autoFocus value={documentName} onChange={e => setDocumentName(e.target.value)}
                onBlur={() => setEditName(false)} onKeyDown={e => e.key === 'Enter' && setEditName(false)}
                style={{ background: '#222', border: '1px solid #444', borderRadius: 6, color: '#fff', padding: '3px 8px', fontSize: 13, fontWeight: 500, outline: 'none', fontFamily: 'Inter, sans-serif', width: 160 }} />
            : <button onDoubleClick={() => setEditName(true)}
                style={{ background: 'none', border: 'none', color: '#e5e5e5', fontSize: 13, fontWeight: 500, cursor: 'text', padding: 0, fontFamily: 'Inter, sans-serif' }}>
              {documentName}
              </button>
          }
        </div>

        <div style={{ width: 1, height: 18, background: '#2e2e2e', margin: '0 4px' }} />

        {/* History */}
        <IconBtn icon={Undo2} label="Undo (Ctrl+Z)" onClick={() => {}} />
        <IconBtn icon={Redo2} label="Redo (Ctrl+Y)" onClick={() => {}} />

        <div style={{ width: 1, height: 18, background: '#2e2e2e', margin: '0 4px' }} />

        {/* View */}
        <IconBtn icon={Grid3x3} label="Toggle Grid" onClick={toggleGrid} active={showGrid} />

        {/* Canvas size */}
        <button onClick={() => setShowSize(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', borderRadius: 7, border: 'none', background: 'transparent', color: '#888', cursor: 'pointer', fontSize: 11, fontFamily: 'Inter, sans-serif', transition: 'all 0.12s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#222'; e.currentTarget.style.color = '#ccc'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888'; }}>
          {page.width}×{page.height}
          <ChevronDown size={11} />
        </button>

        <div style={{ width: 1, height: 18, background: '#2e2e2e', margin: '0 4px' }} />

        {/* Zoom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <button onClick={() => setZoom(Math.max(0.1, zoom - 0.25))} className="btn-icon" style={{ width: 26, height: 26 }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>−</span>
          </button>
          <select value={Math.round(zoom * 100) / 100} onChange={e => setZoom(parseFloat(e.target.value))}
            style={{ background: '#1e1e1e', border: '1px solid #2e2e2e', color: '#ccc', borderRadius: 6, padding: '3px 4px', fontSize: 11, cursor: 'pointer', outline: 'none', width: 60, textAlign: 'center' }}>
            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3].map(z => <option key={z} value={z}>{Math.round(z * 100)}%</option>)}
          </select>
          <button onClick={() => setZoom(Math.min(5, zoom + 0.25))} className="btn-icon" style={{ width: 26, height: 26 }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
          </button>
        </div>

        <div style={{ flex: 1 }} />

        {/* Actions */}
        <button onClick={() => setShowExport(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 7, border: '1px solid #2e2e2e', background: '#1e1e1e', color: '#ccc', cursor: 'pointer', fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif', transition: 'all 0.12s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#252525'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#1e1e1e'; e.currentTarget.style.color = '#ccc'; }}>
          <Download size={13} />
          Export
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 7, border: 'none', background: '#fff', color: '#111', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif', marginLeft: 6 }}>
          <Share2 size={13} />
          Share
        </button>
      </div>
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
      {showSize && <SizeModal onClose={() => setShowSize(false)} />}
    </>
  );
}
