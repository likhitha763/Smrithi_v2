import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import Footer from './Footer';
import BottomNav from './BottomNav';

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
 *    • NO sidebar, NO utility bar
 *
 * CSS classes control visibility — no JS media-query needed.
 */
export default function Layout({ children }) {
  return (
    <div className="app-container">
      {/* ── Sidebar: desktop & tablet only (hidden on mobile via CSS) ── */}
      <div className="sidebar-desktop">
        <Sidebar />
      </div>

      {/* ── Main content column ─────────────────────────────────────── */}
      <div className="main-wrapper">
        {/* Utility bar: desktop & tablet only (hidden on mobile via CSS) */}
        <TopNav />

        {/* Page content */}
        <main className="content-area">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* ── Bottom nav: mobile only (hidden on desktop via CSS) ─────── */}
      <BottomNav />
    </div>
  );
}
