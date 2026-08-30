import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Image, Calendar, ShieldCheck, HelpCircle, ShieldAlert } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      {/* Brand Header */}
      <div style={styles.brandContainer}>
        <div style={styles.logoRow}>
          <div style={styles.leafBadge}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(15deg)' }}>
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
              <path d="M9 22v-4" />
            </svg>
          </div>
          <span style={styles.logoText}>SMRITHI</span>
        </div>
        <div style={styles.tagline}>Your caring companion</div>
      </div>

      {/* Nav Menu */}
      <nav style={styles.navMenu} aria-label="Main Navigation">
        <NavLink 
          to="/home" 
          style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
        >
          <Home size={22} />
          <span>Home</span>
        </NavLink>
        
        <NavLink 
          to="/games" 
          style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
        >
          <Gamepad2 size={22} />
          <span>Games</span>
        </NavLink>
        
        <NavLink 
          to="/memories" 
          style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
        >
          <Image size={22} />
          <span>Memories</span>
        </NavLink>
        
        <NavLink 
          to="/schedule" 
          style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
        >
          <Calendar size={22} />
          <span>Daily Care</span>
        </NavLink>
      </nav>

      {/* Sidebar Footer Links */}
      <div style={styles.sidebarFooter}>
        <NavLink to="/caregiver" style={styles.caregiverCard}>
          <ShieldCheck size={20} color="var(--primary-green)" />
          <span style={styles.caregiverText}>Caregiver Access</span>
        </NavLink>

        <NavLink to="/landing" style={styles.footerLink}>
          <HelpCircle size={20} />
          <span>Landing Page</span>
        </NavLink>
        
        <NavLink to="/help" style={styles.footerLink}>
          <HelpCircle size={20} />
          <span>Help</span>
        </NavLink>
        
        <NavLink to="/privacy" style={styles.footerLink}>
          <ShieldAlert size={20} />
          <span>Privacy</span>
        </NavLink>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 'var(--sidebar-width)',
    backgroundColor: 'var(--sidebar-bg)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 20px',
    height: '100vh',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
  },
  brandContainer: {
    padding: '12px 8px 32px 8px',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  leafBadge: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '1.45rem',
    fontWeight: '800',
    color: 'var(--primary-green)',
    letterSpacing: '0.8px',
  },
  tagline: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    marginTop: '6px',
    paddingLeft: '50px',
    fontWeight: '500',
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '14px 20px',
    borderRadius: '16px',
    color: 'var(--text-muted)',
    fontSize: '1.05rem',
    fontWeight: '600',
  },
  navLinkActive: {
    backgroundColor: 'var(--primary-green)',
    color: 'var(--text-white)',
    boxShadow: '0 4px 15px rgba(30, 101, 53, 0.15)',
  },
  sidebarFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-color)',
  },
  caregiverCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: 'var(--secondary-green)',
    padding: '14px 16px',
    borderRadius: '14px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '0.95rem',
    color: 'var(--primary-green)',
    boxShadow: '0 2px 8px rgba(30, 101, 53, 0.05)',
  },
  footerLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    borderRadius: '10px',
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
    fontWeight: '600',
  }
};
