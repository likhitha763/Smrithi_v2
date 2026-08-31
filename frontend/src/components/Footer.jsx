import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footer} className="app-footer" role="contentinfo" aria-label="Page Footer">
      <div style={styles.container}>
        {/* Left Side: Brand Logo and Copyright */}
        <div style={styles.leftCol}>
          <span style={styles.logoText}>SMRITHI</span>
          <span style={styles.copyrightText}>
            © 2026 SMRITHI. Your caring cognitive companion.
          </span>
        </div>

        {/* Right Side: Links — hidden on mobile (bottom nav handles navigation) */}
        <nav style={styles.navLinks} className="footer-nav-links" aria-label="Footer Links">
          <NavLink 
            to="/home" 
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.linkActive : {}) })}
          >
            Home
          </NavLink>
          <NavLink 
            to="/schedule" 
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.linkActive : {}) })}
          >
            Schedule
          </NavLink>
          <NavLink 
            to="/games" 
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.linkActive : {}) })}
          >
            Games
          </NavLink>
          <NavLink 
            to="/caregiver" 
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.linkActive : {}) })}
          >
            Caregiver Access
          </NavLink>
        </nav>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'rgba(91, 140, 122, 0.12)',
    borderTop: '1px solid #d2ebd4',
    padding: '32px 48px',
    marginTop: '32px',
    width: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1300px',
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '24px',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: 'var(--primary-green)',
    letterSpacing: '0.8px',
  },
  copyrightText: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  link: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    transition: 'color 0.2s ease',
  },
  linkActive: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--primary-green)',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  }
};
