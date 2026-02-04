import { useState, useEffect, useRef, useCallback } from "react";
import "@/App.css";

// Popup types defined outside component to avoid recreation
const popupTypes = [
  { type: 'security', title: 'SECURITY ALERT', message: 'Suspicious activity detected. Click OK to verify your identity.', buttons: ['OK', 'Cancel'] },
  { type: 'warning', title: 'WARNING', message: 'Your system files are corrupted. Accept to scan now.', buttons: ['Accept', 'Decline'] },
  { type: 'error', title: 'CRITICAL ERROR', message: 'Windows has encountered a fatal error. Click Continue to save your work.', buttons: ['Continue', 'Exit'] },
  { type: 'virus', title: '⚠️ VIRUS DETECTED', message: '37 threats found! Click Clean to remove immediately.', buttons: ['Clean Now', 'Ignore'] },
  { type: 'update', title: 'System Update Required', message: 'Your system is out of date. Install updates now?', buttons: ['Install', 'Remind Later'] },
  { type: 'prize', title: '🎉 CONGRATULATIONS!', message: 'You are the 1,000,000th visitor! Claim your prize now!', buttons: ['Claim Prize', 'No Thanks'] },
  { type: 'police', title: '🚨 FBI WARNING', message: 'Illegal activity detected from your IP address.', buttons: ['Pay Fine', 'Contact Lawyer'] },
  { type: 'hacker', title: 'SYSTEM COMPROMISED', message: 'Your webcam is being accessed by hackers. Disconnect now!', buttons: ['Disconnect', 'Ignore'] },
  { type: 'captcha', title: 'Verify You Are Human', message: 'Select all images with traffic lights', buttons: ['Verify', 'Skip'] },
  { type: 'download', title: 'Download Complete', message: 'virus.exe has finished downloading. Open file?', buttons: ['Open', 'Delete'] },
  { type: 'mac', title: 'macOS Alert', message: 'Your Mac is running slow. Optimize now?', buttons: ['Optimize', 'Cancel'] },
  { type: 'chrome', title: 'Chrome Security', message: 'Your passwords may have been compromised.', buttons: ['Check Now', 'Ignore'] },
  { type: 'paypal', title: 'PayPal Security', message: 'Unusual activity on your account. Verify identity.', buttons: ['Verify', 'Cancel'] },
  { type: 'amazon', title: 'Amazon Notice', message: 'Your order has been cancelled. Refund pending.', buttons: ['View Order', 'OK'] },
  { type: 'microsoft', title: 'Microsoft Account', message: 'Sign-in attempt from unknown location detected.', buttons: ['Verify', 'Ignore'] },
  { type: 'flash', title: 'Adobe Flash Player', message: 'Flash Player is out of date. Update required.', buttons: ['Update', 'Cancel'] },
  { type: 'java', title: 'Java Update Available', message: 'A newer version of Java is available.', buttons: ['Update', 'Later'] },
  { type: 'battery', title: '🔋 Battery Low', message: 'Your battery is critically low (1%). Plug in charger.', buttons: ['OK', 'Dismiss'] },
  { type: 'wifi', title: '📶 WiFi Disconnected', message: 'Lost connection to network. Reconnect?', buttons: ['Reconnect', 'Cancel'] },
  { type: 'backup', title: 'Backup Failed', message: 'Unable to complete system backup. Try again?', buttons: ['Retry', 'Cancel'] }
];

