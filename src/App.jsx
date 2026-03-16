import React from 'react';
import TopBar from './components/TopBar';
import LeftToolbar from './components/LeftToolbar';
import LeftPanel from './components/LeftPanel';
import Canvas from './components/Canvas';
import RightPanel from './components/RightPanel';
import PagesPanel from './components/PagesPanel';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#111' }}>
      <TopBar />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <LeftToolbar />
        <LeftPanel />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Canvas />
          <PagesPanel />
        </div>
        <RightPanel />
      </div>
    </div>
  );
}
