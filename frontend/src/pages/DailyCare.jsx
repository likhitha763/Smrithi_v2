import React, { useState } from 'react';
import { Check, Pill, TreePine, Droplet, Plus, BookOpen } from 'lucide-react';

export default function DailyCare() {
  const [medTaken, setMedTaken] = useState(false);
  const [waterCount, setWaterCount] = useState(2); // Starts at 2 of 8
  
  const handleAddGlass = () => {
    if (waterCount < 8) {
      setWaterCount(prev => prev + 1);
    }
  };

  // Water Ring Calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (waterCount / 8) * circumference;

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Daily Care</h1>
          <p style={styles.subtitle}>Your schedule and wellness goals for today.</p>
        </div>
        <div style={styles.dateBox}>
          <div style={styles.dateLabel}>Today</div>
          <div style={styles.dateVal}>October 24</div>
        </div>
      </div>

      {/* Two Column Layout: Schedule and Goals */}
      <div style={styles.layoutGrid}>
        {/* Left Column: Schedule */}
        <div style={styles.scheduleCol}>
          <h2 style={styles.sectionHeader}>Schedule</h2>
          
          <div style={styles.timelineList}>
            {/* Task 1: Morning Stretch (Completed) */}
            <div style={styles.taskCardCompleted}>
              <div style={styles.taskIconCompleted}>
                <Check size={20} color="white" />
              </div>
              <div style={styles.taskDetails}>
                <h3 style={styles.taskTitleCompleted}>Morning Stretch</h3>
                <p style={styles.taskDescCompleted}>15 minutes of light mobility.</p>
              </div>
              <div style={styles.taskTimeCompleted}>7:00 AM</div>
            </div>

            {/* Task 2: Blood Pressure Tablet (Active/Pending) */}
            <div style={medTaken ? styles.taskCardCompleted : styles.taskCardActive}>
              <div style={styles.taskLeftRow}>
                <div style={medTaken ? styles.taskIconCompleted : styles.taskIconActive}>
                  {medTaken ? <Check size={20} color="white" /> : <Pill size={22} color="var(--primary-green)" />}
                </div>
                <div style={styles.taskDetails}>
                  <h3 style={medTaken ? styles.taskTitleCompleted : styles.taskTitleActive}>
                    Blood Pressure Tablet
                  </h3>
                  <p style={medTaken ? styles.taskDescCompleted : styles.taskDescActive}>
                    Take with water after breakfast.
                  </p>
                  
                  {!medTaken && (
                    <button style={styles.markBtn} onClick={() => setMedTaken(true)}>
                      <Check size={18} style={{ marginRight: '6px' }} /> Mark as Taken
                    </button>
                  )}
                </div>
              </div>
              <div style={medTaken ? styles.taskTimeCompleted : styles.taskTimeActive}>8:00 AM</div>
            </div>

            {/* Task 3: Afternoon Walk */}
            <div style={styles.taskCardPending}>
              <div style={styles.taskIconPending}>
                <TreePine size={22} color="var(--text-muted)" />
              </div>
              <div style={styles.taskDetails}>
                <h3 style={styles.taskTitlePending}>Afternoon Walk</h3>
                <p style={styles.taskDescPending}>20 minutes in the park.</p>
              </div>
              <div style={styles.taskTimePending}>3:00 PM</div>
            </div>
          </div>
        </div>

        {/* Right Column: Wellness Goals */}
        <div style={styles.goalsCol}>
          <h2 style={styles.sectionHeader}>Wellness Goals</h2>

          {/* Water Intake Widget */}
          <div style={styles.smrCard}>
            <h3 style={styles.cardHeader}>Water Intake</h3>
            
            <div style={styles.waterProgressArea}>
              <div style={styles.ringContainer}>
                <svg width="110" height="110" style={styles.ringSvg}>
                  <circle 
                    cx="55" 
                    cy="55" 
                    r={radius} 
                    stroke="#e2f5e4" 
                    strokeWidth="10" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="55" 
                    cy="55" 
                    r={radius} 
                    stroke="#a3cfa7" 
                    strokeWidth="10" 
                    fill="transparent" 
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                  />
                </svg>
                <div style={styles.ringCenterIcon}>
                  <Droplet size={30} color="var(--primary-green)" fill="var(--secondary-green)" />
                </div>
              </div>

              <div style={styles.counterText}>
                <span style={styles.counterNum}>{waterCount} of 8</span>
                <span style={styles.counterLabel}>Glasses drank today</span>
              </div>
            </div>

            <button style={styles.addGlassBtn} onClick={handleAddGlass}>
              <Plus size={18} /> Add Glass
            </button>
          </div>

          {/* Daily Note Widget (Solid Green Card) */}
          <div style={styles.noteCard}>
            <div style={styles.noteHeader}>
              <BookOpen size={20} color="white" />
              <span style={styles.noteTitle}>Daily Note</span>
            </div>
            <p style={styles.noteContent}>
              "Feeling rested today. Don't forget to call Sarah this evening."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '2.1rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  dateBox: {
    textAlign: 'right',
  },
  dateLabel: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: 'var(--primary-green)',
  },
  dateVal: {
    fontSize: '0.98rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
    marginTop: '2px',
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.7fr 1fr',
    gap: '32px',
  },
  scheduleCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionHeader: {
    fontSize: '1.45rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  timelineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  taskCardCompleted: {
    backgroundColor: '#f7faf8',
    border: '1.5px solid #e0efe4',
    borderRadius: '20px',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  taskIconCompleted: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitleCompleted: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#88998d',
    textDecoration: 'line-through',
  },
  taskDescCompleted: {
    fontSize: '0.98rem',
    color: '#88998d',
    fontWeight: '500',
  },
  taskTimeCompleted: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#88998d',
  },
  taskCardActive: {
    backgroundColor: 'white',
    border: '2.5px solid var(--primary-green)',
    borderRadius: '20px',
    padding: '24px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '16px',
    boxShadow: 'var(--shadow-card)',
  },
  taskLeftRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    flex: 1,
  },
  taskIconActive: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'var(--secondary-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  taskTitleActive: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  taskDescActive: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
    marginBottom: '14px',
  },
  taskTimeActive: {
    fontSize: '1rem',
    fontWeight: '800',
    color: 'var(--primary-green)',
    paddingTop: '2px',
  },
  markBtn: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '10px 20px',
    fontWeight: '700',
    fontSize: '0.95rem',
    display: 'inline-flex',
    alignItems: 'center',
  },
  taskCardPending: {
    backgroundColor: 'white',
    border: '1.5px solid var(--border-color)',
    borderRadius: '20px',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    boxShadow: 'var(--shadow-subtle)',
  },
  taskIconPending: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#f2faf4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '1.5px solid var(--border-color)',
  },
  taskTitlePending: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  taskDescPending: {
    fontSize: '0.98rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  taskTimePending: {
    fontSize: '1.02rem',
    fontWeight: '700',
    color: 'var(--text-muted)',
  },
  goalsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  smrCard: {
    backgroundColor: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  cardHeader: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: 'var(--text-main)',
    width: '100%',
    textAlign: 'left',
  },
  waterProgressArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  ringContainer: {
    position: 'relative',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringSvg: {
    transform: 'rotate(-90deg)',
  },
  ringCenterIcon: {
    position: 'absolute',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#ebf7ec',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  counterNum: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  counterLabel: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  addGlassBtn: {
    backgroundColor: 'var(--secondary-green)',
    color: 'var(--primary-green)',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 24px',
    fontWeight: '700',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    width: '100%',
  },
  noteCard: {
    backgroundColor: 'var(--primary-green)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    color: 'white',
  },
  noteHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  noteTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  noteContent: {
    fontSize: '1.1rem',
    fontWeight: '500',
    lineHeight: '1.45',
    fontStyle: 'italic',
  }
};
