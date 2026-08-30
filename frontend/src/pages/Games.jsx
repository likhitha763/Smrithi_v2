import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { soundFx } from '../utils/audio';
import VoiceLanguagePanel from '../components/VoiceLanguagePanel';

export default function Games() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('smrithi-voice-language') || 'en');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('smrithi-voice-language', language);
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <header style={styles.header}>
        <h1 style={styles.pageTitle}>Play & Remember</h1>
        <p style={styles.subtitle}>
          Take a gentle journey through familiar memories and activities.
        </p>
      </header>

      <VoiceLanguagePanel selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />

      {/* Grid of 5 games matching distinct routes */}
      <div style={styles.playGrid}>
        {/* Game 1: Memory Match */}
        <div style={styles.playCard}>
          <div style={styles.iconCircleBig}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="10" height="14" x="3" y="3" rx="2" />
              <rect width="10" height="14" x="11" y="7" rx="2" />
            </svg>
          </div>
          <h2 style={styles.cardHeaderTitle}>Memory Match</h2>
          <p style={styles.cardHeaderDesc}>Remember, find and match.</p>
          <button 
            className="btn-primary" 
            style={styles.cardStartBtn}
            onClick={() => {
              soundFx.playSoftTap();
              navigate('/games/memory-match');
            }}
          >
            Start <span style={{ marginLeft: '6px' }}>→</span>
          </button>
        </div>

        {/* Game 2: Recognition */}
        <div style={styles.playCard}>
          <div style={styles.iconCircleBig}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" x2="9.01" y1="9" y2="9" />
              <line x1="15" x2="15.01" y1="9" y2="9" />
            </svg>
          </div>
          <h2 style={styles.cardHeaderTitle}>Recognition</h2>
          <p style={styles.cardHeaderDesc}>Recognize familiar people and places.</p>
          <button 
            className="btn-primary" 
            style={styles.cardStartBtn}
            onClick={() => {
              soundFx.playSoftTap();
              navigate('/games/recognition');
            }}
          >
            Start <span style={{ marginLeft: '6px' }}>→</span>
          </button>
        </div>

        {/* Game 3: Sequence Recall */}
        <div style={styles.playCard}>
          <div style={styles.iconCircleBig}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m17 2 4 4-4 4" />
              <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
              <path d="m7 22-4-4 4-4" />
              <path d="M21 13v1a4 4 0 0 1-4 4H3" />
            </svg>
          </div>
          <h2 style={styles.cardHeaderTitle}>Sequence Recall</h2>
          <p style={styles.cardHeaderDesc}>Watch, remember and repeat.</p>
          <button 
            className="btn-primary" 
            style={styles.cardStartBtn}
            onClick={() => {
              soundFx.playSoftTap();
              navigate('/games/sequence-recall');
            }}
          >
            Start <span style={{ marginLeft: '6px' }}>→</span>
          </button>
        </div>

        {/* Game 4: Folk Motif */}
        <div style={styles.playCard}>
          <div style={styles.iconCircleBig}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M3 15h18" />
              <path d="M9 3v18" />
              <path d="M15 3v18" />
            </svg>
          </div>
          <h2 style={styles.cardHeaderTitle}>Folk Motif</h2>
          <p style={styles.cardHeaderDesc}>Complete a beautiful traditional pattern.</p>
          <button 
            className="btn-primary" 
            style={styles.cardStartBtn}
            onClick={() => {
              soundFx.playSoftTap();
              navigate('/games/folk-motif');
            }}
          >
            Start <span style={{ marginLeft: '6px' }}>→</span>
          </button>
        </div>

        {/* Game 5: Regional Kitchen */}
        <div style={styles.playCard}>
          <div style={styles.iconCircleBig}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v9" />
              <path d="M4 11h16a2 2 0 0 1 2 2v2a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6v-2a2 2 0 0 1 2-2Z" />
              <path d="M8 7V3" />
              <path d="M16 7V3" />
            </svg>
          </div>
          <h2 style={styles.cardHeaderTitle}>Regional Kitchen</h2>
          <p style={styles.cardHeaderDesc}>Remember the order and prepare the dish.</p>
          <button 
            className="btn-primary" 
            style={styles.cardStartBtn}
            onClick={() => {
              soundFx.playSoftTap();
              navigate('/games/regional-kitchen');
            }}
          >
            Start <span style={{ marginLeft: '6px' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* STYLES                                                                     */
/* ========================================================================== */
const styles = {
  playGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    marginTop: '12px',
  },
  playCard: {
    backgroundColor: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    padding: '36px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: 'var(--shadow-card)',
    gap: '16px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  iconCircleBig: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#e2f5e4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--primary-green)',
    marginBottom: '8px',
  },
  cardHeaderTitle: {
    fontSize: '1.45rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  cardHeaderDesc: {
    fontSize: '0.98rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    fontWeight: '500',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStartBtn: {
    width: '100%',
    marginTop: '8px',
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    borderRadius: '50px',
    padding: '12px 24px',
    fontWeight: '700',
    fontSize: '1rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  pageTitle: {
    fontSize: '2.1rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  gamesGridLayout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  largeGameCard: {
    gridColumn: 'span 2',
    backgroundColor: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    overflow: 'hidden',
    display: 'flex',
    boxShadow: 'var(--shadow-card)',
    minHeight: '320px',
  },
  largeCardImageCol: {
    flex: 1,
    height: '100%',
    minWidth: '220px',
  },
  largeCardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  largeCardContentCol: {
    flex: 1,
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '14px',
  },
  gameCardTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  gameCardDesc: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    fontWeight: '500',
  },
  smallGameCard: {
    backgroundColor: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '340px',
  },
  smallCardImageWrapper: {
    height: '140px',
    width: '100%',
    overflow: 'hidden',
  },
  smallCardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  smallCardIconWrapper: {
    height: '140px',
    backgroundColor: 'var(--secondary-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicNoteGraphic: {
    fontSize: '3.5rem',
  },
  smallCardContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
  smallCardTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  smallCardDesc: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    fontWeight: '500',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xl)',
    paddingBottom: '100px',
  },
  header: {
    marginBottom: 'var(--spacing-sm)',
  },
  greetingTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: 'var(--text-2xl)',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  leafIcon: {
    fontSize: '1.8rem',
  },
  subtitle: {
    fontSize: 'var(--text-lg)',
    color: 'var(--text-secondary)',
  },
  recommendBanner: {
    backgroundColor: '#d8f3dc',
    borderRadius: 'var(--radius-full)',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    boxShadow: 'var(--shadow-sm)',
  },
  recommendLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  heartCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendTag: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#175e24',
  },
  recommendText: {
    fontSize: '0.95rem',
    color: '#2d6a4f',
  },
  recommendBtn: {
    backgroundColor: '#175e24',
    color: '#ffffff',
    padding: '10px 24px',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.95rem',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: '44px',
  },
  featuredSection: {
    marginTop: 'var(--spacing-sm)',
  },
  featuredCard: {
    backgroundColor: 'var(--surface-color)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-xl)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-xl)',
    alignItems: 'center',
    boxShadow: 'var(--shadow-sm)',
  },
  featuredImageWrapper: {
    width: '100%',
    height: '280px',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  featuredContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'var(--spacing-md)',
  },
  featuredBadge: {
    backgroundColor: '#e8f5e9',
    color: '#175e24',
    fontSize: '0.9rem',
    fontWeight: '600',
    padding: '6px 16px',
    borderRadius: 'var(--radius-full)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  featuredTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  featuredDesc: {
    fontSize: 'var(--text-base)',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
  startFeaturedBtn: {
    backgroundColor: '#175e24',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: 'var(--radius-full)',
    fontSize: '1.1rem',
    fontWeight: '600',
    minHeight: '52px',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: 'var(--spacing-lg)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--spacing-lg)',
  },
  card: {
    backgroundColor: 'var(--surface-color)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-xl)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: 'var(--shadow-sm)',
    gap: 'var(--spacing-md)',
  },
  iconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#d8eed6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.35rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  cardDesc: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    flexGrow: 1,
  },
  cardBtn: {
    backgroundColor: '#d8eed6',
    color: '#175e24',
    padding: '14px 24px',
    borderRadius: 'var(--radius-full)',
    fontSize: '1.05rem',
    fontWeight: '700',
    width: '100%',
    minHeight: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  footer: {
    marginTop: 'var(--spacing-2xl)',
    borderTop: '1px solid #d4e8d6',
    paddingTop: 'var(--spacing-xl)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'var(--spacing-md)',
  },
  footerTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  footerLogo: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#175e24',
    letterSpacing: '1px',
  },
  footerCopy: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  footerLinks: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    flexWrap: 'wrap',
  },
};

