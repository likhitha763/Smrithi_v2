import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { speakVoiceText } from '../../utils/voice';

export default function SequenceRecallGame() {
  const navigate = useNavigate();
  const [userTaps, setUserTaps] = useState(0);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedLanguage] = useState(() => localStorage.getItem('smrithi-voice-language') || 'en');

  const targetBeats = 3;

  const playBihuPattern = () => {
    setIsPlayingDemo(true);
    setUserTaps(0);
    setCompleted(false);
    speakVoiceText('Listen to the rhythm of traditional Bihu drum beats.', selectedLanguage);

    soundFx.playDrumBeat(1.0);
    setTimeout(() => soundFx.playDrumBeat(1.2), 350);
    setTimeout(() => soundFx.playDrumBeat(1.0), 700);

    setTimeout(() => {
      setIsPlayingDemo(false);
    }, 1000);
  };

  const handleDrumTap = () => {
    if (completed) return;
    soundFx.playDrumBeat(1.1);
    const nextCount = userTaps + 1;
    setUserTaps(nextCount);

    if (nextCount === targetBeats) {
      setTimeout(() => {
        soundFx.playSuccess();
        setCompleted(true);
        speakVoiceText('Joyful rhythm! You matched the Bihu drum beat!', selectedLanguage);
      }, 300);
    }
  };

  return (
    <div style={styles.gameContainer}>
      <div style={styles.topBar}>
        <button onClick={() => navigate('/games')} style={styles.backBtn}>
          <ArrowLeft size={22} /> <span style={{ marginLeft: '8px', fontWeight: '600' }}>Back to Games</span>
        </button>
      </div>

      <div style={styles.headerSection}>
        <h1 style={styles.gameTitle}>Sequence Recall — Bihu Rhythm Match</h1>
        <p style={styles.gameSubtitle}>
          Listen carefully and tap the rhythm of traditional Bihu drum beats.
        </p>
      </div>

      <div style={styles.cardBox}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <button style={styles.listenBtn} onClick={playBihuPattern} disabled={isPlayingDemo}>
            <Volume2 size={24} style={{ marginRight: '8px' }} />
            {isPlayingDemo ? 'Listening to Bihu Rhythm...' : 'Tap to Listen to Beat ♪'}
          </button>
        </div>

        <div onClick={handleDrumTap} style={styles.drumPad}>
          <img src="/images/rhythm_match.png" alt="Bihu Dhol Drum" style={styles.drumImg} />
          <div style={styles.drumOverlay}>
            <span style={{ fontSize: '3rem', marginBottom: '8px' }}>🥁</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
              Tap Bihu Drum ({userTaps} / {targetBeats})
            </span>
          </div>
        </div>

        {completed ? (
          <div style={{ ...styles.successBox, marginTop: '24px' }}>
            <CheckCircle2 size={36} color="#175e24" />
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#175e24', fontWeight: '700' }}>
                Joyful rhythm! You matched the Bihu drum beat!
              </h3>
              <p style={{ fontSize: '1.05rem', color: '#4a5c50', marginTop: '4px' }}>
                Your sense of music and traditional beats is wonderful.
              </p>
            </div>
            <button style={styles.primaryBtn} onClick={playBihuPattern}>
              Play Another Rhythm ♪
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#4a5c50', fontSize: '1.05rem' }}>
            Tap the drum 3 times to match the Bihu rhythm!
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
  listenBtn: {
    backgroundColor: '#175e24',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: '9999px',
    fontSize: '1.1rem',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
  },
  drumPad: {
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    cursor: 'pointer',
    height: '280px',
    boxShadow: '0 6px 20px rgba(23, 94, 36, 0.15)',
  },
  drumImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  drumOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(23, 94, 36, 0.45)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
