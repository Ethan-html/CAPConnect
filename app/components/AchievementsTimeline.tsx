'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Award,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Plane,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';

export interface AwardItem {
  id: string;
  title: string;
  detail: string;
  date: string;
  timestamp: number;
  status: 'verified' | 'self';
  icon: 'badge' | 'award' | 'shield' | 'book' | 'plane' | 'heart' | 'spark';
  category: string;
  verifier?: string;
  skills: string[];
}

const rawAwards: AwardItem[] = [
  {
    id: 'first-aid',
    title: 'First Aid & CPR Certification',
    detail: 'American Red Cross certified cadet emergency first aid qualification.',
    date: 'Apr 2023',
    timestamp: 202304,
    status: 'self',
    icon: 'heart',
    category: 'Emergency Services',
    verifier: 'Self-reported (Document on file)',
    skills: ['CPR Certified', 'First Responder Protocol', 'Triage Basics'],
  },
  {
    id: 'rocketry',
    title: 'Model Rocketry Badge',
    detail: 'Completed Stage 1–3 model rocketry builds, trajectories, and safe launches.',
    date: 'Oct 2023',
    timestamp: 202310,
    status: 'self',
    icon: 'plane',
    category: 'Aerospace',
    verifier: 'Squadron Aerospace Officer',
    skills: ['Solid Rocket Propulsion', 'Telemetry', 'Aero Dynamics'],
  },
  {
    id: 'cyberpatriot',
    title: 'CyberPatriot XVI Competitor',
    detail: 'Competed in Air Force Association CyberPatriot National Youth Cyber Defense.',
    date: 'Feb 2024',
    timestamp: 202402,
    status: 'self',
    icon: 'spark',
    category: 'Cyber / STEM',
    verifier: 'Squadron Cyber Coach',
    skills: ['Windows Hardening', 'Linux Security', 'Packet Analysis'],
  },
  {
    id: 'gtm3',
    title: 'Ground Team Member 3 (GTM-3)',
    detail: 'Emergency services qualification for ground search and rescue missions.',
    date: 'May 2024',
    timestamp: 202405,
    status: 'verified',
    icon: 'shield',
    category: 'Emergency Services',
    verifier: 'Maj. David Henderson, Wing ES Officer',
    skills: ['Wilderness Navigation', 'Grid Search', 'ELT Tracking'],
  },
  {
    id: 'encampment',
    title: 'Encampment Graduate',
    detail: 'Completed rigorous 8-day Minnesota Wing Cadet Training Encampment.',
    date: 'Jul 2024',
    timestamp: 202407,
    status: 'verified',
    icon: 'book',
    category: 'Training',
    verifier: 'Lt. Col. Sarah Miller, Encampment Commander',
    skills: ['Military Drill & Ceremonies', 'Air Force Traditions', 'Flight Teamwork'],
  },
  {
    id: 'wright-bros',
    title: 'Wright Brothers Milestone Award',
    detail: 'First major milestone in the cadet program. Promoted to Cadet Staff Sergeant (C/SSgt).',
    date: 'Nov 2024',
    timestamp: 202411,
    status: 'verified',
    icon: 'award',
    category: 'Milestone',
    verifier: 'Skyhawk Squadron Commander (Verified in eServices)',
    skills: ['Drill Test Mastery', 'Cadet NCO Responsibilities', 'Leadership Chapter 1-3'],
  },
  {
    id: 'mitchell',
    title: 'General Billy Mitchell Award',
    detail: 'Earned the prestigious Billy Mitchell Award, earning promotion to Cadet 2d Lieutenant.',
    date: 'Jul 2025',
    timestamp: 202507,
    status: 'verified',
    icon: 'award',
    category: 'Milestone',
    verifier: 'National HQ Civil Air Patrol (eServices Verified)',
    skills: ['Comprehensive Leadership Exam', 'Comprehensive Aerospace Exam', 'Staff Service'],
  },
  {
    id: 'cadet-captain',
    title: 'Cadet Captain Promotion',
    detail: 'Promoted to Cadet Captain; serving as senior cadet executive and squadron mentor.',
    date: 'Jan 2026',
    timestamp: 202601,
    status: 'verified',
    icon: 'badge',
    category: 'Rank Advancement',
    verifier: 'Skyhawk Squadron Promotion Board',
    skills: ['Staff Officer Leadership', 'Instruction & Mentorship', 'Operations Planning'],
  },
];

