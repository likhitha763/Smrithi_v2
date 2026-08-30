import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, CheckCircle2, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { speakVoiceText, stopVoicePlayback } from '../../utils/voice';

export default function RecognitionGame() {
  const navigate = useNavigate();
  const [selectedLanguage] = useState(() => localStorage.getItem('smrithi-voice-language') || 'en');

  // Check if intro has already been seen in this session
  const [hasSeenIntro] = useState(() => sessionStorage.getItem('smrithi-family-intro-seen') === 'true');
  const [phase, setPhase] = useState(() => (hasSeenIntro ? 'quiz' : 'intro')); // 'intro' | 'quiz' | 'summary'

  // Intro Carousel state
  const [introIndex, setIntroIndex] = useState(0);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [usedHint, setUsedHint] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedbackState, setFeedbackState] = useState(null); // null | 'correct-independent' | 'correct-with-hint' | 'incorrect'
  const [questionStartTimeMs, setQuestionStartTimeMs] = useState(null);
  const [sessionLogs, setSessionLogs] = useState([]);

  const familyMembers = [
    {
      id: 'priya',
      name: 'Priya',
      role: 'your daughter',
      hint: 'Priya is standing on the right wearing the dark woven Mekhela Chador.',
      bounds: { minX: 0.65, maxX: 1.0, minY: 0.0, maxY: 1.0 },
      photo: '/images/priya.png', // Flagged: individual image asset missing in repo
    },
    {
      id: 'biren',
      name: 'Biren',
      role: 'your husband',
      hint: 'Biren is sitting in the center with a warm smile.',
      bounds: { minX: 0.35, maxX: 0.65, minY: 0.0, maxY: 1.0 },
      photo: '/images/biren.png', // Flagged: individual image asset missing in repo
    },
    {
      id: 'mina',
      name: 'Mina',
      role: 'your sister',
      hint: 'Mina is sitting on the left with a traditional Mekhela Chador.',
      bounds: { minX: 0.0, maxX: 0.35, minY: 0.0, maxY: 1.0 },
      photo: '/images/mina.png', // Flagged: individual image asset missing in repo
    },
  ];

  const currentMember = familyMembers[introIndex];
  const currentQuestion = familyMembers[currentQuestionIndex];

  // 1. Voice trigger for Intro Carousel
  useEffect(() => {
    if (phase === 'intro') {
      const text = `Meet ${currentMember.name}, ${currentMember.role}.`;
      speakVoiceText(text, selectedLanguage);
    }
    return () => {
      stopVoicePlayback();
    };
  }, [phase, introIndex, selectedLanguage]);

  // 2. Voice trigger for Quiz Question
  useEffect(() => {
    if (phase === 'quiz' && !feedbackState) {
      setQuestionStartTimeMs(Date.now());
      const questionText = `Who is ${currentQuestion.name}?`;
      speakVoiceText(questionText, selectedLanguage);
    }
  }, [phase, currentQuestionIndex, feedbackState, selectedLanguage]);

  // Handle Intro Next
  const handleIntroNext = () => {
    soundFx.playSoftTap();
    if (introIndex < familyMembers.length - 1) {
      setIntroIndex((prev) => prev + 1);
    } else {
      sessionStorage.setItem('smrithi-family-intro-seen', 'true');
      setPhase('quiz');
    }
  };

  // Handle Hint Toggle & Voice Trigger
  const handleToggleHint = () => {
    soundFx.playSoftTap();
    setUsedHint(true);
    setShowHint((prev) => {
      const next = !prev;
      if (next) {
        speakVoiceText(currentQuestion.hint, selectedLanguage);
      }
      return next;
    });
  };

  // Handle Tapping Image with Scaling BoundingClientRect Hit Detection
  const handleImageClick = (e) => {
    if (feedbackState) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    console.log(`[Recognition Tap Debug] Clicked Rel Pos: X=${relX.toFixed(3)}, Y=${relY.toFixed(3)}`);

    const tappedMember = familyMembers.find((member) => {
      const { minX, maxX, minY, maxY } = member.bounds;
      const inX = relX >= minX && relX <= maxX;
      const inY = relY >= minY && relY <= maxY;
      console.log(`[Recognition Tap Debug] Checking ${member.name}: inX=${inX} (${minX.toFixed(2)}-${maxX.toFixed(2)}), inY=${inY} (${minY.toFixed(2)}-${maxY.toFixed(2)})`);
      return inX && inY;
    });

    console.log('[Recognition Tap Debug] Identified Tapped Member:', tappedMember ? tappedMember.name : 'None (out of bounds)');

    if (!tappedMember) return;

    const responseTimeMs = questionStartTimeMs ? Date.now() - questionStartTimeMs : 0;
    const isCorrect = tappedMember.id === currentQuestion.id;

    let state = 'incorrect';
    let feedbackText = `That was ${tappedMember.name}. ${currentQuestion.name} is ${currentQuestion.role}.`;

    if (isCorrect) {
      if (usedHint) {
        state = 'correct-with-hint';
        feedbackText = `Great job identifying ${currentQuestion.name} with a little hint!`;
      } else {
        state = 'correct-independent';
        feedbackText = `Wonderful memory! That is ${currentQuestion.name}, ${currentQuestion.role}!`;
      }
      soundFx.playSuccess();
    } else {
      soundFx.playSoftTap();
    }

    setFeedbackState(state);

    const logEntry = {
      personName: currentQuestion.name,
      correct: isCorrect,
      usedHint,
      responseTimeMs,
    };

    setSessionLogs((prev) => [...prev, logEntry]);
    console.log('Recognition Question Log:', logEntry);

    speakVoiceText(feedbackText, selectedLanguage);
  };

  // Handle Next Question or Finish
  const handleNextQuestion = () => {
    soundFx.playSoftTap();
    setFeedbackState(null);
    setUsedHint(false);
    setShowHint(false);

    if (currentQuestionIndex < familyMembers.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setPhase('summary');
    }
  };

  // Handle Play Again
  const handlePlayAgain = () => {
    soundFx.playSoftTap();
    setCurrentQuestionIndex(0);
    setFeedbackState(null);
    setUsedHint(false);
    setShowHint(false);
    setSessionLogs([]);
    setPhase('quiz'); // Skip intro on subsequent plays
  };

  return (
    <div style={styles.gameContainer}>
      <div style={styles.topBar}>
        <button onClick={() => navigate('/games')} style={styles.backBtn}>
          <ArrowLeft size={22} /> <span style={{ marginLeft: '8px', fontWeight: '600' }}>Back to Games</span>
        </button>
      </div>

      <div style={styles.headerSection}>
        <h1 style={styles.gameTitle}>Recognition — Family Portrait</h1>
        <p style={styles.gameSubtitle}>
          {phase === 'intro' ? 'Meet your family members before we begin.' : `Question ${currentQuestionIndex + 1} of ${familyMembers.length}`}
        </p>
      </div>

      <div style={styles.cardBox}>
        {/* Phase 1: Intro Carousel ("Meet Your Family") */}
        {phase === 'intro' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#175e24', fontWeight: '800', marginBottom: '16px' }}>
              👨‍👩‍👧 Meet Your Family ({introIndex + 1} / {familyMembers.length})
            </h2>

            <div style={styles.introMemberCard}>
              <img
                src="/images/family_portrait.png"
                alt={currentMember.name}
                style={styles.introMemberImg}
              />
              <div style={styles.introBadge}>
                <h3 style={{ fontSize: '1.4rem', color: '#175e24', fontWeight: '800' }}>{currentMember.name}</h3>
                <p style={{ fontSize: '1.05rem', color: '#526356', fontWeight: '600' }}>{currentMember.role}</p>
              </div>
            </div>

            <button style={{ ...styles.primaryBtn, marginTop: '24px' }} onClick={handleIntroNext}>
              {introIndex < familyMembers.length - 1 ? 'Next Member →' : 'Start Quiz →'}
            </button>
          </div>
        )}

        {/* Phase 2: Quiz Screen */}
        {phase === 'quiz' && (
          <div>
            <h2 style={{ fontSize: '1.35rem', color: '#1c2b20', fontWeight: '800', textAlign: 'center', marginBottom: '16px' }}>
              Who is {currentQuestion.name}?
            </h2>

            {/* Portrait Image Container with Scaling getBoundingClientRect Click Detection & NO dashed circle */}
            <div style={styles.imageContainer}>
              <img
                src="/images/family_portrait.png"
                alt="Family Portrait"
                style={{ ...styles.mainPhoto, cursor: feedbackState ? 'default' : 'pointer' }}
                onClick={handleImageClick}
              />
            </div>

            {/* Feedback Message */}
            {feedbackState ? (
              <div style={styles.feedbackCard}>
                <CheckCircle2 size={32} color="#175e24" />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#175e24', fontWeight: '800' }}>
                    {feedbackState === 'correct-independent' && `Wonderful! That is ${currentQuestion.name}!`}
                    {feedbackState === 'correct-with-hint' && `Great job identifying ${currentQuestion.name}!`}
                    {feedbackState === 'incorrect' && `That was another family member.`}
                  </h3>
                  <p style={{ fontSize: '0.975rem', color: '#4a5c50', marginTop: '4px' }}>
                    {feedbackState === 'incorrect'
                      ? `${currentQuestion.name} is ${currentQuestion.role} (${currentQuestion.hint})`
                      : `${currentQuestion.name} is ${currentQuestion.role}.`}
                  </p>
                </div>
                <button style={styles.primaryBtn} onClick={handleNextQuestion}>
                  {currentQuestionIndex < familyMembers.length - 1 ? 'Next Question →' : 'View Summary →'}
                </button>
              </div>
            ) : (
              /* Hint Button Container */
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button style={styles.hintBtn} onClick={handleToggleHint}>
                  <Lightbulb size={20} color="#175e24" style={{ marginRight: '8px' }} />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>

                {showHint && (
                  <div style={styles.hintCard}>
                    💡 {currentQuestion.hint}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Phase 3: Session Summary */}
        {phase === 'summary' && (
          <div style={styles.summaryBox}>
            <Sparkles size={44} color="#175e24" />
            <h2 style={{ fontSize: '1.4rem', color: '#175e24', fontWeight: '800' }}>
              Family Recognition Complete!
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#4a5c50', textAlign: 'center' }}>
              You identified {sessionLogs.filter((l) => l.correct).length} of {familyMembers.length} family members correctly.
            </p>

            <div style={styles.summaryStatsRow}>
              <div style={styles.statCell}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#175e24' }}>
                  {sessionLogs.filter((l) => l.correct).length} / {familyMembers.length}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#526356' }}>Identified Correctly</span>
              </div>
              <div style={styles.statCell}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#a65e12' }}>
                  {sessionLogs.filter((l) => l.usedHint).length}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#526356' }}>Hints Used</span>
              </div>
            </div>

            <button style={{ ...styles.primaryBtn, marginTop: '20px' }} onClick={handlePlayAgain}>
              <RefreshCw size={20} style={{ marginRight: '8px' }} /> Play Recognition Again
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
  introMemberCard: {
    backgroundColor: '#f4fbf5',
    border: '2px solid #d4e8d6',
    borderRadius: '20px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  introMemberImg: {
    width: '100%',
    maxHeight: '320px',
    objectFit: 'cover',
    borderRadius: '16px',
  },
  introBadge: {
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  mainPhoto: {
    width: '100%',
    maxHeight: '440px',
    objectFit: 'cover',
    display: 'block',
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
    padding: '14px 20px',
    borderRadius: '16px',
    marginTop: '16px',
    fontSize: '1rem',
    fontWeight: '600',
    border: '1px solid #c8e6c9',
  },
  feedbackCard: {
    backgroundColor: '#e8f5e9',
    borderRadius: '18px',
    padding: '20px',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: '1px solid #c8e6c9',
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
    boxShadow: '0 4px 14px rgba(23, 94, 36, 0.2)',
  },
  summaryBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: '20px',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '16px',
  },
  summaryStatsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    backgroundColor: '#ffffff',
    padding: '16px 28px',
    borderRadius: '16px',
    border: '1px solid #d4e8d6',
  },
  statCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
