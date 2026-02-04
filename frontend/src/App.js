import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const POPUP_TYPES = [
  { type: 'security', title: 'SECURITY ALERT', message: 'Suspicious activity detected. Click OK to verify.', buttons: ['OK', 'Cancel'] },
  { type: 'warning', title: 'WARNING', message: 'System files corrupted. Accept to scan.', buttons: ['Accept', 'Decline'] },
  { type: 'error', title: 'CRITICAL ERROR', message: 'Fatal error detected. Click Continue.', buttons: ['Continue', 'Exit'] },
  { type: 'virus', title: '⚠️ VIRUS DETECTED', message: '37 threats found! Clean now!', buttons: ['Clean Now', 'Ignore'] },
  { type: 'update', title: 'System Update', message: 'Update required. Install now?', buttons: ['Install', 'Later'] },
  { type: 'prize', title: '🎉 CONGRATULATIONS!', message: 'You won $1,000,000!', buttons: ['Claim', 'No'] },
  { type: 'police', title: '🚨 FBI WARNING', message: 'Illegal activity detected!', buttons: ['Pay Fine', 'Lawyer'] },
  { type: 'download', title: 'Download Complete', message: 'virus.exe downloaded. Open?', buttons: ['Open', 'Delete'] }
];

function App() {
  const [popups, setPopups] = useState([]);
  const [showFB, setShowFB] = useState(false);
  const counter = useRef(0);

  const addPopup = () => {
    const type = POPUP_TYPES[Math.floor(Math.random() * POPUP_TYPES.length)];
    setPopups(p => [...p, {
      id: counter.current++,
      ...type,
      x: Math.random() * Math.max(100, window.innerWidth - 450),
      y: Math.random() * Math.max(100, window.innerHeight - 250)
    }]);
  };

  useEffect(() => {
    for (let i = 0; i < 100; i++) window.history.pushState({}, '', window.location.href);
    window.onbeforeunload = () => "Leave? Unsaved changes!";
    
    const block = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        addPopup();
      }
    };
    
    document.addEventListener('keydown', block);
    document.addEventListener('contextmenu', (e) => { e.preventDefault(); addPopup(); });
    
    setTimeout(addPopup, 500);
    setTimeout(addPopup, 1000);
    
    return () => {
      document.removeEventListener('keydown', block);
    };
  }, []);

  const close = (id) => {
    setPopups(p => p.filter(x => x.id !== id));
    for (let i = 0; i < 3; i++) setTimeout(addPopup, i * 200);
    if (counter.current > 15) setShowFB(true);
  };

  if (showFB) {
    return (
      <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px', maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', color: '#1877f2', fontWeight: 'bold', marginBottom: '20px' }}>facebook</div>
          <h2 style={{ color: '#1c1e21', fontSize: '24px', marginBottom: '15px' }}>Meta has temporarily deactivated your account.</h2>
          <p style={{ color: '#65676b', marginBottom: '25px' }}>Unusual activity detected. Verify identity.</p>
          <button onClick={() => { for (let i = 0; i < 5; i++) addPopup(); }} style={{ padding: '12px 32px', background: '#1877f2', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', margin: '0 6px' }}>Accept</button>
          <button onClick={() => { for (let i = 0; i < 3; i++) addPopup(); }} style={{ padding: '12px 32px', background: '#e4e6eb', color: '#050505', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', margin: '0 6px' }}>Ignore</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'white', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🎮 THE ULTIMATE POPUP TRAP 🎮</h1>
          <p style={{ fontSize: '20px', opacity: 0.8 }}>Can you escape? 😈</p>
          <p style={{ fontSize: '14px', marginTop: '15px', opacity: 0.5 }}>Popups: {counter.current}</p>
        </div>
      </div>

      {popups.map(p => (
        <div key={p.id} style={{ position: 'fixed', left: p.x, top: p.y, zIndex: 1000 + p.id, background: 'white', border: '2px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', minWidth: '400px', maxWidth: '500px' }}>
          <div style={{ background: p.type === 'error' ? '#cc0000' : p.type === 'warning' ? '#ff9800' : '#0066cc', color: 'white', padding: '8px 12px', borderRadius: '6px 6px 0 0', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{p.title}</span>
            <button onClick={() => { addPopup(); addPopup(); addPopup(); }} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
          </div>
          <div style={{ padding: '20px' }}>
            <p style={{ margin: '0 0 20px 0', color: '#333' }}>{p.message}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              {p.buttons.map((btn, idx) => (
                <button key={idx} onClick={() => close(p.id)} style={{ padding: '8px 20px', background: idx === 0 ? '#0066cc' : '#e0e0e0', color: idx === 0 ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
