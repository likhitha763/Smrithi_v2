import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Heart,
  ShieldCheck,
  Activity,
  ArrowRight,
  Play,
  CheckCircle2,
  Calendar,
  Sparkles,
  UserCheck,
  Clock,
  ChevronRight,
  Star,
  Lock,
  Pill,
  Flower2
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    service: 'Cognitive Assessment',
    date: '2026-09-01',
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingData.name && bookingData.email) {
      setBookingSuccess(true);
    }
  };

  return (
    <div style={styles.landingWrapper} className="landing-wrapper">
      {/* ── Top Navbar ────────────────────────────────────────────── */}
      <header style={styles.navbar} className="landing-navbar">
        <div style={styles.navContainer} className="landing-nav-container">
          <div style={styles.brandLogo} onClick={() => navigate('/')}>
            <div style={styles.logoBadge}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(15deg)' }}>
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
                <path d="M9 22v-4" />
              </svg>
            </div>
            <span style={styles.brandTitle}>SMRITHI</span>
          </div>

          <nav style={styles.navLinks} className="landing-nav-links">
            <a href="#features" style={styles.navItem}>Features</a>
            <a href="#telehealth" style={styles.navItem}>AI Caregiver</a>
            <a href="#testimonials" style={styles.navItem}>Testimonials</a>
            <a href="#booking" style={styles.navItem}>Consultation</a>
          </nav>

          <div style={styles.navActions} className="landing-nav-actions">
            <button style={styles.loginBtn} onClick={() => navigate('/login-signup')}>
              Log In
            </button>
            <button style={styles.getStartedBtn} onClick={() => navigate('/caregiver')}>
              <ShieldCheck size={18} /> Caregiver Portal
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section (Editorial Reference Style) ──────────────── */}
      <section style={styles.heroSection} className="landing-hero-section">
        <div style={styles.heroContainer} className="landing-hero-container">
          {/* Left Column: Text Content */}
          <div style={styles.heroTextCol} className="landing-hero-text-col">
            <h1 style={styles.heroHeading} className="landing-hero-heading">
              Cognitive Health & Memory Care
            </h1>

            <p style={styles.heroSubtext}>
              Gentle AI caregiving, daily memory tracking, and real-time telehealth monitoring for seniors and family caregivers.
            </p>

            <div style={styles.heroBtnGroup}>
              <button style={styles.primaryCta} onClick={() => navigate('/games')}>
                Take Cognitive Services <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Photo of Caregiver Holding Tablet */}
          <div style={styles.heroVisualCol} className="landing-hero-visual-col">
            <div style={styles.heroImageCard}>
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=900"
                alt="Caregiver Specialist Holding Tablet"
                style={styles.heroMainImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof / Trusted Partners Banner ─────────────────── */}
      <section style={styles.partnersSection} className="landing-partners-section">
        <div style={styles.partnersContainer} className="landing-partners-container">
          <p style={styles.partnersTitle}>TRUSTED BY LEADING HEALTH & MEMORY FOUNDATIONS NATIONWIDE</p>
          <div style={styles.logoRow} className="landing-logo-row">
            <span style={styles.partnerLogo}>SIH 2026</span>
            <span style={styles.partnerLogo}>AIIMS Care</span>
            <span style={styles.partnerLogo}>NeuroHealth</span>
            <span style={styles.partnerLogo}>MemoryCare Alliance</span>
            <span style={styles.partnerLogo}>Google Startups</span>
            <span style={styles.partnerLogo}>HealthGuard</span>
          </div>
        </div>
      </section>

      {/* ── 3-Column Features Section ────────────────────────────── */}
      <section id="features" style={styles.sectionPadding}>
        <div style={styles.sectionHeaderContainer}>
          <span style={styles.sectionBadge}>CORE CAPABILITIES</span>
          <h2 style={styles.sectionTitle}>Everything you need for cognitive wellness</h2>
          <p style={styles.sectionSub}>Designed with warm green aesthetics, clear typography, and gentle interaction.</p>
        </div>

        <div style={styles.featureGrid} className="landing-feature-grid">
          {/* Card 1: Cognitive Games */}
          <div style={styles.featureCard}>
            <div style={styles.featureImgWrapper}>
              <img
                src="https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&q=80&w=600"
                alt="Cognitive Memory Games"
                style={styles.featureImg}
              />
            </div>
            <h3 style={styles.featureCardTitle}>Cognitive Games & Training</h3>
            <p style={styles.featureCardDesc}>
              Scientifically proven memory recall puzzles, pattern matching, and speech orientation games tailored for daily engagement.
            </p>
            <button style={styles.featureLinkBtn} onClick={() => navigate('/games')}>
              Explore Games <ChevronRight size={16} />
            </button>
          </div>

          {/* Card 2: Caregiver Dashboard */}
          <div style={styles.featureCard}>
            <div style={styles.cardBoxHighlight}>
              <div style={styles.iconCircleBadge}>
                <ShieldCheck size={26} color="var(--primary-green)" />
              </div>
              <h3 style={styles.featureCardTitle}>Real-time Caregiver Portal</h3>
              <p style={styles.featureCardDesc}>
                Track patient vitals, cognitive score graphs, medication adherence, and receive automated alert notifications.
              </p>
              <button style={styles.featureLinkBtn} onClick={() => navigate('/caregiver')}>
                Open Dashboard <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 3: AI Telehealth Companion */}
          <div style={styles.featureCard}>
            <div style={styles.cardBoxStandard}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={styles.pillCheckItem}><CheckCircle2 size={16} color="var(--primary-green)" /> Personalized Memory Care</div>
                <div style={styles.pillCheckItem}><CheckCircle2 size={16} color="var(--primary-green)" /> Advanced Health AI</div>
                <div style={styles.pillCheckItem}><CheckCircle2 size={16} color="var(--primary-green)" /> 24/7 Voice & Chat Support</div>
              </div>
              <h3 style={{ ...styles.featureCardTitle, marginTop: '20px' }}>Intelligent Voice Companion</h3>
              <p style={styles.featureCardDesc}>
                Our empathetic AI assistant talks with patients, listens to daily stories, and offers soothing guidance anytime.
              </p>
              <button style={styles.featureLinkBtn} onClick={() => navigate('/')}>
                Talk to Assistant <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Telehealth Chatbot Showcase (Dark Forest Green Container) ─── */}
      <section id="telehealth" style={styles.darkSection}>
        <div style={styles.darkContainer}>
          <div style={styles.darkTextCol}>
            <div style={styles.darkBadge}>
              <Sparkles size={14} color="#d4e8d4" /> 24/7 AI TELEHEALTH COMPANION
            </div>
            <h2 style={styles.darkTitle}>Your Intelligent Telehealth AI Assistant</h2>
            <p style={styles.darkSub}>
              Experience instant health queries, cognitive check-ins, and automated daily care reporting powered by specialized healthcare AI models.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <div style={styles.darkCheckBadge}><Lock size={14} color="#d4e8d4" /> Encrypted & Secure</div>
              <div style={styles.darkCheckBadge}><Clock size={14} color="#d4e8d4" /> Instant Response</div>
              <div style={styles.darkCheckBadge}><UserCheck size={14} color="#d4e8d4" /> Doctor Verified</div>
            </div>
          </div>

          {/* Interactive Chatbot Simulation */}
          <div style={styles.chatCard}>
            <div style={styles.chatHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#81C784' }}></div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>Smrithi Voice & Chat Assistant</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Online</span>
            </div>

            <div style={styles.chatBody}>
              {/* User Message */}
              <div style={styles.userBubble}>
                "Hi Smrithi AI, can you check my cognitive progress for this week?"
              </div>

              {/* AI Response */}
              <div style={styles.aiBubble}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#d4e8d4' }}>
                  <Sparkles size={14} /> SMRITHI AI CARE
                </div>
                Hello Asha! Your memory recall score improved by 12% this week. You completed 14 games and took all morning medications on time! 🌸
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ─────────────────────────────────── */}
      <section id="testimonials" style={styles.sectionPadding}>
        <div style={styles.sectionHeaderContainer}>
          <span style={styles.sectionBadge}>PATIENT & CAREGIVER STORIES</span>
          <h2 style={styles.sectionTitle}>Trusted by families and medical experts</h2>
        </div>

        <div style={styles.testimonialGrid}>
          {/* Testimonial 1 */}
          <div style={styles.testimonialCard}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="var(--warning-orange)" color="var(--warning-orange)" />
              ))}
            </div>
            <p style={styles.testimonialText}>
              "Smrithi gave our family total peace of mind. I can monitor my mother's medicine adherence and cognitive game scores remotely from work."
            </p>
            <div style={styles.testimonialUser}>
              <img src="https://i.pravatar.cc/100?u=rohan" alt="Rohan Sharma" style={styles.userAvatar} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>Rohan Sharma</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Family Caregiver</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div style={styles.testimonialCard}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="var(--warning-orange)" color="var(--warning-orange)" />
              ))}
            </div>
            <p style={styles.testimonialText}>
              "The cognitive games are gentle, comforting, and scientifically structured. My dementia patients stay active and enthusiastic every day."
            </p>
            <div style={styles.testimonialUser}>
              <img src="https://i.pravatar.cc/100?u=sarah" alt="Dr. Sarah Jenkins" style={styles.userAvatar} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>Dr. Sarah Jenkins</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Consultant Neurologist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Appointment & Consultation Booking Section ───────────── */}
      <section id="booking" style={{ ...styles.sectionPadding, backgroundColor: 'var(--sidebar-bg)', borderRadius: '32px' }}>
        <div style={styles.bookingContainer}>
          {/* Left Column: Image */}
          <div style={styles.bookingImgCol}>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=700"
              alt="Medical Consultation"
              style={styles.bookingImg}
            />
          </div>

          {/* Right Column: Form */}
          <div style={styles.bookingFormCol}>
            <span style={styles.sectionBadge}>QUICK CONSULTATION</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '6px 0 16px 0', color: 'var(--text-main)' }}>
              Book an appointment with a memory specialist
            </h2>

            {bookingSuccess ? (
              <div style={styles.successCard}>
                <CheckCircle2 size={36} color="var(--primary-green)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-green)' }}>Appointment Request Received!</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Thank you {bookingData.name}. Our caregiver specialist will contact you at {bookingData.email} to confirm your consultation on {bookingData.date}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={styles.formStack}>
                <div>
                  <label style={styles.inputLabel}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    style={styles.textInput}
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={styles.inputLabel}>Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                    style={styles.textInput}
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={styles.inputLabel}>Select Service</label>
                    <select
                      style={styles.textInput}
                      value={bookingData.service}
                      onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                    >
                      <option>Cognitive Assessment</option>
                      <option>Caregiver Onboarding</option>
                      <option>Telehealth Routine Check</option>
                    </select>
                  </div>

                  <div>
                    <label style={styles.inputLabel}>Preferred Date</label>
                    <input
                      type="date"
                      style={styles.textInput}
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Book Appointment Now <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={styles.logoBadge}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(15deg)' }}>
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
                  <path d="M9 22v-4" />
                </svg>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-green)' }}>SMRITHI</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '320px', lineHeight: '1.5' }}>
              Empowering seniors and caregivers through empathetic AI technology and real-time health monitoring.
            </p>
          </div>

          <div style={styles.footerLinksGrid}>
            <div>
              <h4 style={styles.footerColTitle}>Navigation</h4>
              <a href="#features" style={styles.footerLinkItem}>Features</a>
              <a href="#telehealth" style={styles.footerLinkItem}>AI Caregiver</a>
              <a href="#caregiver" style={styles.footerLinkItem}>Caregiver Portal</a>
            </div>

            <div>
              <h4 style={styles.footerColTitle}>Explore</h4>
              <a href="#features" style={styles.footerLinkItem}>Features</a>
              <a href="#booking" style={styles.footerLinkItem}>Consultation</a>
              <a href="/caregiver" style={styles.footerLinkItem}>Caregiver Portal</a>
            </div>
          </div>
        </div>

        <div style={styles.copyrightRow}>
          <span>© 2026 SMRITHI Care. All rights reserved.</span>
          <span>Designed with care for dementia & cognitive wellness.</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  landingWrapper: {
    width: '100%',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-family)',
    minHeight: '100vh',
  },
  navbar: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(242, 251, 242, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border-color)',
    zIndex: 100,
    padding: '16px 40px',
  },
  navContainer: {
    maxWidth: '1320px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  logoBadge: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: '1.45rem',
    fontWeight: '800',
    color: 'var(--primary-green)',
    letterSpacing: '0.8px',
  },
  navLinks: {
    display: 'flex',
    gap: '28px',
  },
  navItem: {
    fontSize: '0.975rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    transition: 'color 0.2s ease',
  },
  navActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  loginBtn: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--primary-green)',
    backgroundColor: 'var(--secondary-green)',
    padding: '10px 20px',
    borderRadius: 'var(--radius-full)',
  },
  getStartedBtn: {
    backgroundColor: 'var(--primary-green)',
    color: '#ffffff',
    fontWeight: '700',
    padding: '10px 22px',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.95rem',
    boxShadow: '0 4px 14px rgba(30, 101, 53, 0.2)',
  },
  heroSection: {
    background: 'linear-gradient(180deg, var(--bg-color) 0%, var(--sidebar-bg) 100%)',
    padding: '60px 40px 0 40px',
    borderBottom: '1px solid var(--border-color)',
    overflow: 'hidden',
  },
  heroContainer: {
    maxWidth: '1320px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gap: '40px',
    alignItems: 'flex-end',
  },
  heroTextCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: '80px',
  },
  heroHeading: {
    fontSize: '3.8rem',
    fontWeight: '800',
    lineHeight: '1.08',
    color: 'var(--text-main)',
    letterSpacing: '-1.5px',
    marginBottom: '20px',
  },
  heroSubtext: {
    fontSize: '1.15rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    marginBottom: '36px',
    fontWeight: '500',
    maxWidth: '480px',
  },
  heroBtnGroup: {
    display: 'flex',
    gap: '14px',
  },
  primaryCta: {
    backgroundColor: 'var(--primary-green)',
    color: '#ffffff',
    fontSize: '1.05rem',
    fontWeight: '700',
    padding: '16px 36px',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 8px 24px rgba(30, 101, 53, 0.25)',
    transition: 'all 0.2s ease',
  },
  heroVisualCol: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  heroImageCard: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  heroMainImg: {
    width: '100%',
    maxHeight: '520px',
    objectFit: 'cover',
    display: 'block',
    borderTopLeftRadius: '32px',
    borderTopRightRadius: '32px',
    boxShadow: '0 -10px 40px rgba(30, 101, 53, 0.08)',
    border: '1px solid var(--border-color)',
  },
  pillIconBox: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: 'var(--secondary-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingPillTop: {
    position: 'absolute',
    top: '-20px',
    left: '-20px',
    backgroundColor: 'var(--surface-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '12px 18px',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  floatingPillBottom: {
    position: 'absolute',
    bottom: '-20px',
    right: '-20px',
    backgroundColor: 'var(--surface-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '12px 18px',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  partnersSection: {
    backgroundColor: 'var(--sidebar-bg)',
    padding: '32px 40px',
    borderBottom: '1px solid var(--border-color)',
  },
  partnersContainer: {
    maxWidth: '1320px',
    margin: '0 auto',
    textAlign: 'center',
  },
  partnersTitle: {
    fontSize: '0.75rem',
    fontWeight: '800',
    letterSpacing: '1.2px',
    color: 'var(--text-muted)',
    marginBottom: '20px',
  },
  logoRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '24px',
  },
  partnerLogo: {
    fontSize: '1.15rem',
    fontWeight: '800',
    color: 'var(--primary-green)',
    opacity: 0.85,
  },
  sectionPadding: {
    padding: '80px 40px',
    maxWidth: '1320px',
    margin: '0 auto',
  },
  sectionHeaderContainer: {
    textAlign: 'center',
    maxWidth: '640px',
    margin: '0 auto 48px auto',
  },
  sectionBadge: {
    fontSize: '0.8rem',
    fontWeight: '800',
    color: 'var(--primary-green)',
    letterSpacing: '1px',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: 'var(--text-main)',
    marginTop: '6px',
  },
  sectionSub: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    marginTop: '8px',
    fontWeight: '500',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '28px',
  },
  featureCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  featureImgWrapper: {
    height: '220px',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '16px',
    border: '1px solid var(--border-color)',
  },
  featureImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardBoxHighlight: {
    backgroundColor: 'var(--sidebar-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    padding: '28px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-card)',
  },
  cardBoxStandard: {
    backgroundColor: 'var(--surface-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    padding: '28px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-card)',
  },
  iconCircleBadge: {
    width: '50px',
    height: '50px',
    borderRadius: '14px',
    backgroundColor: 'var(--secondary-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  featureCardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '8px',
  },
  featureCardDesc: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '16px',
    fontWeight: '500',
  },
  featureLinkBtn: {
    color: 'var(--primary-green)',
    fontWeight: '700',
    fontSize: '0.925rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: 'auto',
  },
  pillCheckItem: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-main)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  darkSection: {
    background: 'linear-gradient(135deg, #155d53 0%, var(--primary-green) 50%, var(--hover-green) 100%)',
    color: '#ffffff',
    padding: '80px 40px',
    margin: '0 20px',
    borderRadius: '32px',
    boxShadow: '0 12px 36px rgba(21, 93, 83, 0.25)',
  },
  darkContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'center',
  },
  darkTextCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  darkBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#d4e8d4',
    fontSize: '0.8rem',
    fontWeight: '700',
    padding: '6px 14px',
    borderRadius: 'var(--radius-full)',
    marginBottom: '16px',
  },
  darkTitle: {
    fontSize: '2.4rem',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '16px',
  },
  darkSub: {
    fontSize: '1.05rem',
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: '1.6',
    fontWeight: '500',
  },
  darkCheckBadge: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: '8px 14px',
    borderRadius: '10px',
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  chatCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },
  chatHeader: {
    padding: '16px 20px',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatBody: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'var(--secondary-green)',
    color: 'var(--primary-green)',
    padding: '12px 18px',
    borderRadius: '18px 18px 2px 18px',
    fontSize: '0.95rem',
    fontWeight: '600',
    maxWidth: '85%',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    color: '#ffffff',
    padding: '16px 18px',
    borderRadius: '18px 18px 18px 2px',
    fontSize: '0.95rem',
    maxWidth: '90%',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  testimonialCard: {
    backgroundColor: 'var(--surface-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    padding: '28px',
    boxShadow: 'var(--shadow-card)',
  },
  testimonialText: {
    fontSize: '1rem',
    color: 'var(--text-main)',
    lineHeight: '1.6',
    fontStyle: 'italic',
    marginBottom: '20px',
    fontWeight: '500',
  },
  testimonialUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userAvatar: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  bookingContainer: {
    maxWidth: '1140px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '40px',
    alignItems: 'center',
  },
  bookingImgCol: {
    borderRadius: '24px',
    overflow: 'hidden',
  },
  bookingImg: {
    width: '100%',
    maxHeight: '420px',
    objectFit: 'cover',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
  },
  bookingFormCol: {
    backgroundColor: 'var(--surface-color)',
    padding: '32px',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-card)',
  },
  formStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '4px',
    display: 'block',
  },
  textInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-color)',
    fontSize: '0.925rem',
    fontFamily: 'inherit',
    outline: 'none',
    color: 'var(--text-main)',
  },
  submitBtn: {
    backgroundColor: 'var(--primary-green)',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '700',
    padding: '14px',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '10px',
    boxShadow: '0 4px 14px rgba(30, 101, 53, 0.2)',
  },
  successCard: {
    backgroundColor: 'var(--sidebar-bg)',
    border: '1px solid var(--border-color)',
    padding: '24px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: 'var(--sidebar-bg)',
    borderTop: '1px solid var(--border-color)',
    padding: '60px 40px 30px 40px',
    marginTop: '40px',
  },
  footerContainer: {
    maxWidth: '1320px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    flexWrap: 'wrap',
    marginBottom: '40px',
  },
  footerLinksGrid: {
    display: 'flex',
    gap: '60px',
  },
  footerColTitle: {
    fontSize: '0.95rem',
    fontWeight: '800',
    color: 'var(--primary-green)',
    marginBottom: '14px',
  },
  footerLinkItem: {
    display: 'block',
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    fontWeight: '500',
  },
  copyrightRow: {
    maxWidth: '1320px',
    margin: '0 auto',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
};
