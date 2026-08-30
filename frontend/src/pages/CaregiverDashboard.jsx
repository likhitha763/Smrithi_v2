import React, { useState } from 'react';
import {
  User,
  Activity,
  Brain,
  FileText,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Search,
  Calendar,
  Clock,
  Heart,
  Pill,
  Thermometer,
  Plus,
  MoreVertical,
  Filter,
  TrendingUp,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function CaregiverDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Month');
  const [selectedDay, setSelectedDay] = useState(30);

  const daysList = [
    { day: 'Sun', num: 25 },
    { day: 'Mon', num: 26 },
    { day: 'Tue', num: 27 },
    { day: 'Wed', num: 28 },
    { day: 'Thu', num: 29 },
    { day: 'Fri', num: 30 },
    { day: 'Sat', num: 31 },
  ];

  const medicalHistory = [
    {
      id: 1,
      doctor: 'Dr. Sarah Jenkins',
      diagnosis: 'Memory Recall & Recognition Assessment',
      date: '30 Aug 2026, 10:30 AM',
      disease: 'Dementia Stage 1',
      status: 'Verified',
      score: '88%',
    },
    {
      id: 2,
      doctor: 'Asha Devi (Self)',
      diagnosis: 'Morning Dosage Confirmed (Donepezil)',
      date: '30 Aug 2026, 09:00 AM',
      disease: 'Routine Meds',
      status: 'Completed',
      score: '100%',
    },
    {
      id: 3,
      doctor: 'Dr. Liam Michael',
      diagnosis: 'Weekly Cognitive Routine & Speech Check',
      date: '28 Aug 2026, 02:00 PM',
      disease: 'Cognitive Review',
      status: 'Completed',
      score: '92%',
    },
    {
      id: 4,
      doctor: 'Caregiver Team',
      diagnosis: 'Spatial Orientation & Memory Game',
      date: '27 Aug 2026, 04:15 PM',
      disease: 'Activity Hub',
      status: 'Verified',
      score: '84%',
    },
  ];

  const upcomingSchedules = [
    {
      id: 1,
      time: '11:30 AM',
      title: 'Water & Hydration Check',
      category: 'Daily Routine',
      icon: <Activity size={16} color="#155d53" />,
    },
    {
      id: 2,
      time: '02:00 PM',
      title: 'Afternoon Memory Game',
      category: 'Cognitive Play',
      icon: <Brain size={16} color="#155d53" />,
    },
    {
      id: 3,
      time: '08:00 PM',
      title: 'Evening Medicine & BP Check',
      category: 'Health Routine',
      icon: <Pill size={16} color="#155d53" />,
    },
  ];

  return (
    <div className="cg-dashboard">
      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <div className="cg-breadcrumb">
        <span>Dashboard</span>
        <span>/</span>
        <span className="active">Caregiver & Patient Dashboard</span>
      </div>

      {/* ── Welcome Hero Banner ───────────────────────────────────── */}
      <section className="cg-hero-banner">
        <div className="cg-hero-content">
          <h1 className="cg-hero-title">Good Morning, Asha Devi</h1>
          <p className="cg-hero-subtitle">
            Welcome to your patient monitoring overview. Everything looks stable today with continuous cognitive engagement and high medicine adherence.
          </p>
          <button className="cg-hero-btn">
            <Plus size={18} /> Create Appointment / Log Routine
          </button>
        </div>

        {/* Doctor / Caregiver Graphic Illustration */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-only">
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}
          >
            <ShieldCheck size={64} color="#ffffff" />
          </div>
        </div>
      </section>

      {/* ── KPI Metric Cards Row (4 Cards) ────────────────────────── */}
      <section className="cg-kpi-grid">
        {/* KPI 1: Heart Rate */}
        <div className="cg-kpi-card">
          <div className="cg-kpi-header">
            <div className="cg-kpi-icon-wrapper" style={{ backgroundColor: 'var(--secondary-green)' }}>
              <Heart size={20} color="var(--primary-green)" />
            </div>
            <span className="cg-badge-pill positive">
              <TrendingUp size={12} /> +2.5%
            </span>
          </div>
          <div>
            <div className="cg-kpi-label">Heart Rate</div>
            <div className="cg-kpi-value-row">
              <span className="cg-kpi-value">72 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>bpm</span></span>
              {/* Mini Sparkline Chart */}
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                <path d="M2 18 C 10 20, 20 5, 30 14 C 40 22, 50 4, 58 8" stroke="var(--primary-green)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="cg-kpi-subtext">vs last month</div>
          </div>
        </div>

        {/* KPI 2: Cognitive Index */}
        <div className="cg-kpi-card">
          <div className="cg-kpi-header">
            <div className="cg-kpi-icon-wrapper" style={{ backgroundColor: '#E8F5E9' }}>
              <Brain size={20} color="#2E7D32" />
            </div>
            <span className="cg-badge-pill positive">
              <TrendingUp size={12} /> +12%
            </span>
          </div>
          <div>
            <div className="cg-kpi-label">Cognitive Score</div>
            <div className="cg-kpi-value-row">
              <span className="cg-kpi-value">86 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>/100</span></span>
              {/* Mini Bar Chart */}
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                <rect x="4" y="10" width="6" height="14" rx="2" fill="#81C784" />
                <rect x="18" y="6" width="6" height="18" rx="2" fill="#81C784" />
                <rect x="32" y="14" width="6" height="10" rx="2" fill="#81C784" />
                <rect x="46" y="2" width="6" height="22" rx="2" fill="#2E7D32" />
              </svg>
            </div>
            <div className="cg-kpi-subtext">High recall precision</div>
          </div>
        </div>

        {/* KPI 3: Med Adherence */}
        <div className="cg-kpi-card">
          <div className="cg-kpi-header">
            <div className="cg-kpi-icon-wrapper" style={{ backgroundColor: '#FFF8E1' }}>
              <Pill size={20} color="#F57F17" />
            </div>
            <span className="cg-badge-pill positive">
              95% Taken
            </span>
          </div>
          <div>
            <div className="cg-kpi-label">Med Adherence</div>
            <div className="cg-kpi-value-row">
              <span className="cg-kpi-value">18 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>/20</span></span>
              {/* Mini Column Chart */}
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                <rect x="4" y="8" width="8" height="16" rx="2" fill="#FFD54F" />
                <rect x="20" y="4" width="8" height="20" rx="2" fill="#FFD54F" />
                <rect x="36" y="10" width="8" height="14" rx="2" fill="#FFD54F" />
                <rect x="52" y="2" width="8" height="22" rx="2" fill="#F57F17" />
              </svg>
            </div>
            <div className="cg-kpi-subtext">Confirmed via app</div>
          </div>
        </div>

        {/* KPI 4: Rest & Activity */}
        <div className="cg-kpi-card">
          <div className="cg-kpi-header">
            <div className="cg-kpi-icon-wrapper" style={{ backgroundColor: 'var(--warning-bg)' }}>
              <Activity size={20} color="var(--warning-orange)" />
            </div>
            <span className="cg-badge-pill positive">
              <TrendingUp size={12} /> +4.1%
            </span>
          </div>
          <div>
            <div className="cg-kpi-label">Rest & Activity</div>
            <div className="cg-kpi-value-row">
              <span className="cg-kpi-value">7.5 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>hrs</span></span>
              {/* Mini Sparkline Chart */}
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                <path d="M2 14 C 15 2, 30 22, 45 6 C 52 14, 56 10, 58 4" stroke="var(--warning-orange)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="cg-kpi-subtext">Optimal sleep pattern</div>
          </div>
        </div>
      </section>

      {/* ── Middle Row (Health Status Graph & Physical Vitals) ──────── */}
      <section className="cg-grid-2col">
        {/* Left: Interactive Health & Cognitive Trend Graph */}
        <div className="cg-card">
          <div className="cg-card-header">
            <div>
              <h2 className="cg-card-title">
                <Brain size={20} color="#155d53" /> Health & Cognitive Status Trend
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Overall monthly performance based on memory games and routine tracking
              </div>
            </div>

            <div className="cg-filter-tabs">
              {['Week', 'Month', 'Year'].map((tf) => (
                <button
                  key={tf}
                  className={`cg-filter-tab ${selectedTimeframe === tf ? 'active' : ''}`}
                  onClick={() => setSelectedTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metric Highlights above Chart */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', padding: '12px 16px', backgroundColor: '#f9fcf9', borderRadius: '12px', border: '1px solid #eaf4ea' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVERAGE SCORE</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#155d53' }}>82.4 %</div>
            </div>
            <div style={{ borderLeft: '1px solid #d2ebd4', paddingLeft: '24px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROGRESS RATE</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2e7d32' }}>+40% vs last month</div>
            </div>
            <div style={{ borderLeft: '1px solid #d2ebd4', paddingLeft: '24px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>STATUS</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#155d53' }}>Stable & Improving</div>
            </div>
          </div>

          {/* Area Chart SVG */}
          <div style={{ width: '100%', height: '240px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 700 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#155d53" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#155d53" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#f0f5f0" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#f0f5f0" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#f0f5f0" strokeDasharray="4 4" />
              <line x1="0" y1="190" x2="700" y2="190" stroke="#f0f5f0" />

              {/* Area Path */}
              <path
                d="M 0 160 Q 70 140, 140 110 T 280 80 T 420 130 T 560 60 T 700 40 L 700 190 L 0 190 Z"
                fill="url(#greenGradient)"
              />

              {/* Smooth Trend Curve Line */}
              <path
                d="M 0 160 Q 70 140, 140 110 T 280 80 T 420 130 T 560 60 T 700 40"
                fill="none"
                stroke="#155d53"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Highlight Data Points */}
              <circle cx="140" cy="110" r="5" fill="#ffffff" stroke="#155d53" strokeWidth="3" />
              <circle cx="280" cy="80" r="5" fill="#ffffff" stroke="#155d53" strokeWidth="3" />
              <circle cx="420" cy="130" r="5" fill="#ffffff" stroke="#155d53" strokeWidth="3" />
              <circle cx="560" cy="60" r="6" fill="#155d53" stroke="#ffffff" strokeWidth="2" />
              <circle cx="700" cy="40" r="6" fill="#2E7D32" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* X Axis Month Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>
          </div>
        </div>

        {/* Right: Physical Vitals & BMI Widget */}
        <div className="cg-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 className="cg-card-title">
              <User size={20} color="#155d53" /> Body Mass & Physical Vitals
            </h2>

            {/* Patient Physical Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '16px 0' }}>
              <div style={{ backgroundColor: '#f4f8f4', padding: '14px', borderRadius: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>HEIGHT</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>160 <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>cm</span></div>
              </div>
              <div style={{ backgroundColor: '#f4f8f4', padding: '14px', borderRadius: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>WEIGHT</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>68 <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>kg</span></div>
              </div>
            </div>

            {/* BMI Scale */}
            <div className="bmi-scale-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Body Mass Index (BMI)</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#155d53', backgroundColor: '#e6f3ee', padding: '2px 8px', borderRadius: '6px' }}>22.4 - Normal</span>
              </div>
              <div className="bmi-scale-bar">
                <div className="bmi-pin" style={{ left: '42%' }}></div>
              </div>
              <div className="bmi-labels">
                <span>Underweight (&lt;18.5)</span>
                <span style={{ color: '#155d53', fontWeight: 700 }}>Normal (18.5 - 24.9)</span>
                <span>Overweight (&gt;25)</span>
              </div>
            </div>
          </div>

          {/* Daily Vital Metrics Badges */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Heart size={14} color="#e53935" /> Blood Pressure</span>
              <span style={{ fontWeight: 700 }}>120/80 mmHg</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Thermometer size={14} color="#f57c00" /> Temperature</span>
              <span style={{ fontWeight: 700 }}>98.6 °F</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Activity size={14} color="var(--primary-green)" /> Oxygen (SpO2)</span>
              <span style={{ fontWeight: 700 }}>98%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Row (Medical History Table & Upcoming Schedules) ─── */}
      <section className="cg-grid-2col">
        {/* Left: Medical History Table */}
        <div className="cg-card">
          <div className="cg-card-header">
            <div>
              <h2 className="cg-card-title">
                <FileText size={20} color="#155d53" /> Medical History & Log
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Recent clinical evaluations, prescription logs, and game scores
              </div>
            </div>
            <button style={{ color: '#155d53', fontWeight: 700, fontSize: '0.875rem' }}>
              Show all &gt;
            </button>
          </div>

          <div className="cg-table-wrapper">
            <table className="cg-table">
              <thead>
                <tr>
                  <th>Caregiver / Doctor</th>
                  <th>Diagnosis / Event</th>
                  <th>Date & Time</th>
                  <th>Status / Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicalHistory.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{row.doctor}</td>
                    <td>{row.diagnosis}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.date}</td>
                    <td>
                      <span
                        className="cg-badge-pill positive"
                        style={{
                          backgroundColor: row.status === 'Verified' ? '#e6f3ee' : '#f0f4f8',
                          color: row.status === 'Verified' ? '#155d53' : '#2b5797',
                        }}
                      >
                        {row.status} ({row.score})
                      </span>
                    </td>
                    <td>
                      <button style={{ color: 'var(--text-muted)', padding: '4px', borderRadius: '4px' }}>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Upcoming Schedules Widget */}
        <div className="cg-card">
          <div className="cg-card-header">
            <h2 className="cg-card-title">
              <Calendar size={20} color="#155d53" /> Upcoming Schedules
            </h2>
            <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#155d53', backgroundColor: '#e6f3ee', padding: '4px 10px', borderRadius: '8px' }}>
              August 2026
            </div>
          </div>

          {/* 7-Day Calendar Strip */}
          <div className="cg-calendar-strip">
            {daysList.map((d) => (
              <div
                key={d.num}
                className={`cg-day-pill ${selectedDay === d.num ? 'active' : ''}`}
                onClick={() => setSelectedDay(d.num)}
              >
                <span className="cg-day-name">{d.day}</span>
                <span className="cg-day-num">{d.num}</span>
              </div>
            ))}
          </div>

          {/* Schedule List */}
          <div>
            {upcomingSchedules.map((item) => (
              <div key={item.id} className="cg-schedule-item">
                <span className="cg-schedule-time">{item.time}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.category}
                  </div>
                </div>
                <div>{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
