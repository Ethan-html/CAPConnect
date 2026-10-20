'use client';
import { useState } from 'react';
import {
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Plane,
  Sparkles,
  Zap,
} from 'lucide-react';

export type Position = {
  title: string;
  org?: string;
  desc?: string;
  skills?: string[];
  type: 'flight' | 'duty';
  highlights?: string[];
};

export type Period = {
  id: string;
  date: string;
  current?: boolean;
  flights: Position[];
  duties: Position[];
};

const timelineData: Period[] = [
  {
    id: 'p-current',
    date: 'Jan 2026 – Present',
    current: true,
    flights: [
      {
        title: 'Alpha Flight Commander / Line',
        org: 'Skyhawk Composite Squadron',
        desc: 'Flight-line assignment commanding daily cadet formations, accountability, drill standards, and mentor development.',
        type: 'flight',
        skills: ['Flight Command', 'Drill & Ceremonies', 'Cadet Accountability'],
        highlights: ['Mentored 18 junior cadets', '100% attendance accountability', 'Standardized squadron inspection procedures'],
      },
    ],
    duties: [
      {
        title: 'Lead IT NCO / Staff Officer',
        org: 'Squadron Headquarters Staff',
        desc: 'Coordinates unit technology infrastructure, cadet accounts, AV systems, and communications security support.',
        type: 'duty',
        skills: ['IT Infrastructure', 'Account Management', 'Network Support'],
        highlights: ['Maintained squadron workstation fleet', 'Managed digital roster and Google Workspace'],
      },
      {
        title: 'Cyber Education Lead',
        org: 'Squadron Aerospace & STEM Staff',
        desc: 'Directs weekly cyber defense education sessions, packet analysis workshops, and trains teams for national competitions.',
        type: 'duty',
        skills: ['Cybersecurity Education', 'CyberPatriot Coaching', 'Linux / Windows Security'],
        highlights: ['Guided 2 teams through CyberPatriot rounds', 'Organized hands-on CTF challenge for flight'],
      },
    ],
  },
  {
    id: 'p-late2025',
    date: 'Aug 2025 – Dec 2025',
    flights: [
      {
        title: 'Bravo Flight Line Specialist',
        org: 'Skyhawk Composite Squadron',
        desc: 'Supported active flight-line operations, aircraft safety sweeps, and flight-level aerospace education missions.',
        type: 'flight',
        skills: ['Flight-Line Safety', 'Aerospace Operations', 'Cadet Mentoring'],
        highlights: ['Organized orientation flight staging', 'Assisted flight leader during weekly inspections'],
      },
    ],
    duties: [
      {
        title: 'Flight Sergeant',
        org: 'Bravo Flight Staff',
        desc: 'Maintained discipline, uniform compliance, drill excellence, and morale across 14 cadets in Bravo Flight.',
        type: 'duty',
        skills: ['Enlisted Leadership', 'Uniform Inspections', 'Morale & Teamwork'],
        highlights: ['Awarded Honor Flight at squadron awards night', 'Zero uniform discrepancies in regional review'],
      },
    ],
  },
  {
    id: 'p-summer2025',
    date: 'Summer 2025',
    flights: [
      {
        title: 'Encampment Flight Member',
        org: 'Minnesota Wing Cadet Training Encampment',
        desc: 'Completed intensive 8-day encampment curriculum within a rigorous military training flight environment.',
        type: 'flight',
        skills: ['AF Traditions', 'Physical Fitness', 'Flight Cohesion'],
        highlights: ['Participated in 24-hour tactical FTX', 'Completed C-130 static tour & simulator orientation'],
      },
    ],
    duties: [
      {
        title: 'Element Leader',
        org: 'Minnesota Wing Encampment',
        desc: 'Guided an element of 6 cadets through high-tempo daily training, accountability checks, and obstacle courses.',
        type: 'duty',
        skills: ['Element Leadership', 'Barracks Inspection', 'Conflict Resolution'],
        highlights: ['Top scoring element in barracks cleanliness', 'Led flight during wing parade pass-in-review'],
      },
    ],
  },
  {
    id: 'p-2024-2025',
    date: '2024 – 2025',
    flights: [
      {
        title: 'Charlie Flight Cadet',
        org: 'Skyhawk Composite Squadron',
        desc: 'Learned fundamental flight-line procedures, aerospace science fundamentals, and basic cadet progression.',
        type: 'flight',
        skills: ['Customs & Courtesies', 'Radio Etiquette', 'Model Rocket Launches'],
        highlights: ['Earned Wright Brothers Milestone', 'Participated in all squadron SAREX search exercises'],
      },
    ],
    duties: [
      {
        title: 'Aerospace Education Assistant',
        org: 'Squadron AE Department',
        desc: 'Assisted Aerospace Officer running hands-on STEM demonstrations, rocketry build sessions, and flight sims.',
        type: 'duty',
        skills: ['STEM Facilitation', 'Rocketry Prep', 'Flight Sim Setup'],
        highlights: ['Helped build 20 Estes rocket kits', 'Configured squadron flight simulator'],
      },
      {
        title: 'Color Guard Honor Team',
        org: 'Squadron Honor Guard',
        desc: 'Represented squadron presenting the colors at civic ceremonies, military banquets, and aviation conferences.',
        type: 'duty',
        skills: ['Color Guard Drill', 'Flag Protocol', 'Civic Representation'],
        highlights: ['Presented colors at MN Wing Conference', 'Participated in 4 community Memorial Day ceremonies'],
      },
    ],
  },
];

