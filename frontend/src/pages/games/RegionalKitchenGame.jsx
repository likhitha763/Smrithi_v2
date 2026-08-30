import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { speakVoiceText } from '../../utils/voice';

export default function RegionalKitchenGame() {
  const navigate = useNavigate();
  const [selectedLanguage] = useState(() => localStorage.getItem('smrithi-voice-language') || 'en');

  const stepsTarget = [
    { id: 'kolakhar', name: 'Kolakhar Water', desc: 'Banana ash alkali extract' },
    { id: 'papaya', name: 'Raw Papaya', desc: 'Grated green omita' },
    { id: 'panchphoran', name: 'Mustard Oil & Panch Phoran', desc: 'Sizzled spices' },
    { id: 'coriander', name: 'Fresh Coriander', desc: 'Aromatic green garnish' },
  ];

  const availableIngredients = [
    { id: 'kolakhar', name: 'Filtered Kolakhar Water', icon: '🍶' },
    { id: 'papaya', name: 'Grated Raw Papaya', icon: '🍈' },
    { id: 'panchphoran', name: 'Mustard Oil & Panch Phoran', icon: '🫒' },
    { id: 'coriander', name: 'Fresh Coriander', icon: '🌿' },
  ];

  const [selectedSteps, setSelectedSteps] = useState([]);
  const [dishCompleted, setDishCompleted] = useState(false);

  const handleSelect = (item) => {
    if (selectedSteps.find((s) => s.id === item.id)) return;
    soundFx.playSoftTap();
    const updated = [...selectedSteps, item];
    setSelectedSteps(updated);

    if (updated.length === 4) {
      soundFx.playSuccess();
      setDishCompleted(true);
      speakVoiceText('Wonderful! Your Assamese Khar is ready! It smells delightful.', selectedLanguage);
    }
  };

  const handleReset = () => {
    soundFx.playSoftTap();
    setSelectedSteps([]);
    setDishCompleted(false);
  };

  return (
    <div style={styles.gameContainer}>
      <div style={styles.topBar}>
        <button onClick={() => navigate('/games')} style={styles.backBtn}>
          <ArrowLeft size={22} /> <span style={{ marginLeft: '8px', fontWeight: '600' }}>Back to Games</span>
        </button>
      </div>

      <div style={styles.headerSection}>
        <h1 style={styles.gameTitle}>Regional Kitchen — Assamese Khar</h1>
        <p style={styles.gameSubtitle}>
          Put the ingredients in order to prepare comforting <strong>Assamese Khar</strong>.
        </p>
      </div>

      <div style={styles.cardBox}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src="/images/kitchen_memories.png"
            alt="Assamese Khar dish in brass bowl"
            style={{ width: '100%', maxHeight: '240px', objectFit: 'cover', borderRadius: '16px' }}
          />
        </div>

        <div style={styles.slotContainer}>
          {stepsTarget.map((target, idx) => {
            const selected = selectedSteps[idx];
            return (
              <div key={target.id} style={styles.slotCard}>
                <div style={styles.slotNum}>Step {idx + 1}</div>
                <div style={styles.slotContent}>
                  {selected ? (
                    <span style={{ fontWeight: '700', color: '#175e24' }}>
                      {selected.icon} {selected.name}
                    </span>
                  ) : (
                    <span style={{ color: '#8aa090', fontStyle: 'italic' }}>Tap ingredient below</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {dishCompleted ? (
          <div style={styles.successBox}>
            <CheckCircle2 size={36} color="#175e24" />
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#175e24', fontWeight: '700' }}>
                Wonderful! Your Assamese Khar is ready!
              </h3>
              <p style={{ fontSize: '1.05rem', color: '#4a5c50', marginTop: '4px' }}>
                It smells delightful and brings warm memories of cozy family meals around the kitchen table.
              </p>
            </div>
            <button style={styles.primaryBtn} onClick={handleReset}>
              <RefreshCw size={20} style={{ marginRight: '8px' }} /> Prepare Dish Again
            </button>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1c2b20', marginBottom: '16px', textAlign: 'center' }}>
              Tap ingredients to add to cooking pot:
            </h3>
            <div style={styles.ingGrid}>
              {availableIngredients.map((item) => {
                const isUsed = selectedSteps.some((s) => s.id === item.id);
                return (
                  <button
                    key={item.id}
                    disabled={isUsed}
                    onClick={() => handleSelect(item)}
                    style={{
                      ...styles.ingCard,
                      opacity: isUsed ? 0.4 : 1,
                      border: isUsed ? '2px solid #ccc' : '2px solid #d4e8d6',
                    }}
                  >
                    <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#175e24' }}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
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
  slotContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '12px',
    marginBottom: '24px',
  },
  slotCard: {
    backgroundColor: '#f4fbf5',
    border: '1.5px dashed #a8d5af',
    borderRadius: '16px',
    padding: '12px',
    minHeight: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  slotNum: {
    fontSize: '0.85rem',
    color: '#4a5c50',
    fontWeight: '600',
    marginBottom: '4px',
  },
  slotContent: {
    fontSize: '0.95rem',
  },
  ingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  ingCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    minHeight: '110px',
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
