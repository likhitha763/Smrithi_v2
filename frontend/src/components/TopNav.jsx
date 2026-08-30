import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Settings,
  User,
  ShieldCheck,
  LogOut,
  Pill,
  Sparkles,
  MessageSquare,
  Check,
  Menu,
} from 'lucide-react';
import { logout } from '../firebase/auth';
import { useAuth } from '../firebase/useAuth';

/**
 * TopNav — desktop right-side utility bar, which morphs into a mobile-friendly top header.
 * Features hover/pressed visual states, notification badge, interactive dropdowns on desktop,
 * and bottom sheet overlays on mobile viewports below 480px.
 */
export default function TopNav({ onMenuClick }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Handle window resizing to detect mobile viewport width for bottom sheets
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 480);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    setUnreadCount(0);
  };

  const handleLogout = async () => {
    await logout();
    setActiveDropdown(null);
    navigate('/login');
  };

  const sampleNotifications = [
    {
      id: 1,
      icon: Pill,
      iconBg: '#E8F5E9',
      iconColor: '#2E7D32',
      title: 'Medication Reminder',
      message: 'Time for evening blood pressure medicine (50mg)',
      time: '10m ago',
    },
    {
      id: 2,
      icon: Sparkles,
      iconBg: '#FFF3E0',
      iconColor: '#E65100',
      title: 'Memory Quiz Ready',
      message: 'New Daily Photo Memory activity is ready for today',
      time: '1h ago',
    },
    {
      id: 3,
      icon: MessageSquare,
      iconBg: '#E9F4EC',
      iconColor: 'var(--primary-green)',
      title: 'Caregiver Note',
      message: 'Ramesh updated tomorrow’s walk schedule to 9:00 AM',
      time: '3h ago',
    },
  ];

  // Animation variants: Slide up bottom-sheet on mobile, fade/scale dropdown on desktop
  const dropdownVariants = {
    hidden: isMobile
      ? { y: '100%', opacity: 1 }
      : { opacity: 0, y: 10, scale: 0.96 },
    visible: isMobile
      ? { y: 0, opacity: 1 }
      : { opacity: 1, y: 0, scale: 1 },
    exit: isMobile
      ? { y: '100%', opacity: 1 }
      : { opacity: 0, y: 8, scale: 0.96 }
  };

  return (
    <>
      {/* Mobile Bottom Sheet Backdrop Overlay */}
      <AnimatePresence>
        {activeDropdown && isMobile && (
          <motion.div 
            className="mobile-bottom-sheet-backdrop" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDropdown(null)} 
          />
        )}
      </AnimatePresence>

      <header className="utility-bar">
        {/* Brand Header — Mobile/Tablet Only */}
        <div className="mobile-logo-container">
          <div style={styles.leafBadge}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(15deg)' }}>
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
              <path d="M9 22v-4" />
            </svg>
          </div>
          <span style={styles.logoText}>SMRITHI</span>
        </div>

        <div ref={navRef} style={styles.rightSection}>
          {/* ── Bell Icon Button ── */}
          <div style={{ position: 'relative' }}>
            <button
              className={`nav-icon-btn ${activeDropdown === 'notifications' ? 'is-active' : ''}`}
              onClick={() => toggleDropdown('notifications')}
              aria-label="Notifications"
              aria-expanded={activeDropdown === 'notifications'}
            >
              <Bell size={24} strokeWidth={2.2} />
              {unreadCount > 0 && <span className="nav-badge-dot" aria-label={`${unreadCount} unread notifications`} />}
            </button>

            {/* Notifications Dropdown Panel / Bottom Sheet */}
            <AnimatePresence>
              {activeDropdown === 'notifications' && (
                <motion.div
                  className="nav-dropdown-menu notifications-dropdown"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  <div style={styles.dropdownHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={styles.dropdownTitle}>Notifications</span>
                      {unreadCount > 0 && (
                        <span style={styles.badgePill}>{unreadCount} New</span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        style={styles.markReadBtn}
                        title="Mark all as read"
                      >
                        <Check size={14} /> Mark read
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                    {sampleNotifications.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <div key={item.id} className="ivory-card">
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                backgroundColor: item.iconBg,
                                color: item.iconColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <IconComp size={18} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                                  {item.title}
                                </h4>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                  {item.time}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                                {item.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Settings Gear Button (Desktop Only) ── */}
          <div className="nav-settings-btn-desktop" style={{ position: 'relative' }}>
            <button
              className={`nav-icon-btn ${activeDropdown === 'settings' ? 'is-active' : ''}`}
              onClick={() => toggleDropdown('settings')}
              aria-label="Settings"
              aria-expanded={activeDropdown === 'settings'}
            >
              <Settings size={24} strokeWidth={2.2} />
            </button>

            {/* Settings Dropdown Panel */}
            <AnimatePresence>
              {activeDropdown === 'settings' && (
                <motion.div
                  className="nav-dropdown-menu settings-dropdown"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  <div style={{ padding: '8px 12px 6px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    Settings
                  </div>
                  <button
                    className="dropdown-item"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <User size={18} style={{ color: 'var(--primary-green)' }} />
                    <span>Account</span>
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <Bell size={18} style={{ color: 'var(--primary-green)' }} />
                    <span>Notifications</span>
                  </button>
                  <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '6px 0' }} />
                  <button
                    className="dropdown-item danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Profile Avatar Button ── */}
          <div style={{ position: 'relative' }}>
            <button
              className={`nav-avatar-btn ${activeDropdown === 'profile' ? 'is-active' : ''}`}
              onClick={() => toggleDropdown('profile')}
              aria-label="User Profile"
              aria-expanded={activeDropdown === 'profile'}
            >
              <div style={styles.avatarWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120"
                  alt="Asha Devi Profile"
                  style={styles.avatarImg}
                />
              </div>
            </button>

            {/* Profile Dropdown Panel / Bottom Sheet */}
            <AnimatePresence>
              {activeDropdown === 'profile' && (
                <motion.div
                  className="nav-dropdown-menu profile-dropdown"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  {/* Profile Header Info */}
                  <div style={styles.profileCardHeader}>
                    <div style={styles.profileHeaderAvatar}>
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120"
                        alt="Asha Devi"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {currentUser?.displayName || 'Asha Devi'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {currentUser?.email || 'Senior Member'}
                      </div>
                    </div>
                  </div>

                  <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '10px 0' }} />

                  <button
                    className="dropdown-item"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <User size={18} style={{ color: 'var(--primary-green)' }} />
                    <span>View Profile</span>
                  </button>

                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setActiveDropdown(null);
                      navigate('/caregiver');
                    }}
                  >
                    <ShieldCheck size={18} style={{ color: 'var(--primary-green)' }} />
                    <span>Caregiver Access</span>
                  </button>

                  <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '6px 0' }} />

                  <button
                    className="dropdown-item danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Hamburger Menu Button (Mobile Only) ── */}
          <button
            className="nav-hamburger-btn"
            onClick={onMenuClick}
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} strokeWidth={2.2} />
          </button>
        </div>
      </header>
    </>
  );
}

const styles = {
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  avatarWrapper: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '2px solid var(--primary-green)',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(30,101,53,0.1)',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--border-color)',
  },
  dropdownTitle: {
    fontWeight: 700,
    fontSize: '0.95rem',
    color: 'var(--text-main)',
  },
  badgePill: {
    backgroundColor: '#FF5A5F',
    color: '#ffffff',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '12px',
  },
  markReadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.75rem',
    color: 'var(--primary-green)',
    fontWeight: 600,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  profileCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '4px 6px',
  },
  profileHeaderAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '1px solid var(--border-color)',
    flexShrink: 0,
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
};