function App() {
  const [popups, setPopups] = useState([]);
  const [showFacebook, setShowFacebook] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);
  const [shake, setShake] = useState(false);
  const [flashScreen, setFlashScreen] = useState(false);
  const [rotateScreen, setRotateScreen] = useState(0);
  const audioRefs = useRef([]);
  const popupCounter = useRef(0);

  // Create popup function with useCallback
  const createPopup = useCallback(() => {
    const randomType = popupTypes[Math.floor(Math.random() * popupTypes.length)];
    const newPopup = {
      id: popupCounter.current++,
      ...randomType,
      x: Math.random() * (Math.max(100, window.innerWidth - 400)),
      y: Math.random() * (Math.max(100, window.innerHeight - 300)),
      moving: Math.random() < 0.4
    };
    setPopups(prev => [...prev, newPopup]);
  }, []);

  useEffect(() => {
    // Flood browser history
    for (let i = 0; i < 100; i++) {
      window.history.pushState({}, '', window.location.href);
    }

    // Block normal escape methods
    window.onbeforeunload = () => "Are you sure you want to leave? Unsaved changes will be lost!";
    
    // Block keyboard shortcuts
    const blockKeys = (e) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u') ||
        (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'j')) ||
        e.key === 'F5' ||
        (e.ctrlKey && e.key === 'r') ||
        (e.ctrlKey && e.key === 'w')
      ) {
        e.preventDefault();
        createPopup();
        return false;
      }
    };
    
    document.addEventListener('keydown', blockKeys);
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      createPopup();
    });

    // Start with initial popups
    setTimeout(() => createPopup(), 500);
    setTimeout(() => createPopup(), 1000);
    setTimeout(() => createPopup(), 1500);
    
    // Play annoying audio
    const playAnnoyingAudio = () => {
      const audioSources = [
        'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
        'https://www.soundjay.com/misc/sounds/fail-buzzer-03.mp3',
        'https://www.soundjay.com/button/sounds/beep-07.mp3'
      ];
      
      audioSources.forEach((src) => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0.3;
        audio.play().catch(() => {});
        audioRefs.current.push(audio);
      });
    };
    playAnnoyingAudio();
    
    // Random screen effects
    const effectInterval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.3) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      } else if (rand < 0.5) {
        setFlashScreen(true);
        setTimeout(() => setFlashScreen(false), 200);
      } else if (rand < 0.7) {
        setRotateScreen(Math.random() * 10 - 5);
        setTimeout(() => setRotateScreen(0), 1000);
      }
    }, 5000);

    // Cursor manipulation
    const cursorInterval = setInterval(() => {
      setCursorHidden(Math.random() < 0.3);
    }, 3000);

    // Try to lock pointer
    const handleClick = () => {
      document.body.requestPointerLock?.();
      document.body.requestFullscreen?.().catch(() => {});
    };
    document.body.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', blockKeys);
      document.body.removeEventListener('click', handleClick);
      clearInterval(effectInterval);
      clearInterval(cursorInterval);
    };
  }, [createPopup]);

  const playAnnoyingAudio = () => {
    const audioSources = [
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      'https://www.soundjay.com/misc/sounds/fail-buzzer-03.mp3',
      'https://www.soundjay.com/button/sounds/beep-07.mp3'
    ];
    
    audioSources.forEach((src, idx) => {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch(() => {});
      audioRefs.current.push(audio);
    });
  };

  const createPopup = () => {
    const randomType = popupTypes[Math.floor(Math.random() * popupTypes.length)];
    const newPopup = {
      id: popupCounter.current++,
      ...randomType,
      x: Math.random() * (window.innerWidth - 400),
      y: Math.random() * (window.innerHeight - 300),
      moving: Math.random() < 0.4
    };
    setPopups(prev => [...prev, newPopup]);
  };

  const handlePopupClick = (popupId, buttonIndex) => {
    setPopups(prev => prev.filter(p => p.id !== popupId));
    
    // Each click creates 2-5 new popups (exponential difficulty)
    const newPopupCount = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < newPopupCount; i++) {
      setTimeout(() => createPopup(), i * 200);
    }

    // Random effects on click
    if (Math.random() < 0.3) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    // After 50 popups have been closed, show Facebook
    if (popupCounter.current > 50) {
      setShowFacebook(true);
    }
  };

  const MovingPopup = ({ popup }) => {
    const [pos, setPos] = useState({ x: popup.x, y: popup.y });
    const moveInterval = useRef(null);

    useEffect(() => {
      if (popup.moving) {
        moveInterval.current = setInterval(() => {
          setPos(prev => ({
            x: Math.max(0, Math.min(window.innerWidth - 400, prev.x + (Math.random() - 0.5) * 50)),
            y: Math.max(0, Math.min(window.innerHeight - 300, prev.y + (Math.random() - 0.5) * 50))
          }));
        }, 500);
      }
      return () => clearInterval(moveInterval.current);
    }, [popup.moving]);

    // Fake close button that creates more popups
    const handleFakeClose = (e) => {
      e.stopPropagation();
      createPopup();
      createPopup();
      createPopup();
    };

    return (
      <div
        data-testid={`popup-${popup.id}`}
        className="popup"
        style={{
          left: pos.x,
          top: pos.y,
          position: 'fixed',
          zIndex: 1000 + popup.id,
          backgroundColor: 'white',
          border: '2px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          minWidth: '400px',
          maxWidth: '500px'
        }}
      >
        <div style={{
          background: popup.type === 'error' ? '#cc0000' : popup.type === 'warning' ? '#ff9800' : '#0066cc',
          color: 'white',
          padding: '8px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '6px 6px 0 0'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{popup.title}</span>
          <button 
            onClick={handleFakeClose}
            data-testid={`fake-close-${popup.id}`}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '0 8px'
            }}
          >×</button>
        </div>
        <div style={{ padding: '20px' }}>
          <p style={{ margin: '0 0 20px 0', color: '#333' }}>{popup.message}</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            {popup.buttons.map((btn, idx) => (
              <button
                key={idx}
                data-testid={`popup-button-${popup.id}-${idx}`}
                onClick={() => handlePopupClick(popup.id, idx)}
                style={{
                  padding: '8px 20px',
                  backgroundColor: idx === 0 ? '#0066cc' : '#e0e0e0',
                  color: idx === 0 ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (showFacebook) {
    return (
      <div data-testid="facebook-page" style={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', color: '#1877f2', fontWeight: 'bold', marginBottom: '20px' }}>
            facebook
          </div>
          <h2 style={{ color: '#1c1e21', fontSize: '24px', marginBottom: '20px' }}>
            Meta has temporarily deactivated your account.
          </h2>
          <p style={{ color: '#65676b', marginBottom: '30px' }}>
            We've detected unusual activity. Please verify your identity to continue.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button 
              data-testid="facebook-accept"
              onClick={() => {
                createPopup();
                createPopup();
                createPopup();
                createPopup();
                createPopup();
              }}
              style={{
                padding: '12px 32px',
                backgroundColor: '#1877f2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Accept
            </button>
            <button 
              data-testid="facebook-ignore"
              onClick={() => {
                createPopup();
                createPopup();
                createPopup();
              }}
              style={{
                padding: '12px 32px',
                backgroundColor: '#e4e6eb',
                color: '#050505',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      data-testid="main-trap"
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
        cursor: cursorHidden ? 'none' : 'default',
        transform: `rotate(${rotateScreen}deg)`,
        transition: 'transform 0.5s'
      }}
    >
      {shake && (
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          body { animation: shake 0.1s infinite; }
        `}</style>
      )}
      
      {flashScreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          zIndex: 99999,
          pointerEvents: 'none'
        }} />
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'white',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
            🎮 THE ULTIMATE POPUP TRAP 🎮
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.8 }}>
            Can you escape? 😈
          </p>
          <p style={{ fontSize: '14px', marginTop: '20px', opacity: 0.5 }}>
            Popups closed: {popupCounter.current} / 50
          </p>
        </div>
      </div>

      {popups.map(popup => (
        <MovingPopup key={popup.id} popup={popup} />
      ))}
    </div>
  );
}

export default App;
