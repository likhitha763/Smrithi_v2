import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import OfflineIndicator from './components/OfflineIndicator';

import LoginSignup from './pages/LoginSignup';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import DailyCare from './pages/DailyCare';
import Games from './pages/Games';
import MemoryMatchGame from './pages/games/MemoryMatchGame';
import RecognitionGame from './pages/games/RecognitionGame';
import SequenceRecallGame from './pages/games/SequenceRecallGame';
import FolkMotifGame from './pages/games/FolkMotifGame';
import RegionalKitchenGame from './pages/games/RegionalKitchenGame';
import ActivityHub from './pages/ActivityHub';
import Memories from './pages/Memories';
import CaregiverDashboard from './pages/CaregiverDashboard';

export default function App() {
  const location = useLocation();

  return (
    <>
      <OfflineIndicator />

      <Routes location={location} key={location.pathname}>
        {/* Public routes — no app layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/login-signup" element={<LoginSignup />} />

        {/* Protected routes — with layout */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Layout>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/schedule" element={<PageTransition><DailyCare /></PageTransition>} />
                    <Route path="/games" element={<PageTransition><Games /></PageTransition>} />
                    <Route path="/games/memory-match" element={<PageTransition><MemoryMatchGame /></PageTransition>} />
                    <Route path="/games/recognition" element={<PageTransition><RecognitionGame /></PageTransition>} />
                    <Route path="/games/sequence-recall" element={<PageTransition><SequenceRecallGame /></PageTransition>} />
                    <Route path="/games/folk-motif" element={<PageTransition><FolkMotifGame /></PageTransition>} />
                    <Route path="/games/regional-kitchen" element={<PageTransition><RegionalKitchenGame /></PageTransition>} />
                    <Route path="/activities" element={<PageTransition><ActivityHub /></PageTransition>} />
                    <Route path="/memories" element={<PageTransition><Memories /></PageTransition>} />
                    <Route path="/caregiver" element={<PageTransition><CaregiverDashboard /></PageTransition>} />
                  </Routes>
                </AnimatePresence>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

// Reusable transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