type FilterMode = 'all' | 'active' | 'flight' | 'duty';

export default function ExperienceTab() {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoveredPeriod, setHoveredPeriod] = useState<string | null>(null);

  const toggleExpand = (title: string) => {
    setExpandedCard(expandedCard === title ? null : title);
  };

  return (
    <div className="experience-experience-wrapper">
      {/* Header and Interactive Controls */}
      <div className="exp-top-bar">
        <div>
          <div className="exp-tag">
            <Layers size={14} />
            <span>Service Record</span>
          </div>
          <h2 className="section-heading">Cadet Experience & Postings</h2>
          <p className="section-sub">
            Flight-line operational billets on the left. Duty and squadron staff positions on the right.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="exp-filters" role="group" aria-label="Experience filters">
          <button
            className={`exp-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Roles
          </button>
          <button
            className={`exp-filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            <span className="live-dot" />
            Active Only
          </button>
          <button
            className={`exp-filter-btn ${filter === 'flight' ? 'active' : ''}`}
            onClick={() => setFilter('flight')}
          >
            <Plane size={13} />
            Flight Line
          </button>
          <button
            className={`exp-filter-btn ${filter === 'duty' ? 'active' : ''}`}
            onClick={() => setFilter('duty')}
          >
            <BriefcaseBusiness size={13} />
            Duty Positions
          </button>
        </div>
      </div>

      {/* Interactive Experience Stats Banner */}
      <div className="exp-stats-strip">
        <div className="exp-stat-item">
          <span className="stat-num">4</span>
          <span className="stat-lbl">Flight Line Roles</span>
        </div>
        <div className="exp-stat-divider" />
        <div className="exp-stat-item">
          <span className="stat-num">6</span>
          <span className="stat-lbl">Duty Assignments</span>
        </div>
        <div className="exp-stat-divider" />
        <div className="exp-stat-item">
          <span className="stat-num">3+</span>
          <span className="stat-lbl">Years Active Service</span>
        </div>
        <div className="exp-stat-divider" />
        <div className="exp-stat-item">
          <span className="stat-num active-highlight">3</span>
          <span className="stat-lbl">Current Live Postings</span>
        </div>
      </div>

      {/* PERFECTLY ALIGNED COLUMN HEADERS: "DUTY POSITION" DIRECTLY OVER THE DUTY BOXES */}
      <div className="experience-columns-header">
        {/* Left Column Header (Flight Line) */}
        <div className="col-header-box col-flight-header">
          <div className="column-badge flight-badge">
            <Plane size={15} />
            <span>Flight Line Positions</span>
          </div>
        </div>

        {/* Center Axis Header */}
        <div className="col-axis-spacer">
          <div className="axis-title-pill">
            <Calendar size={13} />
            <span>TIMELINE</span>
          </div>
        </div>

        {/* Right Column Header (Duty Positions - Exactly over the duty cards!) */}
        <div className="col-header-box col-duty-header">
          <div className="column-badge duty-badge">
            <BriefcaseBusiness size={15} />
            <span>Duty Positions</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Timeline Body */}
      <div className="timeline-interactive-container">
        {timelineData
          .filter((period) => {
            if (filter === 'active') return period.current;
            return true;
          })
          .map((period) => {
            const isHovered = hoveredPeriod === period.id;
            const showFlights = filter !== 'duty';
            const showDuties = filter !== 'flight';

            return (
              <article
                className={`timeline-row-interactive ${period.current ? 'is-current-period' : ''} ${
                  isHovered ? 'row-hovered' : ''
                }`}
                key={period.id}
                onMouseEnter={() => setHoveredPeriod(period.id)}
                onMouseLeave={() => setHoveredPeriod(null)}
              >
                {/* Left Column: Flight Line Cards */}
                <div className="timeline-stack timeline-left">
                  {showFlights &&
                    period.flights.map((p) => {
                      const isExpanded = expandedCard === p.title;
                      return (
                        <div
                          className={`timeline-card interactive-card flight-card ${
                            period.current ? 'current-card' : ''
                          } ${isExpanded ? 'card-expanded' : ''}`}
                          key={p.title}
                          onClick={() => toggleExpand(p.title)}
                        >
                          <div className="card-top-pills">
                            <span className="role-type-pill flight-type">
                              <Plane size={11} />
                              Flight Line
                            </span>
                            {period.current && (
                              <span className="role-active-pill">
                                <span className="pulsing-green-dot" />
                                Current Role
                              </span>
                            )}
                          </div>

                          <div className="timeline-title">{p.title}</div>
                          {p.org && <div className="timeline-meta">{p.org}</div>}
                          {p.desc && <p className="timeline-desc">{p.desc}</p>}

                          {p.skills && (
                            <div className="timeline-skills-chips">
                              {p.skills.map((skill) => (
                                <span key={skill} className="role-skill-tag">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Expandable Key Highlights */}
                          {p.highlights && (
                            <div className="expand-trigger-row">
                              <span className="expand-btn-text">
                                {isExpanded ? 'Hide Highlights' : 'View Key Highlights'}
                              </span>
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </div>
                          )}

                          {isExpanded && p.highlights && (
                            <div className="card-expanded-content">
                              <div className="highlights-title">Role Achievements:</div>
                              <ul className="highlights-list">
                                {p.highlights.map((h, i) => (
                                  <li key={i}>
                                    <CheckCircle2 size={13} className="bullet-check" />
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>

                {/* Center Axis Node */}
                <div className="timeline-axis">
                  <div className={`timeline-dot-interactive ${period.current ? 'current-node' : ''}`}>
                    {period.current ? <Zap size={10} className="zap-icon" /> : null}
                  </div>
                  <span className="timeline-date-interactive">{period.date}</span>
                </div>

                {/* Right Column: Duty Positions (DIRECTLY UNDER DUTY HEADER!) */}
                <div className="timeline-stack timeline-right">
                  {showDuties &&
                    period.duties.map((p) => {
                      const isExpanded = expandedCard === p.title;
                      return (
                        <div
                          className={`timeline-card interactive-card duty-card ${
                            period.current ? 'current-card' : ''
                          } ${isExpanded ? 'card-expanded' : ''}`}
                          key={p.title}
                          onClick={() => toggleExpand(p.title)}
                        >
                          <div className="card-top-pills">
                            <span className="role-type-pill duty-type">
                              <BriefcaseBusiness size={11} />
                              Duty Position
                            </span>
                            {period.current && (
                              <span className="role-active-pill">
                                <span className="pulsing-green-dot" />
                                Current Role
                              </span>
                            )}
                          </div>

                          <div className="timeline-title">{p.title}</div>
                          {p.org && <div className="timeline-meta">{p.org}</div>}
                          {p.desc && <p className="timeline-desc">{p.desc}</p>}

                          {p.skills && (
                            <div className="timeline-skills-chips">
                              {p.skills.map((skill) => (
                                <span key={skill} className="role-skill-tag duty-skill">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Expandable Key Highlights */}
                          {p.highlights && (
                            <div className="expand-trigger-row">
                              <span className="expand-btn-text">
                                {isExpanded ? 'Hide Details' : 'View Responsibilities'}
                              </span>
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </div>
                          )}

                          {isExpanded && p.highlights && (
                            <div className="card-expanded-content">
                              <div className="highlights-title">Staff Responsibilities:</div>
                              <ul className="highlights-list">
                                {p.highlights.map((h, i) => (
                                  <li key={i}>
                                    <CheckCircle2 size={13} className="bullet-check duty-check" />
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
}