// Ensure sorted chronologically by date
const awards = rawAwards.sort((a, b) => a.timestamp - b.timestamp);

export default function AchievementsTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centeredIndex, setCenteredIndex] = useState(awards.length - 1);
  const [scales, setScales] = useState<number[]>(awards.map(() => 0.85));

  const updateCardScales = () => {
    const container = scrollRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerCenter = container.scrollLeft + containerWidth / 2;
    const cards = container.querySelectorAll<HTMLElement>('.timeline-badge-card');

    let closestIdx = 0;
    let minDistance = Infinity;
    const newScales: number[] = [];

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = index;
      }

      // Max distance for falloff
      const maxDist = Math.max(containerWidth * 0.42, 220);
      const factor = Math.max(0, 1 - distance / maxDist);
      // Center is biggest (scale ~ 1.12), sides become smaller (scale ~ 0.82)
      const scale = 0.82 + factor * 0.30;
      newScales.push(scale);
    });

    setCenteredIndex(closestIdx);
    setScales(newScales);
  };

  useEffect(() => {
    // Initial centering on mount (start focused on Mitchell award or latest milestone)
    const timer = setTimeout(() => {
      scrollToIndex(awards.length - 2, 'auto');
    }, 150);

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateCardScales, { passive: true });
      window.addEventListener('resize', updateCardScales);
    }

    return () => {
      clearTimeout(timer);
      if (container) {
        container.removeEventListener('scroll', updateCardScales);
      }
      window.removeEventListener('resize', updateCardScales);
    };
  }, []);

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('.timeline-badge-card');
    if (cards[index]) {
      const card = cards[index];
      const target = card.offsetLeft + card.offsetWidth / 2 - container.clientWidth / 2;
      container.scrollTo({ left: target, behavior });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Enable horizontal scrolling inside this box with mouse wheel
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && scrollRef.current) {
      e.stopPropagation();
      scrollRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  const getIcon = (iconName: AwardItem['icon']) => {
    switch (iconName) {
      case 'badge':
        return BadgeCheck;
      case 'award':
        return Award;
      case 'shield':
        return ShieldCheck;
      case 'book':
        return BookOpen;
      case 'plane':
        return Plane;
      case 'heart':
        return Heart;
      case 'spark':
      default:
        return Sparkles;
    }
  };

  const currentAward = awards[centeredIndex] || awards[0];

  return (
    <section className="timeline-box-container">
      {/* Box Header */}
      <div className="timeline-box-header">
        <div className="timeline-box-titles">
          <div className="timeline-tag">
            <Sparkles size={14} />
            <span>Interactive Timeline</span>
          </div>
          <h2 className="timeline-box-heading">Achievements, Badges & Milestones</h2>
          <p className="timeline-box-sub">
            Sorted chronologically by date. Scroll horizontally inside this box — the active achievement magnifies in the center.
          </p>
        </div>
        <div className="timeline-controls">
          <button
            className="timeline-nav-btn"
            onClick={() => scrollToIndex(Math.max(0, centeredIndex - 1))}
            disabled={centeredIndex === 0}
            aria-label="Previous achievement"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="timeline-counter">
            <strong>{centeredIndex + 1}</strong> / {awards.length}
          </span>
          <button
            className="timeline-nav-btn"
            onClick={() => scrollToIndex(Math.min(awards.length - 1, centeredIndex + 1))}
            disabled={centeredIndex === awards.length - 1}
            aria-label="Next achievement"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Target Focus Notch in Center */}
      <div className="timeline-notch-wrapper">
        <div className="timeline-notch">
          <span className="notch-pip" />
          <span className="notch-text">CENTER FOCUS</span>
        </div>
      </div>

      {/* Standalone Scrolling Timeline Box */}
      <div
        className="timeline-scroll-track"
        ref={scrollRef}
        onWheel={handleWheel}
        tabIndex={0}
        role="region"
        aria-label="Awards chronological timeline"
      >
        <div className="timeline-cards-row">
          {awards.map((item, index) => {
            const Icon = getIcon(item.icon);
            const isCenter = index === centeredIndex;
            const currentScale = scales[index] ?? (isCenter ? 1.12 : 0.85);

            return (
              <div
                key={item.id}
                className={`timeline-badge-card ${isCenter ? 'is-centered' : ''} ${
                  item.status === 'verified' ? 'verified-card' : 'self-card'
                }`}
                style={{
                  transform: `scale(${currentScale})`,
                  opacity: Math.max(0.48, Math.min(1, currentScale - 0.12)),
                  zIndex: isCenter ? 15 : 5,
                }}
                onClick={() => scrollToIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') scrollToIndex(index);
                }}
              >
                {/* Milestone Date Flag */}
                <div className="badge-date-pill">
                  <span className="badge-dot" />
                  <span className="badge-date">{item.date}</span>
                </div>

                {/* Badge Icon Emblem */}
                <div className={`badge-emblem-wrap ${item.status}`}>
                  <Icon size={32} className="badge-svg-icon" />
                </div>

                {/* Badge Content */}
                <div className="badge-card-info">
                  <span className="badge-category">{item.category}</span>
                  <h3 className="badge-title">{item.title}</h3>
                  <p className="badge-detail">{item.detail}</p>
                </div>

                {/* Status Indicator */}
                <div className="badge-footer-status">
                  {item.status === 'verified' ? (
                    <span className="status-chip verified">
                      <Check size={12} />
                      Verified
                    </span>
                  ) : (
                    <span className="status-chip self">
                      Self-Reported
                    </span>
                  )}
                  {isCenter && (
                    <span className="focus-pulse-pill">
                      Active Focus
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Date Navigation Strip */}
      <div className="timeline-date-strip">
        <div className="date-strip-track">
          {awards.map((item, index) => (
            <button
              key={item.id}
              className={`strip-node ${index === centeredIndex ? 'active-node' : ''}`}
              onClick={() => scrollToIndex(index)}
              title={`${item.title} (${item.date})`}
            >
              <span className="node-dot" />
              <span className="node-label">{item.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Focused Item Detail Bar */}
      <div className="focused-award-banner">
        <div className="focused-left">
          <div className="focused-icon-box">
            {(() => {
              const Icon = getIcon(currentAward.icon);
              return <Icon size={22} />;
            })()}
          </div>
          <div>
            <div className="focused-meta">
              <span className="focused-date">{currentAward.date}</span>
              <span className="meta-sep">•</span>
              <span className="focused-cat">{currentAward.category}</span>
              <span className="meta-sep">•</span>
              <span className={`focused-ver ${currentAward.status}`}>
                {currentAward.status === 'verified' ? 'Officially Verified' : 'Cadet Self-Reported'}
              </span>
            </div>
            <h4 className="focused-name">{currentAward.title}</h4>
            <p className="focused-desc">{currentAward.detail}</p>
            {currentAward.verifier && (
              <div className="focused-verifier">
                <Info size={13} />
                <span>Authority: {currentAward.verifier}</span>
              </div>
            )}
          </div>
        </div>
        <div className="focused-skills">
          <span className="skills-header">Skills / Competencies:</span>
          <div className="skills-chips">
            {currentAward.skills.map((skill) => (
              <span key={skill} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
