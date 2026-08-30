import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { speakVoiceText } from '../../utils/voice';

export default function FolkMotifGame() {
  const navigate = useNavigate();
  const [selectedLanguage] = useState(() => localStorage.getItem('smrithi-voice-language') || 'en');
  const [selectedMotif, setSelectedMotif] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const options = [
    { id: 'rhino', name: 'Kaziranga Rhino', icon: '🦏', desc: 'Symbol of strength & heritage', correct: true },
    { id: 'lotus', name: 'Lotus Flower', icon: '🪷', desc: 'Traditional floral weave', correct: false },
    { id: 'bamboo', name: 'Bamboo Basket', icon: '🧺', desc: 'Geometric lattice weave', correct: false },
  ];

  const handleSelectMotif = (opt) => {
    setSelectedMotif(opt.id);
    if (opt.correct) {
      soundFx.playSuccess();
      setIsCorrect(true);
      speakVoiceText('Beautiful weave! You completed the traditional Kaziranga Rhino motif pattern gracefully.', selectedLanguage);
    } else {
      soundFx.playSoftTap();
      setIsCorrect(false);
      speakVoiceText('That is a lovely motif, but let us try to find the Kaziranga Rhino motif to complete the row.', selectedLanguage);
    }
  };

  const handleReset = () => {
    soundFx.playSoftTap();
    setSelectedMotif(null);
    setIsCorrect(false);
  };

  return (
    <div style={styles.gameContainer}>
      <div style={styles.topBar}>
        <button onClick={() => navigate('/games')} style={styles.backBtn}>
          <ArrowLeft size={22} /> <span style={{ marginLeft: '8px', fontWeight: '600' }}>Back to Games</span>
        </button>
      </div>

      <div style={styles.headerSection}>
        <h1 style={styles.gameTitle}>Folk Motif Weaver</h1>
        <p style={styles.gameSubtitle}>
          Find the regional textile pattern that comes next to complete the silk Mekhela Chador.
        </p>
      </div>

      <div style={styles.cardBox}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src="/images/folk_motif.png"
            alt="Assamese Mekhela Chador motif"
            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '16px' }}
          />
        </div>

        <div style={styles.stripContainer}>
          <div style={styles.patternCell}>🦏 Rhino</div>
          <div style={styles.arrow}>→</div>
          <div style={styles.patternCell}>🦚 Peacock</div>
          <div style={styles.arrow}>→</div>
          <div style={styles.patternCell}>{isCorrect ? '🦏 Rhino' : '?'}</div>
        </div>

        {isCorrect ? (
          <div style={styles.successBox}>
            <CheckCircle2 size={36} color="#175e24" />
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#175e24', fontWeight: '700' }}>Beautiful Weave!</h3>
              <p style={{ fontSize: '1.05rem', color: '#4a5c50', marginTop: '4px' }}>
                You completed the traditional Kaziranga Rhino motif pattern gracefully.
              </p>
            </div>
            <button style={styles.primaryBtn} onClick={handleReset}>
              Weave Next Pattern 🌸
            </button>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1c2b20', marginBottom: '16px', textAlign: 'center' }}>
              Which motif comes next in the row?
            </h3>
            <div style={styles.optionsGrid}>
              {options.map((opt) => (
                <button key={opt.id} onClick={() => handleSelectMotif(opt)} style={styles.optionCard}>
                  <span style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{opt.icon}</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#175e24' }}>{opt.name}</span>
                  <span style={{ fontSize: '0.9rem', color: '#4a5c50', marginTop: '4px' }}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  gameContainer: {
    maxWidth: '820px',
    margin: '0 auto',
    paddingBottom: '100px',
  },
  topBar: {
    marginBottom: '16px',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#175e24',
    fontSize: '1rem',
    padding: '8px 18px',
    borderRadius: '9999px',
    backgroundColor: '#eaf5eb',
    border: '1px solid #d4e8d6',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  gameTitle: {
    fontSize: '2.1rem',
    fontWeight: '800',
    color: '#1c2b20',
  },
  gameSubtitle: {
    fontSize: '1.1rem',
    color: '#4a5c50',
    marginTop: '6px',
  },
  cardBox: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '32px',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-card)',
  },
  stripContainer: {
    backgroundColor: '#f0f9ee',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '28px',
  },
  patternCell: {
    backgroundColor: '#ffffff',
    border: '2px solid #175e24',
    borderRadius: '12px',
    padding: '12px 20px',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#175e24',
  },
  arrow: {
    fontSize: '1.5rem',
    color: '#175e24',
    fontWeight: 'bold',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  optionCard: {
    backgroundColor: '#ffffff',
    border: '2px solid #d4e8d6',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  },
  successBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: '20px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '16px',
  },
  primaryBtn: {
    backgroundColor: '#175e24',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: '9999px',
    fontSize: '1.05rem',
    fontWeight: '700',
  },
};
