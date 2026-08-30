import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Gamepad2, Image } from 'lucide-react';

/**
 * BottomNav — mobile ONLY navigation bar.
 * Visibility is controlled by the CSS class bottom-nav-mobile
 * (display:none on desktop, display:flex on mobile).
 */
export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { label: 'Home',       path: '/',         icon: Home     },
    { label: 'Games',      path: '/games',    icon: Gamepad2 },
    { label: 'Memories',   path: '/memories', icon: Image    },
    { label: 'Daily Care', path: '/schedule', icon: Calendar },
  ];

  return (
    <nav
      className="bottom-nav-mobile"
      style={styles.bottomNav}
      aria-label="Mobile Navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.path === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon
              size={24}
              strokeWidth={isActive ? 2.5 : 2}
              color={isActive ? 'var(--primary-green)' : 'var(--text-muted)'}
            />
            <span style={isActive ? styles.labelActive : styles.label}>
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}

const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTop: '1px solid var(--border-color)',
    boxShadow: '0 -4px 20px rgba(30, 101, 53, 0.08)',
    zIndex: 1000,
    padding: '10px 8px calc(10px + env(safe-area-inset-bottom)) 8px',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '4px',
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '8px 16px',
    borderRadius: '16px',
    minWidth: '72px',
    minHeight: '56px',
    textDecoration: 'none',
  },
  navLinkActive: {
    backgroundColor: 'var(--secondary-green)',
  },
  label: {
    fontSize: '0.78rem',
    fontWeight: '500',
    color: 'var(--text-muted)',
    letterSpacing: '0.01em',
  },
  labelActive: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: 'var(--primary-green)',
    letterSpacing: '0.01em',
  },
};