const gameStyles = {
  gameContainer: {
    maxWidth: '800px',
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
    fontSize: '1.1rem',
    padding: '8px 16px',
    borderRadius: '9999px',
    backgroundColor: '#eaf5eb',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  gameTitle: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#1c2b20',
  },
  gameSubtitle: {
    fontSize: '1.25rem',
    color: '#4a5c50',
    marginTop: '6px',
  },
  cardBox: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 4px 16px rgba(23, 94, 36, 0.08)',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  mainPhoto: {
    width: '100%',
    maxHeight: '450px',
    objectFit: 'cover',
    display: 'block',
  },
  targetOverlay: {
    position: 'absolute',
    right: '18%',
    top: '25%',
    width: '160px',
    height: '240px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '16px',
    transition: 'all 0.2s ease',
  },
  tapBadge: {
    backgroundColor: '#ffffff',
    color: '#175e24',
    padding: '8px 16px',
    borderRadius: '9999px',
    fontSize: '0.95rem',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  hintBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 28px',
    borderRadius: '9999px',
    border: '2px solid #d4e8d6',
    backgroundColor: '#ffffff',
    color: '#175e24',
    fontSize: '1.05rem',
    fontWeight: '600',
  },
  hintCard: {
    backgroundColor: '#f0f9ee',
    color: '#175e24',
    padding: '16px 24px',
    borderRadius: '16px',
    marginTop: '16px',
    fontSize: '1.05rem',
  },
  successBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: '20px',
    padding: '24px',
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '16px',
  },
  nextBtn: {
    backgroundColor: '#175e24',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: '9999px',
    fontSize: '1.1rem',
    fontWeight: '600',
    minHeight: '52px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '300px',
  },
};

const kitchenStyles = {
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
};

const rhythmStyles = {
  listenBtn: {
    backgroundColor: '#175e24',
    color: '#ffffff',
    padding: '16px 32px',
    borderRadius: '9999px',
    fontSize: '1.15rem',
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
};

const motifStyles = {
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
};

const bazaarStyles = {
  itemList: {
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '16px',
  },
  marketCard: {
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    minHeight: '120px',
  },
};
