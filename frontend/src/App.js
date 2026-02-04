import { useState, useEffect, useRef } from "react";
import "./App.css";

const popupTypes = [
  { type: 'security', title: 'SECURITY ALERT', message: 'Suspicious activity detected.', buttons: ['OK', 'Cancel'] },
  { type: 'warning', title: 'WARNING', message: 'Your system files are corrupted.', buttons: ['Accept', 'Decline'] },
  { type: 'error', title: 'CRITICAL ERROR', message: 'Windows has encountered a fatal error.', buttons: ['Continue', 'Exit'] },
  { type: 'virus', title: '⚠️ VIRUS DETECTED', message: '37 threats found!', buttons: ['Clean Now', 'Ignore'] }
];

function App() {
  const [popups, setPopups] = useState([]);
  const [showFacebook, setShowFacebook] = useState(false);
  const popupCounter = useRef(0);

  const createPopup = () => {
    const randomType = popupTypes[Math.floor(Math.random() * popupTypes.length)];
    const newPopup = {
      id: popupCounter.current++,
      ...randomType,
      x: Math.random() * (window.innerWidth > 400 ? window.innerWidth - 400 : 100),
      y: Math.random() * (window.innerHeight > 300 ? window.innerHeight - 300 : 100),
    };
    setPopups(prev => [...prev, newPopup]);
  };

  useEffect(() => {
    setTimeout(() => createPopup(), 500);
    setTimeout(() => createPopup(), 1000);
  }, []);

  const handlePopupClick = (popupId) => {
    setPopups(prev => prev.filter(p => p.id !== popupId));
    
    // Create 2-3 new popups
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createPopup(), i * 200);
    }

    if (popupCounter.current > 10) {
      setShowFacebook(true);
    }
  };

  if (showFacebook) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', color: '#1877f2', fontWeight: 'bold', marginBottom: '20px' }}>facebook</div>
          <h2 style={{ color: '#1c1e21', fontSize: '24px' }}>Meta has temporarily deactivated your account.</h2>
          <button onClick={() => { for (let i = 0; i < 5; i++) createPopup(); }} style={{ padding: '12px 32px', backgroundColor: '#1877f2', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', margin: '20px 10px', cursor: 'pointer' }}>Accept</button>
          <button onClick={() => { for (let i = 0; i < 3; i++) createPopup(); }} style={{ padding: '12px 32px', backgroundColor: '#e4e6eb', color: '#050505', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' }}>Ignore</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px' }}>🎮 THE ULTIMATE POPUP TRAP 🎮</h1>
          <p>Popups created: {popupCounter.current}</p>
        </div>
      </div>

      {popups.map(popup => (
        <div
          key={popup.id}
          style={{
            left: popup.x,
            top: popup.y,
            position: 'fixed',
            zIndex: 1000 + popup.id,
            backgroundColor: 'white',
            border: '2px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            minWidth: '400px',
          }}
        >
          <div style={{ background: '#0066cc', color: 'white', padding: '8px 12px', borderRadius: '6px 6px 0 0' }}>
            <span style={{ fontWeight: 'bold' }}>{popup.title}</span>
          </div>
          <div style={{ padding: '20px' }}>
            <p style={{ margin: '0 0 20px 0', color: '#333' }}>{popup.message}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              {popup.buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePopupClick(popup.id)}
                  style={{
                    padding: '8px 20px',
                    backgroundColor: idx === 0 ? '#0066cc' : '#e0e0e0',
                    color: idx === 0 ? 'white' : '#333',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
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
