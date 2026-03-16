import React from 'react';
import { MousePointer2, Type, Pencil, Shapes, TextSelect, Smile, Upload, Image, Palette, Layers } from 'lucide-react';
import useEditorStore from '../store/useEditorStore';

const tools = [
  { id: 'select', Icon: MousePointer2, label: 'Select', toolId: true },
  { id: 'text-tool', Icon: Type, label: 'Text', toolId: true, tool: 'text' },
  { id: 'draw', Icon: Pencil, label: 'Draw', toolId: true },
];

const panels = [
  { id: 'elements', Icon: Shapes, label: 'Elements' },
  { id: 'text', Icon: TextSelect, label: 'Text' },
  { id: 'emojis', Icon: Smile, label: 'Emojis' },
  { id: 'uploads', Icon: Upload, label: 'Uploads' },
  { id: 'photos', Icon: Image, label: 'Photos' },
  { id: 'background', Icon: Palette, label: 'Background' },
];

export default function LeftToolbar() {
  const { activeTool, activePanel, setActiveTool, setActivePanel } = useEditorStore();

  return (
    <div className="panel" style={{ width: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 6px', gap: 2, flexShrink: 0, zIndex: 20 }}>
      {/* Tools */}
      {tools.map(({ id, Icon, label, tool }) => {
        const isActive = activeTool === (tool || id);
        return (
          <button key={id} title={label}
            onClick={() => setActiveTool(tool || id)}
            className={`tool-btn ${isActive ? 'active' : ''}`}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        );
      })}

      <div className="sep" style={{ width: '70%', margin: '6px 0' }} />

      {/* Panels */}
      {panels.map(({ id, Icon, label }) => {
        const isActive = activePanel === id;
        return (
          <button key={id} title={label}
            onClick={() => setActivePanel(id)}
            className={`tool-btn ${isActive ? 'active' : ''}`}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        );
      })}

      <div style={{ flex: 1 }} />

      {/* Layers at bottom */}
      <button title="Layers" onClick={() => setActivePanel('layers')}
        className={`tool-btn ${activePanel === 'layers' ? 'active' : ''}`}>
        <Layers size={18} />
        <span>Layers</span>
      </button>
    </div>
  );
}
