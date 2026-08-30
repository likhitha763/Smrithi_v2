import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, RefreshCw, ShoppingBag, Volume2, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { speakVoiceText, stopVoicePlayback } from '../../utils/voice';

export default function MemoryMatchGame() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('memorize'); // 'memorize' | 'select' | 'results'
  const [selectedItems, setSelectedItems] = useState([]);
  const [startTimeMs, setStartTimeMs] = useState(null);
  const [sessionResults, setSessionResults] = useState(null);
  const [selectedLanguage] = useState(() => localStorage.getItem('smrithi-voice-language') || 'en');

  const targetItems = [
    { id: 'tea', name: 'Assam Tea Leaves', icon: '🍃' },
    { id: 'bamboo', name: 'Tender Bamboo Shoots', icon: '🎍' },
    { id: 'ginger', name: 'Fresh Ginger Root', icon: '🫚' },
  ];

  const allMarketItems = [
    { id: 'tea', name: 'Assam Tea Leaves', icon: '🍃' },
    { id: 'bamboo', name: 'Tender Bamboo Shoots', icon: '🎍' },
    { id: 'ginger', name: 'Fresh Ginger Root', icon: '🫚' },
    { id: 'pineapple', name: 'Local Assam Pineapple', icon: '🍍' },
    { id: 'chilli', name: 'Bhut Jolokia Chilli', icon: '🌶️' },
    { id: 'lemongrass', name: 'Fresh Lemongrass', icon: '🌾' },
  ];

  // 1. Read the 3-item shopping list aloud when the list screen appears
  useEffect(() => {
    if (phase === 'memorize') {
      const itemsListText = `Shopping list for Sunday market: ${targetItems.map(i => i.name).join(', ')}.`;
      speakVoiceText(itemsListText, selectedLanguage);
    }
    return () => {
      stopVoicePlayback();
    };
  }, [phase, selectedLanguage]);

  const handleStartShopping = () => {
    soundFx.playSoftTap();
    setPhase('select');
    setStartTimeMs(Date.now());
    speakVoiceText('Select the items from our shopping list.', selectedLanguage);
  };

  const handleToggleSelect = (item) => {
    soundFx.playSoftTap();
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleDoneShopping = () => {
    soundFx.playSoftTap();
    const endTimeMs = Date.now();
    const responseTimeMs = startTimeMs ? endTimeMs - startTimeMs : 0;

    // Compute metrics
    const correct = targetItems.filter((t) => selectedItems.some((s) => s.id === t.id));
    const missed = targetItems.filter((t) => !selectedItems.some((s) => s.id === t.id));
    const wrong = selectedItems.filter((s) => !targetItems.some((t) => t.id === s.id));

    const logData = {
      correctCount: correct.length,
      missedCount: missed.length,
      wrongCount: wrong.length,
      totalSelected: selectedItems.length,
      responseTimeMs,
    };

    console.log('Memory Match Session Log:', logData);

    let feedbackMsg = `You remembered ${correct.length} of ${targetItems.length} — great job!`;
    if (correct.length === targetItems.length && wrong.length === 0) {
      feedbackMsg = `Wonderful! You remembered all ${targetItems.length} shopping items perfectly!`;
    } else if (missed.length > 0) {
      feedbackMsg += ` Next time, don't forget the ${missed.map((m) => m.name).join(', ')}.`;
    }

    setSessionResults({
      correct,
      missed,
      wrong,
      totalTarget: targetItems.length,
      feedbackMsg,
      logData,
    });

    setPhase('results');
    soundFx.playSuccess();

    // 2. Read results/feedback message aloud on results screen
    speakVoiceText(feedbackMsg, selectedLanguage);
  };

  const handlePlayAgain = () => {
    soundFx.playSoftTap();
    setSelectedItems([]);
    setSessionResults(null);
    setPhase('memorize');
  };

  return (
    <div style={styles.gameContainer}>
      {/* Top Navigation */}
      <div style={styles.topBar}>
        <button onClick={() => navigate('/games')} style={styles.backBtn}>
          <ArrowLeft size={22} /> <span style={{ marginLeft: '8px', fontWeight: '600' }}>Back to Games</span>
        </button>
      </div>

      <div style={styles.headerSection}>
        <h1 style={styles.gameTitle}>Memory Match — Weekly Bazaar</h1>
        <p style={styles.gameSubtitle}>
          Remember what we need from the market to prepare for the week.
        </p>
      </div>

      <div style={styles.cardBox}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src="/images/weekly_bazaar.png"
            alt="Handwoven shopping basket"
            style={styles.heroImg}
          />
        </div>

        {/* Phase 1: Memorize List */}
        {phase === 'memorize' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#175e24', fontWeight: '700', marginBottom: '16px' }}>
              🧺 Shopping List for Sunday Haat:
            </h2>
            <div style={styles.itemListRow}>
              {targetItems.map((item) => (
                <div key={item.id} style={styles.itemPill}>
                  <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#175e24' }}>{item.name}</span>
                </div>
              ))}
            </div>
            <button style={styles.primaryBtn} onClick={handleStartShopping}>
              I am ready for shopping 🛒
            </button>
          </div>
        )}

        {/* Phase 2: Unlimited Selectable Grid */}
        {phase === 'select' && (
          <div>
            <h2 style={{ fontSize: '1.15rem', color: '#1c2b20', marginBottom: '16px', textAlign: 'center' }}>
              Tap items you remember from our shopping list:
            </h2>
            <div style={styles.marketGrid}>
              {allMarketItems.map((item) => {
                const isSelected = selectedItems.some((s) => s.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleSelect(item)}
                    style={{
                      ...styles.marketCard,
                      border: isSelected ? '3px solid #175e24' : '2px solid #d4e8d6',
                      backgroundColor: isSelected ? '#eaf5eb' : '#ffffff',
                    }}
                  >
                    <span style={{ fontSize: '2.4rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#175e24', marginTop: '6px' }}>
                      {item.name}
                    </span>
                    {isSelected && (
                      <span style={styles.checkBadge}>
                        <CheckCircle2 size={16} color="#ffffff" /> Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Done Shopping Button below grid */}
            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <button
                style={{
                  ...styles.primaryBtn,
                  opacity: selectedItems.length >= 1 ? 1 : 0.45,
                  cursor: selectedItems.length >= 1 ? 'pointer' : 'not-allowed',
                }}
                disabled={selectedItems.length < 1}
                onClick={handleDoneShopping}
              >
                Done Shopping 🛍️ ({selectedItems.length} selected)
              </button>
            </div>
          </div>
        )}

        {/* Phase 3: Warm Non-Punishing Results */}
        {phase === 'results' && sessionResults && (
          <div style={styles.successBox}>
            <Sparkles size={40} color="#175e24" />
            <h2 style={{ fontSize: '1.35rem', color: '#175e24', fontWeight: '800' }}>
              {sessionResults.correct.length === sessionResults.totalTarget ? 'Wonderful Memory!' : 'Great Effort!'}
            </h2>

            <p style={{ fontSize: '1.1rem', color: '#2d6a4f', lineHeight: '1.5', maxWidth: '520px' }}>
              {sessionResults.feedbackMsg}
            </p>

            {/* Breakdown Summary */}
            <div style={styles.breakdownRow}>
              <div style={styles.breakdownStat}>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#175e24' }}>
                  {sessionResults.correct.length} / {sessionResults.totalTarget}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#526356' }}>Correct Items</span>
              </div>
              <div style={styles.breakdownStat}>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#a65e12' }}>
                  {sessionResults.missed.length}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#526356' }}>Missed</span>
              </div>
              <div style={styles.breakdownStat}>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#526356' }}>
                  {sessionResults.wrong.length}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#526356' }}>Extra Picks</span>
              </div>
            </div>

            <button style={{ ...styles.primaryBtn, marginTop: '20px' }} onClick={handlePlayAgain}>
              <RefreshCw size={20} style={{ marginRight: '8px' }} /> Play Again 🛍️
            </button>
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
  heroImg: {
    width: '100%',
    maxHeight: '220px',
    objectFit: 'cover',
    borderRadius: '16px',
  },
  itemListRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '28px',
  },
  itemPill: {
    backgroundColor: '#eaf5eb',
    border: '2px solid #175e24',
    borderRadius: '9999px',
    padding: '10px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  marketGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  marketCard: {
    borderRadius: '18px',
    padding: '20px 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  checkBadge: {
    marginTop: '8px',
    backgroundColor: '#175e24',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '9999px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  primaryBtn: {
    backgroundColor: '#175e24',
    color: '#ffffff',
    padding: '14px 32px',
    borderRadius: '9999px',
    fontSize: '1.05rem',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(23, 94, 36, 0.2)',
  },
  successBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: '20px',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '14px',
    border: '1px solid #c8e6c9',
  },
  breakdownRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginTop: '12px',
    backgroundColor: '#ffffff',
    padding: '16px 28px',
    borderRadius: '16px',
    border: '1px solid #d4e8d6',
  },
  breakdownStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
