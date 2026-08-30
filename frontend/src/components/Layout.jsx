import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import Footer from './Footer';
import BottomNav from './BottomNav';
import MobileDrawer from './MobileDrawer';

/**
 * Layout — wraps every page with the correct navigation:
 *
 *  Desktop/Tablet (≥768 px):
 *    • Left sidebar  ← ONLY navigation
 *    • Utility bar (bell / settings / avatar) top-right  [class: utility-bar]
 *    • NO bottom nav, NO top nav links
 *
 *  Mobile (<768 px):
 *    • Bottom nav    ← ONLY navigation  [class: bottom-nav-mobile]
 *    • NO sidebar, NO utility bar (now utility bar is visible as mobile top nav with logo & drawer button)
 *
 * CSS classes control visibility — no JS media-query needed.
 */
export default function Layout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="app-container">
      {/* ── Sidebar: desktop & tablet only (hidden on mobile via CSS) ── */}
      <div className="sidebar-desktop">
        <Sidebar />
      </div>

      {/* ── Main content column ─────────────────────────────────────── */}
      <div className="main-wrapper">
        {/* Utility bar: visible on desktop/tablet, modified header layout on mobile */}
        <TopNav onMenuClick={() => setIsDrawerOpen(true)} />

        {/* Page content */}
        <main className="content-area">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* ── Bottom nav: mobile only (hidden on desktop via CSS) ─────── */}
      <BottomNav />

      {/* ── Mobile Sidebar Drawer ────────────────────────────────────── */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
