import React, { useState } from 'react';
import { Heart, Play, ArrowRight, Soup, Music, Grid, ShoppingBasket, Sparkles, X } from 'lucide-react';

export default function ActivityHub() {
  const [activeActivity, setActiveActivity] = useState(null);

  const activities = [
    {
      id: "kitchen",
      title: "Kitchen Memories",
      desc: "Put the ingredients in the right order to make familiar comforting dishes like Assamese Khar.",
      icon: Soup,
      type: "Sequential",
    },
    {
      id: "rhythm",
      title: "Rhythm Match",
      desc: "Listen carefully and tap the rhythm of traditional Bihu drum beats.",
      icon: Music,
      type: "Auditory",
    },
    {
      id: "weaver",
      title: "Folk Motif Weaver",
      desc: "Find the regional textile pattern that comes next to complete the beautiful design.",
      icon: Grid,
      type: "Pattern",
    },
    {
      id: "bazaar",
      title: "Weekly Bazaar",
      desc: "Remember what we need from the local market to prepare for the week.",
      icon: ShoppingBasket,
      type: "Memory",
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>What would you like to do today? 🌿</h1>
        <p style={styles.subtitle}>Choose an activity you enjoy.</p>
      </div>

      {/* Recommendation Banner */}
      <div style={styles.recommendationBanner}>
        <div style={styles.recLeft}>
          <div style={styles.recIconCircle}>
            <Heart size={20} color="var(--primary-green)" fill="var(--primary-green)" />
          </div>
          <div style={styles.recText}>
            <strong>Recommended for You</strong>
            <div style={styles.recDesc}>
              You've been enjoying memory games. Would you like to try Family Portrait?
            </div>
          </div>
        </div>
        <button 
          style={styles.recBtn} 
          onClick={() => setActiveActivity({ title: "Family Portrait", type: "Recognition" })}
        >
          Start Family Portrait <ArrowRight size={18} />
        </button>
      </div>

      {/* Featured Card */}
      <div style={styles.featuredCard}>
        <div style={styles.featuredImageCol}>
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800" 
            alt="Happy family sitting together" 
            style={styles.featuredImg} 
          />
        </div>
        
        <div style={styles.featuredContentCol}>
          <div style={styles.featuredBadge}>
            <Sparkles size={16} color="var(--primary-green)" style={{ marginRight: '6px' }} />
            Featured
          </div>
          <h2 style={styles.featuredTitle}>Family Portrait</h2>
          <p style={styles.featuredDesc}>
            Remember the people you love. Look at photos of your family members and recall their names and wonderful shared moments.
          </p>
          <button 
            style={styles.featuredBtn}
            onClick={() => setActiveActivity({ title: "Family Portrait", type: "Recognition" })}
          >
            Start Activity <Play size={18} fill="currentColor" style={{ marginLeft: '4px' }} />
          </button>
        </div>
      </div>

      {/* More Activities Grid Header */}
      <h2 style={styles.sectionHeader}>More Activities</h2>

      {/* 2x2 Grid */}
      <div style={styles.grid}>
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} style={styles.activityCard}>
              <div style={styles.cardHeaderRow}>
                <div style={styles.cardIconBox}>
                  <Icon size={24} color="var(--primary-green)" />
                </div>
                <div style={styles.cardMeta}>
                  <h3 style={styles.cardTitle}>{act.title}</h3>
                  <p style={styles.cardDesc}>{act.desc}</p>
                </div>
              </div>
              
              <button 
                style={styles.cardBtn}
                onClick={() => setActiveActivity({ title: act.title, type: act.type })}
              >
                Start <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Launcher Simulation Modal */}
      {activeActivity && (
        <div style={styles.overlay} onClick={() => setActiveActivity(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Launching {activeActivity.title}</h3>
              <button style={styles.closeBtn} onClick={() => setActiveActivity(null)}>
                <X size={24} />
              </button>
            </div>
            
            <p style={styles.modalDesc}>
              Activity Category: <strong>{activeActivity.type}</strong>
            </p>
            
            <div style={styles.loaderArea}>
              <div style={styles.spinner}></div>
              <p style={{ marginTop: '16px', fontWeight: '600', color: 'var(--primary-green)' }}>
                Preparing comforting environment...
              </p>
            </div>
            
            <button 
              style={styles.btnPrimary} 
              onClick={() => {
                alert(`Starting ${activeActivity.title} gameplay simulator!`);
                setActiveActivity(null);
              }}
            >
              Enter Activity
            </button>
          </div>
        </div>
      )}
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
    marginBottom: '8px',
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
  recommendationBanner: {
    backgroundColor: '#f2fbf2',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    boxShadow: 'var(--shadow-subtle)',
  },
  recLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1,
    minWidth: '280px',
  },
  recIconCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#d4ebd8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  recDesc: {
    fontSize: '0.98rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  recBtn: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 24px',
    fontWeight: '700',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  featuredCard: {
    backgroundColor: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: '28px',
    overflow: 'hidden',
    display: 'flex',
    boxShadow: 'var(--shadow-card)',
    flexWrap: 'wrap',
  },
  featuredImageCol: {
    flex: 1,
    minWidth: '320px',
    height: '300px',
  },
  featuredImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  featuredContentCol: {
    flex: 1,
    padding: '36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '16px',
    minWidth: '320px',
  },
  featuredBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#d4ebd8',
    color: 'var(--primary-green)',
    padding: '6px 14px',
    borderRadius: '50px',
    fontWeight: '700',
    fontSize: '0.85rem',
  },
  featuredTitle: {
    fontSize: '1.85rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  featuredDesc: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    fontWeight: '500',
  },
  featuredBtn: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 24px',
    fontWeight: '700',
    fontSize: '1rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  sectionHeader: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: 'var(--text-main)',
    marginTop: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: '24px',
  },
  activityCard: {
    backgroundColor: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
  },
  cardHeaderRow: {
    display: 'flex',
    gap: '16px',
  },
  cardIconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'var(--secondary-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  cardDesc: {
    fontSize: '0.98rem',
    color: 'var(--text-muted)',
    lineHeight: '1.45',
    fontWeight: '500',
  },
  cardBtn: {
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
    gap: '8px',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 36, 24, 0.4)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '28px',
    maxWidth: '440px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: '1.35rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  closeBtn: {
    color: 'var(--text-muted)',
    padding: '4px',
  },
  modalDesc: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
  },
  loaderArea: {
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--sidebar-bg)',
    borderRadius: '16px',
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '4px solid var(--secondary-green)',
    borderTop: '4px solid var(--primary-green)',
    borderRadius: '50%',
    animation: 'spin 1s infinite linear',
  },
  btnPrimary: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '14px',
    fontWeight: '700',
    fontSize: '1.05rem',
  }
};
