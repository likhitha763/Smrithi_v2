import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Gamepad2, Image, Calendar, ShieldCheck, HelpCircle, X, LogOut, ShieldAlert } from 'lucide-react';
import { logout } from '../firebase/auth';

export default function MobileDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate('/login');
  };

  const menuVariants = {
    closed: { x: '-100%', transition: { type: 'tween', duration: 0.25, ease: 'easeIn' } },
    open: { x: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            style={styles.backdrop}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={styles.drawer}
          >
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.logoRow}>
                <div style={styles.leafBadge}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(15deg)' }}>
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
                    <path d="M9 22v-4" />
                  </svg>
                </div>
                <span style={styles.logoText}>SMRITHI</span>
              </div>
              <button style={styles.closeBtn} onClick={onClose} aria-label="Close Menu">
                <X size={24} />
              </button>
            </div>

            {/* Content/Links */}
            <div style={styles.drawerContent}>
              <nav style={styles.navMenu} aria-label="Mobile Drawer Navigation">
                <NavLink 
                  to="/home" 
                  onClick={onClose}
                  style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
                >
                  <Home size={22} />
                  <span>Home</span>
                </NavLink>
                
                <NavLink 
                  to="/games" 
                  onClick={onClose}
                  style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
                >
                  <Gamepad2 size={22} />
                  <span>Games</span>
                </NavLink>
                
                <NavLink 
                  to="/memories" 
                  onClick={onClose}
                  style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
                >
                  <Image size={22} />
                  <span>Memories</span>
                </NavLink>
                
                <NavLink 
                  to="/schedule" 
                  onClick={onClose}
                  style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
                >
                  <Calendar size={22} />
                  <span>Daily Care</span>
                </NavLink>
              </nav>

              <div style={styles.divider} />

              {/* Footer Links */}
              <div style={styles.footerSection}>
                <NavLink to="/caregiver" onClick={onClose} style={styles.caregiverCard}>
                  <ShieldCheck size={20} color="var(--primary-green)" />
                  <span>Caregiver Access</span>
                </NavLink>

                <NavLink to="/landing" onClick={onClose} style={styles.footerLink}>
                  <HelpCircle size={20} />
                  <span>Landing Page / Help</span>
                </NavLink>

                {/* Privacy Policy Mock link (opens landing page or just a label) */}
                <div style={styles.footerLinkDummy}>
                  <ShieldAlert size={20} />
                  <span>Privacy Policy</span>
                </div>

                <button onClick={handleLogout} style={styles.logoutBtn}>
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 36, 24, 0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 1100,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '280px',
    maxWidth: '85vw',
    backgroundColor: 'var(--sidebar-bg)',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
    zIndex: 1200,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 16px',
    borderBottom: '1px solid var(--border-color)',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  leafBadge: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: 'var(--primary-green)',
    letterSpacing: '0.8px',
  },
  closeBtn: {
    color: 'var(--text-muted)',
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '40px',
    minHeight: '40px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '20px 16px',
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    color: 'var(--text-muted)',
    fontSize: '1rem',
    fontWeight: '600',
    minHeight: '44px',
    textDecoration: 'none',
  },
  navLinkActive: {
    backgroundColor: 'var(--primary-green)',
    color: 'var(--text-white)',
    boxShadow: '0 4px 12px rgba(30, 101, 53, 0.12)',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '20px 0',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: 'auto',
  },
  caregiverCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: 'var(--secondary-green)',
    padding: '12px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '0.95rem',
    color: 'var(--primary-green)',
    minHeight: '44px',
    textDecoration: 'none',
  },
  footerLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    borderRadius: '10px',
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
    fontWeight: '600',
    minHeight: '44px',
    textDecoration: 'none',
  },
  footerLinkDummy: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    borderRadius: '10px',
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'default',
    minHeight: '44px',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    borderRadius: '10px',
    color: '#c0392b',
    fontSize: '0.95rem',
    fontWeight: '600',
    width: '100%',
    textAlign: 'left',
    minHeight: '44px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  }
};
